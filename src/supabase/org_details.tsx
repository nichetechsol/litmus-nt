/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { logActivity } from '@/supabase/activity';
import fetchEmailData from '@/supabase/email_configuration';

import { supabase } from './db';
import { sendEmailFunction } from './email';
interface OrgDetail {
  id: number;
  name: string;
  description: string;
  type_id: number;
  status: string;
}

interface UserRole {
  id: number;
  name: string;
}

// Define return types for the functions
interface Result<T> {
  errorCode: number;
  message?: any;
  data: T | null;
}

interface OrganizationWithSiteCount {
  errorCode: number;
  org_id: string;
  org_name: string;
  sites_count: number;
}
// async function fetchOrganizationAndSiteDetails(
//   user_id: any | null,
// ): Promise<OrganizationWithSiteCount[] | null> {
//   try {
//     // Fetch org_id associated with the user
//     const { data: userOrgs, error: userOrgError } = await supabase
//       .from('org_users')
//       .select('org_id')
//       .eq('user_id', user_id);

//     if (userOrgError) {
//       throw userOrgError;
//     }

//     // Extract the org_ids from userOrgs
//     const orgIds = userOrgs.map((org) => org.org_id);

//     // Fetch organization details based on orgIds
//     const { data: orgDetails, error: orgError } = await supabase
//       .from('org_details')
//       .select('*')
//       .in('id', orgIds)
//       .order('created_at', { ascending: false });

//     if (orgError) {
//       throw orgError;
//     }

//     // Fetch site details
//     const { data: siteDetails, error: siteError } = await supabase
//       .from('sites_detail')
//       .select('*');

//     if (siteError) {
//       throw siteError;
//     }

//     // Count sites for each organization
//     const orgsWithSitesCount = orgDetails.map((org) => {
//       const sitesCountForOrg = siteDetails.filter(
//         (site) => site.org_id === org.id,
//       ).length;
//       return {
//         errorCode: 0,
//         org_id: org.id,
//         org_name: org.name,
//         org_type_id: org.type_id,
//         sites_count: sitesCountForOrg,
//       };
//     });

//     return orgsWithSitesCount;
//   } catch (error) {
//     return null;
//   }
// }
async function fetchOrganizationAndSiteDetails(
  user_id: any | null,
): Promise<Result<OrganizationWithSiteCount[] | null>> {
  try {
    // Fetch organization and site details in one query
    const { data, error } = await supabase
      .from('org_users')
      .select(
        `
        role_id,
        org_id,
        org_details (
          id,
          name,
          type_id,
          sites:sites_detail (
            id,
            org_id
          )
        )
      `,
      )
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    if (error) {
      return {
        errorCode: 1,
        data: null,
        message: 'Error fetching Organization details',
      };
    }

    // Transform the data to get the required structure
    const orgsWithSitesCount = data.map((orgUser) => {
      const org: any = orgUser.org_details;
      const sitesCountForOrg: any = org.sites.length;
      return {
        errorCode: 0,
        org_id: org.id,
        org_name: org.name,
        org_type_id: org.type_id,
        sites_count: sitesCountForOrg,
        user_role_id: orgUser.role_id,
      };
    });

    // return orgsWithSitesCount;
    return { errorCode: 0, data: orgsWithSitesCount };
  } catch (error) {
    return {
      errorCode: 1,
      data: null,
      message: 'Error fetching Organization details',
    };
  }
}

async function organizationSidebarList(
  search: string,
  user_id: string,
): Promise<Result<OrgDetail[]>> {
  try {
    // Fetch org_id associated with the user
    const { data: userOrgs, error: userOrgError } = await supabase
      .from('org_users')
      .select('org_id')
      .eq('user_id', user_id);

    if (userOrgError) {
      return { errorCode: 1, data: null, message: 'Error fetching details' };
    }

    // Extract the org_ids from userOrgs
    const orgIds = userOrgs.map((org: any) => org.org_id);

    let orgDetails: OrgDetail[] = [];

    if (search.trim() !== '') {
      const { data, error } = await supabase
        .from('org_details')
        .select('*')
        .in('id', orgIds)
        .ilike('name', `%${search}%`);

      if (error) {
        return { errorCode: 1, data: null, message: 'Error fetching details' };
      } else {
        orgDetails = data ?? [];
      }
    }

    return { errorCode: 0, data: orgDetails };
  } catch (error) {
    return { errorCode: 1, data: null, message: 'Error fetching details' };
  }
}

async function organizationSearch(): Promise<Result<OrgDetail[]>> {
  try {
    // Fetch organization details
    const search = '';
    const { data: orgDetails, error } = await supabase
      .from('org_details')
      .select('*')
      .ilike('name', `%${search}%`);

    if (error) {
      return { errorCode: 1, data: null };
    } else {
      return { errorCode: 0, data: orgDetails };
    }
  } catch (error) {
    return { errorCode: 1, data: null };
  }
}

