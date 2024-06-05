/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  message?: string;
  data: T | null;
}

interface OrganizationWithSiteCount {
  errorCode: number;
  org_id: string;
  org_name: string;
  sites_count: number;
}

async function fetchOrganizationAndSiteDetails(
  user_id: any | null,
): Promise<OrganizationWithSiteCount[] | null> {
  try {
    // Fetch org_id associated with the user
    const { data: userOrgs, error: userOrgError } = await supabase
      .from('org_users')
      .select('org_id')
      .eq('user_id', user_id);

    if (userOrgError) {
      throw userOrgError;
    }

    // Extract the org_ids from userOrgs
    const orgIds = userOrgs.map((org) => org.org_id);

    // Fetch organization details based on orgIds
    const { data: orgDetails, error: orgError } = await supabase
      .from('org_details')
      .select('*')
      .in('id', orgIds)
      .order('created_at', { ascending: false });

    if (orgError) {
      throw orgError;
    }

    // Fetch site details
    const { data: siteDetails, error: siteError } = await supabase
      .from('sites_detail')
      .select('*');

    if (siteError) {
      throw siteError;
    }

    // Count sites for each organization
    const orgsWithSitesCount = orgDetails.map((org) => {
      const sitesCountForOrg = siteDetails.filter(
        (site) => site.org_id === org.id,
      ).length;
      return {
        errorCode: 0,
        org_id: org.id,
        org_name: org.name,
        sites_count: sitesCountForOrg,
      };
    });

    return orgsWithSitesCount;
  } catch (error) {
    return null;
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
      throw userOrgError;
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
        return { errorCode: 1, data: null };
      } else {
        orgDetails = data ?? [];
      }
    }

    return { errorCode: 0, data: orgDetails };
  } catch (error) {
    return { errorCode: 1, data: null };
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
      return { errorCode: 1, data: null };
    } else {
      return { errorCode: 0, data: orgTypes };
    }
  } catch (error) {
    return { errorCode: 1, data: null };
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
}): Promise<Result<any>> {
  try {
    // Insert organization details
    const { data: insertData, error: insertError } = await supabase
      .from('org_details')
      .insert([
        {
          name: data.name,
          description: data.description,
          type_id: data.type_id,
          status: data.status,
        },
      ])
      .select();

    if (insertError) {
      return { errorCode: 1, data: null };
    }

    // Insert organization user
    const { data: userInsertData, error: userInsertError } = await supabase
      .from('org_users')
      .insert([
        {
          user_id: data.user_id,
          role_id: 1,
          org_id: insertData[0].id,
        },
      ])
      .select();

    if (userInsertError) {
      return { errorCode: 1, data: null };
    }

    // Insert domains
    const domainInsertResults = [];
    const orgId = insertData[0].id;

    for (const domain of data.domain) {
      const { data: insertDomain, error: domainError } = await supabase
        .from('domains')
        .insert([{ name: domain, org_id: orgId }])
        .select();

      if (domainError) {
        domainInsertResults.push({ success: false, error: domainError });
      } else {
        domainInsertResults.push({ success: true, data: insertDomain });
      }
    }
    try {
      await sendEmailFunction(
        'soumiya@nichetech.in',
        'Add Organization',
        'add_org',
        'eyJhbGciOiJIUzI1NiIsImtpZCI6ImpmZVZXUEovY3RVdElDRTYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE3NTcxMTc5LCJpYXQiOjE3MTc1Njc1NzksImlzcyI6Imh0dHBzOi8vZW1zaml1enRjaW5oYXBhdXJjcmwuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImQ2MTA4ODVmLWU2Y2YtNDdmZi04ODBhLTkxN2YzN2Q2Y2EzOSIsImVtYWlsIjoicGFydGhyQG5pY2hldGVjaC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxNzUwNDkxMn1dLCJzZXNzaW9uX2lkIjoiNGU2YzAyMGMtMDE3Mi00M2VmLWE0YzYtYTYzMjdmMzliMDk0IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.lK5uoj3Csv3tSc_BwKsp90lWiSMvc5NX8zmfsBBg5Sw',
      );
      // Clear input fields after successful email send
    } catch (error) {
      // Handle error here
    }
    return {
      errorCode: 0,
      data: { insertData, userInsertData, domainInsertResults },
    };
  } catch (error) {
    return { errorCode: 1, data: null };
  }
}

async function updateOrganization(data: {
  name: string;
  description: string;
  type_id: any;
  status: string;
  domain: string[];
  org_id: any;
}): Promise<Result<any>> {
  // Replace `any` with the appropriate type if available
  try {
    // Update organization details
    const { data: updateData, error } = await supabase
      .from('org_details')
      .update({
        name: data.name,
        description: data.description,
        type_id: data.type_id,
        status: data.status,
      })
      .eq('id', data.org_id)
      .select();

    if (error) {
      return { errorCode: 1, data: null };
    } else {
      // Delete existing domains
      const { error: deleteDomainError } = await supabase
        .from('domains')
        .delete()
        .eq('org_id', data.org_id);

      if (deleteDomainError) {
        return { errorCode: 1, data: null };
      }

      // Insert new domains
      const domainInsertResults = [];
      for (const domain of data.domain) {
        const { data: insertDomain, error: domainError } = await supabase
          .from('domains')
          .insert([{ name: domain, org_id: data.org_id }])
          .select();

        if (domainError) {
          domainInsertResults.push({ success: false, error: domainError });
        } else {
          domainInsertResults.push({ success: true, data: insertDomain });
        }
      }

      return { errorCode: 0, data: { updateData, domainInsertResults } };
    }
  } catch (error) {
    return { errorCode: 1, data: null };
  }
}

async function viewOrganization(org_id: any): Promise<Result<OrgDetail[]>> {
  try {
    // Fetch organization details
    const { data: orgDetails, error } = await supabase
      .from('org_details')
      .select('*')
      .eq('id', org_id);

    if (error) {
      return { errorCode: 1, data: null };
    } else {
      return { errorCode: 0, data: orgDetails };
    }
  } catch (error) {
    return { errorCode: 1, data: null };
  }
}

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

async function getUserRole(): Promise<Result<UserRole[]>> {
  try {
    // Fetch user roles
    const { data: userRoles, error } = await supabase
      .from('user_role')
      .select('*');

    if (error) {
      return { errorCode: 1, data: null };
    } else {
      return { errorCode: 0, data: userRoles };
    }
  } catch (error) {
    return { errorCode: 1, data: null };
  }
}

export {
  addOrganization,
  deleteOrganization,
  fetchOrganizationAndSiteDetails,
  fetchOrganizationTypes,
  getUserRole,
  organizationSearch,
  organizationSidebarList,
  updateOrganization,
  viewOrganization,
};