async function fetchOrganizationTypes(): Promise<Result<any[]>> {
  // Replace `any` with the appropriate type if available
  try {
    // Fetch organization types
    const { data: orgTypes, error } = await supabase
      .from('org_types')
      .select('*');

    if (error) {
      return { errorCode: 1, data: null, message: error.message };
    } else {
      return { errorCode: 0, data: orgTypes };
    }
  } catch (error) {
    return { errorCode: 1, data: null, message: error };
  }
}
async function associateUsersWithOrganization(
  orgId: string,
  domain: string,
  user_id: string,
): Promise<Result<any>> {
  try {
    // Step 1: Query users with matching domain in a single query
    const { data: usersWithDomainData, error: usersWithDomainError } =
      await supabase
        .from('users')
        .select('id')
        .like('email', `%@${domain}`)
        .neq('id', user_id); // Exclude the current user

    if (usersWithDomainError) {
      return {
        errorCode: 1,
        message: 'Failed to fetch users with domain',
        data: null,
      };
    }

    if (!usersWithDomainData || usersWithDomainData.length === 0) {
      return {
        errorCode: 0,
        message: 'No users to associate',
        data: null,
      };
    }

    const userIds = usersWithDomainData.map((user) => user.id);

    // Step 2: Check which users are not already associated in a single query
    const { data: existingOrgUsers, error: fetchExistingError } = await supabase
      .from('org_users')
      .select('user_id')
      .in('user_id', userIds)
      .eq('org_id', orgId);

    if (fetchExistingError) {
      return {
        errorCode: 1,
        message: 'Error fetching existing user data',
        data: null,
      };
    }

    const existingUserIds = new Set(
      existingOrgUsers.map((user) => user.user_id),
    );

    // Step 3: Prepare new user entries
    const newOrgUsers = userIds
      .filter((userId) => !existingUserIds.has(userId))
      .map((userId) => ({
        user_id: userId,
        role_id: 3, // Assuming role_id 3 is for regular members
        org_id: orgId,
      }));

    // Step 4: Insert new users into org_users table in one batch operation
    if (newOrgUsers.length > 0) {
      const { error: insertError } = await supabase
        .from('org_users')
        .insert(newOrgUsers);

      if (insertError) {
        return {
          errorCode: 1,
          message: 'Failed to add users to organization',
          data: null,
        };
      }
    }

    return {
      errorCode: 0,
      message: 'Users associated successfully',
      data: null,
    };
  } catch (error) {
    return {
      errorCode: 1,
      message: 'Failed to associate users with organization',
      data: null,
    };
  }
}

async function addOrganization(data: {
  user_id: any;
  role_id: any;
  name: string;
  description: string;
  type_id: any;
  status: string;
  domain: string[];
  token: any;
  userName: any;
  type_name: any;
}): Promise<Result<any>> {
  try {
    // Fetch general settings in parallel
    const settingsPromise = supabase
      .from('general_settings')
      .select('*')
      .eq('setting_name', 'org_retention');

    // Insert organization details
    const insertOrgPromise = supabase
      .from('org_details')
      .insert([
        {
          name: data.name,
          description: data.description,
          type_id: data.type_id,
          status: data.status,
          retention_setting: 0, // Default value; will update after fetching settings
        },
      ])
      .select();

    // Wait for both operations
    const [settingsResult, insertOrgResult] = await Promise.all([
      settingsPromise,
      insertOrgPromise,
    ]);

    if (settingsResult.error || insertOrgResult.error) {
      return {
        errorCode: 1,
        message: 'Error fetching settings or inserting organization',
        data: null,
      };
    }

    const retValue = settingsResult.data?.[0]?.value_number || 0;
    const orgId = insertOrgResult.data[0].id;

    // Update retention setting after fetching
    await supabase
      .from('org_details')
      .update({ retention_setting: retValue })
      .eq('id', orgId);

    // Insert organization user
    const userInsertPromise = supabase
      .from('org_users')
      .insert([
        {
          user_id: data.user_id,
          role_id: 1,
          org_id: orgId,
        },
      ])
      .select();

    // Insert domains
    const domainInsertPromise = insertDomains(orgId, data.domain);

    // Wait for user insert and domain insert operations
    const [userInsertResult, domainInsertResults] = await Promise.all([
      userInsertPromise,
      domainInsertPromise,
    ]);

    if (userInsertResult.error) {
      return {
        errorCode: 1,
        message: 'Error inserting organization user',
        data: null,
      };
    }

    // Send emails asynchronously
    const emailPromise = (async () => {
      const emailData = await fetchEmailData(
        data.type_id === 1 ? 'Add_Org_EndUser' : 'Add_Org_OEM_Partner',
      );
      const to = emailData.data.To;
      const subject = emailData.data.email_subject.replace(
        '{{Org Name}}',
        data.name,
      );
      const heading = emailData.data.email_heading.replace(
        '{{Org Name}}',
        data.name,
      );
      const content = emailData.data.email_content
        .replace('{{User Name}}', data.userName)
        .replace('{{Org Name}}', data.name)
        .replace(/{{Org Type}}/g, data.type_name || '');

      sendEmailFunction(to, subject, heading, content, data.token);
    })();

    // Log activity asynchronously
    const logPromise = logActivity({
      org_id: orgId,
      user_id: data.user_id,
      activity_type: 'create_org',
    });

    // Wait for email sending and logging to complete
    await Promise.all([emailPromise, logPromise]);

    return {
      errorCode: 0,
      data: {
        insertData: insertOrgResult.data,
        userInsertData: userInsertResult.data,
        domainInsertResults,
      },
    };
  } catch (error) {
    return { errorCode: 1, message: 'Organization is not added', data: null };
  }
}

const insertDomains = async (orgId: any, domains: string[]) => {
  try {
    // Fetch existing domains in bulk
    const { data: existingDomains, error: fetchError } = await supabase
      .from('domains')
      .select('id, name')
      .in('name', domains);

    if (fetchError) {
      throw new Error(`Error fetching domains: ${fetchError.message}`);
    }

    // Create a set of existing domain names for quick lookup
    const existingDomainMap = new Map(
      existingDomains.map((domain) => [domain.name, domain.id]),
    );

    // Determine which domains need to be inserted
    const domainsToInsert = domains.filter(
      (domain) => !existingDomainMap.has(domain),
    );

    // Insert new domains in bulk
    let newDomains = [];
    if (domainsToInsert.length > 0) {
      const { data: insertedDomains, error: insertError } = await supabase
        .from('domains')
        .insert(domainsToInsert.map((name) => ({ name })))
        .select('id, name');

      if (insertError) {
        throw new Error(`Error inserting domains: ${insertError.message}`);
      }

      // Map new domains to their IDs
      newDomains = insertedDomains;
      for (const domain of newDomains) {
        existingDomainMap.set(domain.name, domain.id);
      }
    }

    // Prepare domain-org associations
    const domainOrgAssociations = domains.map((domain) => ({
      org_id: orgId,
      domain_id: existingDomainMap.get(domain),
    }));

    // Insert domain-org associations in bulk
    const { data: associationResults, error: assocError } = await supabase
      .from('org_domains')
      .insert(domainOrgAssociations)
      .select();

    if (assocError) {
      throw new Error(
        `Error inserting domain-org associations: ${assocError.message}`,
      );
    }

    return {
      success: true,
      data: associationResults,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// async function updateOrganization(data: {
//   name: string;
//   description: string;
//   type_id: any;
//   status: string;
//   domain: string[];
//   org_id: any;
// }): Promise<Result<any>> {
//   // Replace `any` with the appropriate type if available
//   try {
//     // Update organization details
//     const { data: updateData, error } = await supabase
//       .from('org_details')
//       .update({
//         name: data.name,
//         description: data.description,
//         type_id: data.type_id,
//         status: data.status,
//       })
//       .eq('id', data.org_id)
//       .select();

//     if (error) {
//       return { errorCode: 1, data: null };
//     } else {
//       // Delete existing domains
//       const { error: deleteDomainError } = await supabase
//         .from('domains')
//         .delete()
//         .eq('org_id', data.org_id);

//       if (deleteDomainError) {
//         return { errorCode: 1, data: null };
//       }

//       // Insert new domains
//       const domainInsertResults = [];
//       for (const domain of data.domain) {
//         const { data: insertDomain, error: domainError } = await supabase
//           .from('domains')
//           .insert([{ name: domain, org_id: data.org_id }])
//           .select();

//         if (domainError) {
//           domainInsertResults.push({ success: false, error: domainError });
//         } else {
//           domainInsertResults.push({ success: true, data: insertDomain });
//         }
//       }

//       return { errorCode: 0, data: { updateData, domainInsertResults } };
//     }
//   } catch (error) {
//     return { errorCode: 1, data: null };
//   }
// }
async function updateOrganization(data: {
  name: string;
  description: string;
  type_id: any;
  status: string;
  domain: string[];
  org_id: any;
  user_id: any;
  details: any;
  userName: any;
  orgName: any;
  oldOrgName: any;
}): Promise<Result<any>> {
  const {
    org_id,
    name,
    description,
    type_id,
    status,
    domain,
    user_id,
    userName,
    oldOrgName,
  } = data;

  try {
    // Fetch current organization details
    const { data: orgDetails, error: fetchOrgError } = await supabase
      .from('org_details')
      .select('name,description')
      .eq('id', org_id)
      .single(); // Use .single() for fetching a single record

    if (fetchOrgError) {
      return {
        errorCode: 1,
        message: 'Error fetching current organization details',
        data: null,
      };
    }

    const oldOrgName = orgDetails.name; // Store the old organization name
    const oldDescription = orgDetails.description; // Store the old description

    // Check if the new name already exists in the database
    const { data: existingOrg, error: fetchError } = await supabase
      .from('org_details')
      .select('id')
      .eq('name', name)
      .neq('id', org_id);

    if (fetchError) {
      return {
        errorCode: 1,
        message: 'Error checking uniqueness of Organization name',
        data: null,
      };
    }

    if (existingOrg.length > 0) {
      return {
        errorCode: 1,
        message:
          'Organization name is already taken. Please choose a different name.',
        data: null,
      };
    }

    // Update organization details
    const { data: updateData, error: updateError } = await supabase
      .from('org_details')
      .update({ name, description, type_id, status })
      .eq('id', org_id)
      .select();

    if (updateError) {
      return {
        errorCode: 1,
        message: 'Error updating organization details',
        data: null,
      };
    }

    const domainInsertResults: any = [];
    const domainIds: any = {}; // To keep track of domain IDs and avoid duplicate inserts

    // Check and insert domains
    await Promise.all(
      domain.map(async (domain) => {
        // Check if domain exists
        const { data: existingDomain, error: checkError } = await supabase
          .from('domains')
          .select('id')
          .eq('name', domain);

        if (checkError) {
          domainInsertResults.push({
            success: false,
            message: `Error checking domain '${domain}'`,
            error: checkError,
          });
          return;
        }

        let domainId;

        if (existingDomain.length > 0) {
          domainId = existingDomain[0].id;
        } else {
          // Domain does not exist, insert new domain
          const { data: insertDomain, error: domainError } = await supabase
            .from('domains')
            .insert({ name: domain })
            .select();

          if (domainError) {
            domainInsertResults.push({
              success: false,
              message: `Error inserting domain '${domain}'`,
              error: domainError,
            });
            return;
          }

          domainId = insertDomain[0].id;
        }

        domainIds[domain] = domainId;

        // Check if the org_domain pair exists
        const { data: orgDomainPair, error: orgDomainCheckError } =
          await supabase
            .from('org_domains')
            .select('*')
            .eq('org_id', org_id)
            .eq('domain_id', domainId);

        if (orgDomainCheckError) {
          domainInsertResults.push({
            success: false,
            message: `Error checking org_domain for domain '${domain}'`,
            error: orgDomainCheckError,
          });
          return;
        }

        if (orgDomainPair.length === 0) {
          // Pair does not exist, insert it
          const { data: insertOrgDomain, error: orgDomainInsertError } =
            await supabase
              .from('org_domains')
              .insert([{ org_id, domain_id: domainId }])
              .select();

          if (orgDomainInsertError) {
            domainInsertResults.push({
              success: false,
              message: `Error inserting org_domain for domain '${domain}'`,
              error: orgDomainInsertError,
            });
            return;
          }
          // Log activity for adding domains
          await logActivity({
            org_id,
            user_id,
            activity_type: 'add_domain',
            details: `'${userName}' added the domain '${domain}' within the organization '${name}'.`,
          });
        }

        domainInsertResults.push({ success: true, data: domainId });

        // Associate users with the organization
        await associateUsersWithOrganization(org_id, domain, user_id);
      }),
    );

    // Log activity for updating the organization description
    if (oldDescription !== description) {
      await logActivity({
        org_id,
        user_id,
        activity_type: 'edit_org_description',
        details: `'${userName}' changed the organization description within the organization '${name}'.`,
      });
    }

    // Log activity for updating the organization name
    if (oldOrgName !== name) {
      await logActivity({
        org_id,
        user_id,
        activity_type: 'update_org',
        details: `'${userName}' changed the organization name from '${oldOrgName}' to '${name}'.`,
      });
    }

    return {
      errorCode: 0,
      message: 'Organization details updated successfully.',
      data: { updateData, domainInsertResults },
    };
  } catch (error) {
    return {
      errorCode: 1,
      message: 'An error occurred while updating the organization',
      data: null,
    };
  }
}
async function orgNameCheck(name: any, org_id: any) {
  try {
    if (org_id != null) {
      const { data: orgCheckData, error: orgCheckError } = await supabase
        .from('org_details')
        .select('id')
        .eq('name', name)
        .neq('id', org_id);
      if (orgCheckData && orgCheckData.length > 0) {
        return { errorCode: 1, message: 'Organization already exists.' };
      } else {
        return { errorCode: 0, message: 'Organization does not exists.' };
      }
    } else {
      const { data: orgCheckData, error: orgCheckError } = await supabase
        .from('org_details')
        .select('id')
        .eq('name', name);
      if (orgCheckData && orgCheckData.length > 0) {
        return { errorCode: 1, message: 'Organization already exists.' };
      } else {
        return { errorCode: 0, message: 'Organization does not exists.' };
      }
    }
  } catch (error) {
    return { errorCode: 1, message: 'Failed to check organization name' };
  }
}
async function viewOrganization(org_id: any): Promise<Result<any>> {
  try {
    // Fetch organization details and type in parallel
    const [orgDetailsResult, orgDomainIdsResult] = await Promise.all([
      supabase
        .from('org_details')
        .select('id, name, description, type_id, status')
        .eq('id', org_id)
        .single(),
      supabase.from('org_domains').select('domain_id').eq('org_id', org_id),
    ]);

    const { data: orgDetails, error: orgError } = orgDetailsResult;
    const { data: orgDomainIds, error: domainIdsError } = orgDomainIdsResult;

    if (orgError) {
      // throw new Error('Failed to fetch organization details.');
      return {
        errorCode: 1,
        data: null,
        message: 'Failed to fetch organization details',
      };
    }
    if (!orgDetails) {
      return {
        errorCode: 1,
        data: null,
        message: 'Organization details not found',
      };
    }

    if (domainIdsError) {
      return {
        errorCode: 1,
        data: null,
        message: 'Failed to fetch organization domains',
      };
    }
    if (!orgDomainIds || orgDomainIds.length === 0) {
      return {
        errorCode: 1,
        data: null,
        message: 'Domains not found for the organization',
      };
    }

    // Fetch organization type name and domain details in parallel
    const [orgTypeResult, domainsResult] = await Promise.all([
      supabase
        .from('org_types')
        .select('name')
        .eq('id', orgDetails.type_id)
        .single(),
      supabase
        .from('domains')
        .select('id, name')
        .in(
          'id',
          orgDomainIds.map((orgDomain) => orgDomain.domain_id),
        ),
    ]);

    const { data: orgType, error: orgTypeError } = orgTypeResult;
    const { data: domains, error: domainsError } = domainsResult;

    if (orgTypeError || !orgType || domainsError || !domains) {
      return { errorCode: 1, data: null, message: 'Error fetching Details' };
    }

    // Construct the OrgDetail object
    const orgWithDomains: any = {
      id: orgDetails.id,
      name: orgDetails.name,
      description: orgDetails.description,
      type_id: orgDetails.type_id,
      status: orgDetails.status,
      // type_name: orgType.name,
      domains: domains.map((domain) => ({
        id: domain.id,
        name: domain.name,
      })),
    };

    return { errorCode: 0, data: orgWithDomains };
  } catch (error) {
    return { errorCode: 1, data: null, message: 'Error fetching Details' };
  }
}
// async function deleteDomains(
//   org_id: any,
//   domain_id: any,
//   user_id: any,
// ): Promise<Result<any>> {
//   try {
//     // Validate the input
//     if (!org_id || !domain_id) {
//       return { errorCode: 1, message: 'Invalid input', data: null };
//     }

//     // Delete the domain from org_domains table for the specified organization
//     const { error: deleteOrgDomainError } = await supabase
//       .from('org_domains')
//       .delete()
//       .eq('org_id', org_id)
//       .eq('domain_id', domain_id);

//     if (deleteOrgDomainError) {
//       return {
//         errorCode: 1,
//         message: 'Error deleting domain from org_domains',
//         data: null,
//       };
//     }

//     // Check if the domain is associated with any other organization
//     const { data: domain, error: checkOtherOrgsError } = await supabase
//       .from('org_domains')
//       .select('*')
//       .eq('domain_id', domain_id);

//     // If the domain is not found in any other org_domains entries, delete it from domains table
//     if (!domain || domain.length === 0) {
//       const { error: deleteDomainError } = await supabase
//         .from('domains')
//         .delete()
//         .eq('id', domain_id);

//       if (deleteDomainError) {
//         return {
//           errorCode: 1,
//           message: 'Error deleting domain from domains table',
//           data: null,
//         };
//       }
//     }

//     return {
//       errorCode: 0,
//       message: 'Domain deleted successfully',
//       data: null,
//     };
//   } catch (error) {
//     return {
//       errorCode: 1,
//       message: 'Unexpected error',
//       data: null,
//     };
//   }
// }
// async function deleteDomains(data: any, userAccepts: any): Promise<Result<any>> {
//   try {
//     if (!data.org_id || !data.domain_id) {
//       return { errorCode: 1, message: 'Invalid input', data: null };
//     }

//     const [{ data: user, error: userError }, { data: domainData, error: domainError }] = await Promise.all([
//       supabase.from('users').select('email').eq('id', data.user_id).single(),
//       supabase.from('domains').select('name').eq('id', data.domain_id).single(),
//     ]);

//     if (userError || !user) {
//       return { errorCode: 1, message: 'Error fetching user email', data: null };
//     }

//     if (domainError || !domainData) {
//       return { errorCode: 1, message: 'Error fetching domain information', data: null };
//     }

//     const userEmailDomain = user.email.split('@')[1];
//     const domainName = domainData.name;

//     if (userEmailDomain === domainName && !userAccepts) {
//       return { errorCode: 2, message: 'User confirmation required for deleting own email domain', data: null };
//     }

//     const { data: orgDomains, error: orgDomainsError } = await supabase
//       .from('org_domains')
//       .select('domain_id')
//       .eq('org_id', data.org_id);

//     if (orgDomainsError) {
//       return { errorCode: 1, message: 'Error fetching organization domains', data: null };
//     }

//     if (orgDomains.length === 1 && orgDomains[0].domain_id === data.domain_id) {
//       return { errorCode: 1, message: 'Cannot delete the last domain associated with the organization', data: null };
//     }

//     const { data: domainAssociations, error: checkOtherOrgsError } = await supabase
//       .from('org_domains')
//       .select('org_id')
//       .eq('domain_id', data.domain_id)
//       .neq('org_id', data.org_id);

//     if (checkOtherOrgsError) {
//       return { errorCode: 1, message: 'Error checking domain associations', data: null };
//     }

//     if (domainAssociations && domainAssociations.length > 0) {
//       return { errorCode: 1, message: 'Cannot delete domain associated with other organizations', data: null };
//     }

//     const { error: deleteOrgDomainError } = await supabase
//       .from('org_domains')
//       .delete()
//       .eq('org_id', data.org_id)
//       .eq('domain_id', data.domain_id);

//     if (deleteOrgDomainError) {
//       return { errorCode: 1, message: 'Error deleting domain from org_domains', data: null };
//     }

//     const { data: domainAfterDelete, error: checkDomainAfterDeleteError } = await supabase
//       .from('org_domains')
//       .select('*')
//       .eq('domain_id', data.domain_id);

//     if (!domainAfterDelete || domainAfterDelete.length === 0) {
//       const { error: deleteDomainError } = await supabase
//         .from('domains')
//         .delete()
//         .eq('id', data.domain_id);

//       if (deleteDomainError) {
//         return { errorCode: 1, message: 'Error deleting domain from domains table', data: null };
//       }
//     }

//     await logActivity({
//       user_id: data.user_id,
//       org_id: data.org_id,
//       activity_type: 'remove_domain',
//       details: `Removed the domain '${domainName}' within the organization '${data.name}'`,
//     });

//     return { errorCode: 0, message: 'Domain deleted successfully', data: null };
//   } catch (error) {
//     return { errorCode: 1, message: 'Unexpected error', data: null };
//   }
// }
async function deleteDomains(data: any): Promise<Result<any>> {
  try {
    // Validate the input
    if (!data.org_id || !data.domain_id) {
      return { errorCode: 1, message: 'Invalid input', data: null };
    }

    // Fetch the user's email and the domain information in parallel
    const [
      { data: user, error: userError },
      { data: domainData, error: domainError },
    ] = await Promise.all([
      supabase.from('users').select('email').eq('id', data.user_id).single(),
      supabase.from('domains').select('name').eq('id', data.domain_id).single(),
    ]);

    if (userError || !user) {
      return { errorCode: 1, message: 'Error fetching user email', data: null };
    }

    if (domainError || !domainData) {
      return {
        errorCode: 1,
        message: 'Error fetching domain information',
        data: null,
      };
    }

    // const userEmailDomain = user.email.split('@')[1];
    const domainName = domainData.name;

    // If the user's email domain matches the domain being deleted, do not delete
    // if (userEmailDomain === domainName) {
    //   return {
    //     errorCode: 1,
    //     message: 'Cannot delete domain associated with user email',
    //     data: null,
    //   };
    // }

    // Check if the domain is associated with any other organization
    // const { data: domainAssociations, error: checkOtherOrgsError } =
    //   await supabase
    //     .from('org_domains')
    //     .select('org_id')
    //     .eq('domain_id', data.domain_id)
    //     .neq('org_id', data.org_id);

    // if (checkOtherOrgsError) {
    //   return {
    //     errorCode: 1,
    //     message: 'Error checking domain associations',
    //     data: null,
    //   };
    // }

    // If the domain is associated with other organizations, do not delete
    // if (domainAssociations && domainAssociations.length > 0) {
    //   return {
    //     errorCode: 1,
    //     message: 'Cannot delete domain associated with other organizations',
    //     data: null,
    //   };
    // }

    // Delete the domain from org_domains table for the specified organization
    const { error: deleteOrgDomainError } = await supabase
      .from('org_domains')
      .delete()
      .eq('org_id', data.org_id)
      .eq('domain_id', data.domain_id);

    if (deleteOrgDomainError) {
      return {
        errorCode: 1,
        message: 'Error deleting domain from org_domains',
        data: null,
      };
    }

    // Check if the domain is associated with any other organization again
    const { data: domainAfterDelete, error: checkDomainAfterDeleteError } =
      await supabase
        .from('org_domains')
        .select('*')
        .eq('domain_id', data.domain_id);

    // If the domain is not found in any other org_domains entries, delete it from domains table
    if (!domainAfterDelete || domainAfterDelete.length === 0) {
      const { error: deleteDomainError } = await supabase
        .from('domains')
        .delete()
        .eq('id', data.domain_id);

      if (deleteDomainError) {
        return {
          errorCode: 1,
          message: 'Error deleting domain from domains table',
          data: null,
        };
      }
    }
    const userName = data.userName;
    const orgName = data.name;
    await logActivity({
      user_id: data.user_id,
      org_id: data.org_id,
      activity_type: 'remove_domain',
      details: `'${userName}' removed the domain '${domainName}' within the organization '${orgName}'`,
    });
    return { errorCode: 0, message: 'Domain deleted successfully', data: null };
  } catch (error) {
    return { errorCode: 1, message: 'Unexpected error', data: null };
  }
}
async function confirmDeletion(data: {
  user_id: any;
  domainName: any;
}): Promise<Result<any>> {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('email')
    .eq('id', data.user_id);
  if (user) {
    const userEmailDomain = user[0].email.split('@')[1];
    if (userEmailDomain === data.domainName) {
      return {
        errorCode: 0,
        message: `You are about to remove the domain '${data.domainName}' which is the same as your own email domain. This might prevent your colleagues from automatically joining this organization. Do you want to proceed with the deletion?`,
        data: data,
      };
    }
  }
  return { errorCode: 1, message: 'Deletion confirmed', data: null };
}

// async function deleteDomains(data: any): Promise<Result<any>> {
//   try {
//     // Validate the input
//     if (!data.org_id || !data.domain_id) {
//       return { errorCode: 1, message: 'Invalid input', data: null };
//     }

//     // Fetch the user's email and the domain information in parallel
//     const [
//       { data: user, error: userError },
//       { data: domainData, error: domainError },
//     ] = await Promise.all([
//       supabase.from('users').select('email').eq('id', data.user_id).single(),
//       supabase.from('domains').select('name').eq('id', data.domain_id).single(),
//     ]);

//     if (userError || !user) {
//       return { errorCode: 1, message: 'Error fetching user email', data: null };
//     }

//     if (domainError || !domainData) {
//       return {
//         errorCode: 1,
//         message: 'Error fetching domain information',
//         data: null,
//       };
//     }

//     const userEmailDomain = user.email.split('@')[1];
//     const domainName = domainData.name;

//     // If the user's email domain matches the domain being deleted, do not delete
//     if (userEmailDomain === domainName) {
//       return {
//         errorCode: 1,
//         message: 'Cannot delete domain associated with user email',
//         data: null,
//       };
//     }

//     // Check if the domain is associated with any other organization
//     const { data: domainAssociations, error: checkOtherOrgsError } =
//       await supabase
//         .from('org_domains')
//         .select('org_id')
//         .eq('domain_id', data.domain_id)
//         .neq('org_id', data.org_id);

//     if (checkOtherOrgsError) {
//       return {
//         errorCode: 1,
//         message: 'Error checking domain associations',
//         data: null,
//       };
//     }

//     // If the domain is associated with other organizations, do not delete
//     if (domainAssociations && domainAssociations.length > 0) {
//       return {
//         errorCode: 1,
//         message: 'Cannot delete domain associated with other organizations',
//         data: null,
//       };
//     }

//     // Delete the domain from org_domains table for the specified organization
//     const { error: deleteOrgDomainError } = await supabase
//       .from('org_domains')
//       .delete()
//       .eq('org_id', data.org_id)
//       .eq('domain_id', data.domain_id);

//     if (deleteOrgDomainError) {
//       return {
//         errorCode: 1,
//         message: 'Error deleting domain from org_domains',
//         data: null,
//       };
//     }

//     // Check if the domain is associated with any other organization again
//     const { data: domainAfterDelete, error: checkDomainAfterDeleteError } =
//       await supabase
//         .from('org_domains')
//         .select('*')
//         .eq('domain_id', data.domain_id);

//     // If the domain is not found in any other org_domains entries, delete it from domains table
//     if (!domainAfterDelete || domainAfterDelete.length === 0) {
//       const { error: deleteDomainError } = await supabase
//         .from('domains')
//         .delete()
//         .eq('id', data.domain_id);

//       if (deleteDomainError) {
//         return {
//           errorCode: 1,
//           message: 'Error deleting domain from domains table',
//           data: null,
//         };
//       }
//     }
//     const userName = data.userName;
//     const orgName = data.name;
//     await logActivity({
//       user_id: data.user_id,
//       org_id: data.org_id,
//       activity_type: 'remove_domain',
//       details: `'${userName}' removed the domain '${domainName}' within the organization '${orgName}'`,
//     });
//     return { errorCode: 0, message: 'Domain deleted successfully', data: null };
//   } catch (error) {
//     return { errorCode: 1, message: 'Unexpected error', data: null };
//   }
// }

async function deleteOrganization(org_id: any): Promise<Result<null>> {
  try {
    // Delete matching domains from 'domains' table
    const { error: domainError } = await supabase
      .from('domains')
      .delete()
      .eq('org_id', org_id);

    // Delete organization details from 'org_details' table
    const { error: orgError } = await supabase
      .from('org_details')
      .delete()
      .eq('id', org_id);

    if (orgError || domainError) {
      return { errorCode: 1, data: null };
    } else {
      return { errorCode: 0, data: null };
    }
  } catch (error) {
    return { errorCode: 1, data: null };
  }
}
async function requestOrgDeletion(org_id: any): Promise<Result<any>> {
  try {
    const id = org_id;

    // Check if the organization has associated sites
    const { data: siteDetails, error: siteError } = await supabase
      .from('sites_detail')
      .select('id')
      .eq('org_id', id);

    if (siteError) {
      return {
        errorCode: 1,
        message: 'Error fetching site details.',
        data: null,
      };
    }

    // Check if the organization has sites associated with it
    if (siteDetails && siteDetails.length > 0) {
      return {
        errorCode: 2,
        message:
          'Organization has associated sites. Do you really want to delete?',
        data: org_id,
      };
    } else {
      return {
        errorCode: 0,
        message: 'Organization can be deleted. No associated sites found.',
        data: org_id,
      };
    }
  } catch (error) {
    // Handle unexpected errors
    return {
      errorCode: 1,
      message: 'Unexpected error occurred while processing deletion request.',
      data: null,
    };
  }
}

async function reqOrgDeleteMail(data: any): Promise<any> {
  // Fetch email configuration
  try {
    const emailResult = await fetchEmailData('Org_Delete_Request');
    const userName: string = data.userName;
    const orgName: string = data.org_name;
    const emailData = emailResult.data;
    const to: string = emailData.To;
    const subject: string = emailData.email_subject;
    const heading: string = emailData.email_heading;
    const contentTemplate: string = emailData.email_content;

    const headingData = heading
      .replace('{{User Name}}', userName)
      .replace('{{Org Name}}', orgName);
    const contentData = contentTemplate
      .replace('{{User Name}}', userName)
      .replace('{{Org Name}}', orgName);

    // Send email
    await sendEmailFunction(to, subject, headingData, contentData, data.token);

    const email_data: any = await fetchEmailData('Org_Delete_Request_User');
    const toUser = data.userName;
    const subjectUser = email_data.data.email_subject;
    const headingUser = email_data.data.email_heading;
    const contentUser = email_data.data.email_content;
    const toData = toUser.replace('{{Target User EMail}}', toUser);
    const headingUserData = headingUser.replace('{{Org Name}}', orgName);
    const contentUserData = contentUser.replace('{{Org Name}}', orgName);

    // Send email
    await sendEmailFunction(
      toData,
      subjectUser,
      headingUserData,
      contentUserData,
      data.token,
    );
    return {
      errorCode: 0,
      message: 'Organization deletion request sent successfully.',
      data: null,
    };
  } catch (error) {
    // Handle unexpected errors
    return {
      errorCode: 1,
      message: 'Unexpected error',
      data: null,
    };
  }
}
async function getUserRole(): Promise<Result<UserRole[]>> {
  try {
    // Fetch user roles
    const { data: userRoles, error } = await supabase
      .from('user_role')
      .select('*');

    if (error) {
      return { errorCode: 1, data: null, message: error.message };
    } else {
      return { errorCode: 0, data: userRoles };
    }
  } catch (error) {
    return {
      errorCode: 1,
      data: null,
      message: 'Unexpected error occurred while fetching user roles',
    };
  }
}

export {
  addOrganization,
  associateUsersWithOrganization,
  confirmDeletion,
  deleteDomains,
  deleteOrganization,
  fetchOrganizationAndSiteDetails,
  fetchOrganizationTypes,
  getUserRole,
  organizationSearch,
  organizationSidebarList,
  orgNameCheck,
  reqOrgDeleteMail,
  requestOrgDeletion,
  updateOrganization,
  viewOrganization,
};
