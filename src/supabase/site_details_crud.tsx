/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { logActivity } from '@/supabase/activity';
import { sendEmailFunction } from '@/supabase/email';
import fetchEmailData from '@/supabase/email_configuration';

import { supabase } from './db';

// Define interfaces for the site data and result structure
interface SiteData {
  org_id: any;
  name: string;
  type_id: any;
  address1: string;
  address2?: string;
  city: string;
  pin_code: string;
  about_site?: string;
  status: string;
  country_id: any;
  state_id: any;
  user_id: any;
  description: any;
  token: any;
  userName: any;
  org_name: any;
}

interface UpdateSiteData {
  name?: string;
  type_id?: any;
  address1?: string;
  address2?: string;
  city?: string;
  pin_code?: string;
  about_site?: string;
  status?: string;
  country_id?: any;
  state_id?: any;
}

interface Result<T> {
  errorCode: number;
  message: string;
  data: T | null;
}

// Function to add a site
// async function addSites(data: SiteData): Promise<Result<any>> {
//   try {
//     // Check for duplicate site names in the organization
//     const { data: existingSite, error: duplicateCheckError } = await supabase
//       .from('sites_detail')
//       .select('id')
//       .eq('org_id', data.org_id)
//       .eq('name', data.name)
//       .single(); // Assuming a single record is expected

//     // If a duplicate is found, return an error
//     if (existingSite) {
//       return {
//         errorCode: 1,
//         message: 'Duplicate site name',
//         data: null,
//       };
//     }

//     // Check for errors during the duplicate check
//     if (duplicateCheckError && duplicateCheckError.code !== 'PGRST116') {
//       // PGRST116: No rows found
//       return {
//         errorCode: 1,
//         message: 'Error checking for duplicate site name',
//         data: null,
//       };
//     }

//     // Insert new site details if no duplicate is found
//     const { data: siteDetails, error: insertError } = await supabase
//       .from('sites_detail')
//       .insert([data])
//       .select();

//     // Check for errors during the insert operation
//     if (insertError) {
//       return {
//         errorCode: 1,
//         message: 'Error inserting site details',
//         data: null,
//       };
//     } else {
//       await logActivity({
//         org_id: data.org_id,
//         site_id: siteDetails[0].id,
//         user_id: data.user_id,
//         activity_type: 'create_site',
//       });

//       return {
//         errorCode: 0,
//         message: 'Site added successfully',
//         data: siteDetails,
//       };
//     }
//   } catch (error) {
//     return {
//       errorCode: 1,
//       message: 'Unexpected error',
//       data: null,
//     };
//   }
// }
async function addSites(data: SiteData): Promise<Result<any>> {
  try {
    // Check for duplicate site names in the organization
    const { data: existingSite, error } = await supabase
      .from('sites_detail')
      .select('*')
      .eq('org_id', data.org_id)
      .eq('name', data.name); // Assuming a single record is expected or handle appropriately

    // Handle the case where no duplicate is found
    if (existingSite && existingSite.length > 0) {
      return {
        errorCode: 1,
        message: 'Site name already exists',
        data: null,
      };
    }

    // Handle the case where no rows are found (PGRST116 error)
    if (error) {
      // Handle other errors during duplicate check
      return {
        errorCode: 1,
        message: 'Error checking for duplicate site name',
        data: null,
      };
    }

    const { data: currentSites, error: countError } = await supabase
      .from('sites_detail')
      .select('id')
      .eq('org_id', data.org_id);

    if (countError) {
      return {
        errorCode: 1,
        message: 'Error retrieving current site count',
        data: null,
      };
    }
    // Get entitlement limit for the organization
    const { data: entitlement, error: entitlementError } = await supabase
      .from('entitlements_package')
      .select('entitlement_value_id')
      .eq('org_id', data.org_id)
      .eq('entitlement_name_id', 16); // Assuming 'max_sites_prod' has id 14

    if (entitlementError) {
      return {
        errorCode: 1,
        message: 'Error retrieving entitlement limit',
        data: null,
      };
    }

    if (!entitlement || entitlement.length === 0) {
      return {
        errorCode: 1,
        message: 'No entitlement found for the organization',
        data: null,
      };
    }

    // Check entitlement value
    const { data: entitlementValue, error: valueError } = await supabase
      .from('entitlements_values')
      .select('value_number')
      .eq('id', entitlement[0].entitlement_value_id)
      .single();

    if (valueError) {
      return {
        errorCode: 1,
        message: 'Error retrieving entitlement value',
        data: null,
      };
    }

    // Check if current number of sites exceeds entitlement limit
    if (currentSites.length >= (entitlementValue.value_number ?? 0)) {
      return {
        errorCode: 2,
        message: 'Entitlement limit exceeded',
        data: data,
      };
    } else {
      // Insert new site details if no duplicate is found
      const { data: siteDetails, error: insertError } = await supabase
        .from('sites_detail')
        .insert([
          {
            org_id: data.org_id,
            name: data.name,
            type_id: data.type_id,
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            pin_code: data.pin_code,
            about_site: data.about_site,
            status: data.status,
            country_id: data.country_id,
            state_id: data.state_id,
          },
        ])
        .select();

      // Check for errors during the insert operation
      if (insertError) {
        return {
          errorCode: 1,
          message: 'Error inserting site details',
          data: null,
        };
      } else {
        const { data: userInsertData, error: userInsertError } = await supabase
          .from('site_users')
          .insert([
            {
              user_id: data.user_id,
              role_id: 1,
              site_id: siteDetails[0].id,
            },
          ])
          .select();

        if (userInsertError) {
          return {
            errorCode: 1,
            message: 'User not added successfully',
            data: null,
          };
        }

        // Check current site count for the organization
      }
      await logActivity({
        org_id: data.org_id,
        site_id: siteDetails[0].id,
        user_id: data.user_id,
        activity_type: 'create_site',
      });
      const userName: any = data.userName;
      const siteName: any = data.name;
      const orgName: any = data.org_name;
      const email_data: any = await fetchEmailData('Add_Site_Limit_Not_Exceed');
      const to = email_data.data.To;
      const subject = email_data.data.email_subject;
      const heading = email_data.data.email_heading;
      const content = email_data.data.email_content;

      const contentData = content
        .replace('{{User Name}}', userName)
        .replace('{{Site Name}}', siteName)
        .replace('{{Org name}}', orgName);
      sendEmailFunction(to, subject, heading, contentData, data.token);
      return {
        errorCode: 0,
        message: 'Site added successfully',
        data: siteDetails,
      };
    }
  } catch (error) {
    // console.error('Error adding site:', error);
    return {
      errorCode: 1,
      message: 'Unexpected error',
      data: null,
    };
  }
}
async function addSitesConfirm(data: any) {
  try {
    // Insert new site details if no duplicate is found
    const { data: siteDetails, error: insertError } = await supabase
      .from('sites_detail')
      .insert([
        {
          org_id: data.org_id,
          name: data.name,
          type_id: data.type_id,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          pin_code: data.pin_code,
          about_site: data.about_site,
          status: data.status,
          country_id: data.country_id,
          state_id: data.state_id,
        },
      ])
      .select();

    // Check for errors during the insert operation
    if (insertError) {
      return {
        errorCode: 1,
        message: 'Site is not updated successfully',
        data: null,
      };
    } else {
      const { data: userInsertData, error: userInsertError } = await supabase
        .from('site_users')
        .insert([
          {
            user_id: data.user_id,
            role_id: 1,
            site_id: siteDetails[0].id,
          },
        ])
        .select();

      if (userInsertError) {
        return {
          errorCode: 1,
          message: 'User not added successfully',
          data: null,
        };
      }

      // Check current site count for the organization
    }
    await logActivity({
      org_id: data.org_id,
      site_id: siteDetails[0].id,
      user_id: data.user_id,
      activity_type: 'create_site',
    });
    const userName: any = data.userName;
    const siteName: any = data.name;
    const orgName: any = data.org_name;
    const email_data: any = await fetchEmailData('Add_Site_Limit_Exceed');
    const to = email_data.data.To;
    const subject = email_data.data.email_subject;
    const heading = email_data.data.email_heading;
    const content = email_data.data.email_content;

    const contentData = content
      .replace('{{User Name}}', userName)
      .replace('{{Site Name}}', siteName)
      .replace('{{Org Name}}', orgName);
    sendEmailFunction(to, subject, heading, contentData, data.token);
    return {
      errorCode: 0,
      message: 'Site added successfully',
      data: siteDetails,
    };
  } catch (error) {
    // console.error('Error adding site:', error);
    return {
      errorCode: 1,
      message: 'Unexpected error',
      data: null,
    };
  }
}

// async function addSites(data: SiteData): Promise<Result<any>> {
//   try {
//     // Check for duplicate site name
//     const { data: existingSite, error: duplicateCheckError } = await supabase
//       .from('sites_detail')
//       .select('id')
//       .eq('org_id', data.org_id)
//       .eq('name', data.name)
//       .single();

//     if (duplicateCheckError && duplicateCheckError.code !== 'PGRST116') {
//       return {
//         errorCode: 1,
//         message: 'Error checking for duplicate site name',
//         data: null,
//       };
//     }
//     if (existingSite) {
//       return {
//         errorCode: 1,
//         message: 'Duplicate site name',
//         data: null,
//       };
//     }

//     // Check current site count for the organization
//     const { data: currentSites, error: countError } = await supabase
//       .from('sites_detail')
//       .select('id')
//       .eq('org_id', data.org_id);

//     if (countError) {
//       return {
//         errorCode: 1,
//         message: 'Error retrieving current site count',
//         data: null,
//       };
//     }

//     // Get entitlement limit for the organization
//     const { data: entitlement, error: entitlementError } = await supabase
//       .from('entitlements_package')
//       .select('entitlement_value_id')
//       .eq('org_id', data.org_id)
//       .eq('entitlement_name_id', 14);

//     if (entitlementError) {
//       return {
//         errorCode: 1,
//         message: 'Error retrieving entitlement limit',
//         data: null,
//       };
//     }

//     if (!entitlement || entitlement.length === 0) {
//       return {
//         errorCode: 1,
//         message: 'No entitlement found for the organization',
//         data: null,
//       };
//     }

//     // Check entitlement value
//     const { data: entitlementValue, error: valueError } = await supabase
//       .from('entitlements_values')
//       .select('value_number')
//       .eq('id', entitlement[0].entitlement_value_id)
//       .single();

//     if (valueError) {
//       return {
//         errorCode: 1,
//         message: 'Error retrieving entitlement value',
//         data: null,
//       };
//     }

//     // Check if current number of sites exceeds entitlement limit
//     if (currentSites.length >= (entitlementValue.value_number ?? 0)) {
//       return {
//         errorCode: 1,
//         message: 'Entitlement limit exceeded',
//         data: null,
//       };
//     }

//     // Insert new site details
//     const { data: insertedSite, error: insertError } = await supabase
//       .from('sites_detail')
//       .insert([data])
//       .single();

//     if (insertError) {
//       return {
//         errorCode: 1,
//         message: 'Error inserting site details',
//         data: null,
//       };
//     }

//     return {
//       errorCode: 0,
//       message: 'Site added successfully',
//       data: insertedSite,
//     };
//   } catch (error) {
//     let errorMessage = 'Unexpected error';
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }
//     return {
//       errorCode: 1,
//       message: errorMessage,
//       data: null,
//     };
//   }
// }

// Function to update a site
async function updateSite(updateData: any): Promise<Result<any>> {
  try {
    // Validate the input
    if (!updateData.siteId || !updateData.name || !updateData) {
      return {
        errorCode: 1,
        message: 'Invalid input. Please provide siteId and name.',
        data: null,
      };
    }
    // Fetch current site details
    const { data: currentSite, error: fetchCurrentError } = await supabase
      .from('sites_detail')
      .select(`*,site_types(name)`)
      .eq('id', updateData.siteId);

    if (fetchCurrentError) {
      return {
        errorCode: 1,
        message: 'Error fetching current site details',
        data: null,
      };
    }
    // Check if the new name already exists in the database, excluding the current site ID
    const { data: existingSites, error: fetchError } = await supabase
      .from('sites_detail')
      .select('id')
      .eq('name', updateData.name)
      .neq('id', updateData.siteId);

    if (fetchError) {
      return {
        errorCode: 1,
        message: 'Error checking uniqueness of site name',
        data: null,
      };
    }

    if (existingSites && existingSites.length > 0) {
      return {
        errorCode: 1,
        message: 'Site name is already taken. Please choose a different name.',
        data: null,
      };
    }

    // Update site details
    const { data, error } = await supabase
      .from('sites_detail')
      .update({
        name: updateData.name,
        type_id: updateData.type_id,
        address1: updateData.address1,
        address2: updateData.address2,
        city: updateData.city,
        pin_code: updateData.pin_code,
        about_site: updateData.about_site,
        status: updateData.status,
        country_id: updateData.country_id,
        state_id: updateData.state_id,
      })
      .eq('id', updateData.siteId).select(`
        *,
        site_types (
          name
        )
      `);

    // Handle update errors
    if (error) {
      return {
        errorCode: 1,
        message: 'Error updating site details. Please try again later.',
        data: null,
      };
    }

    if (!data) {
      return {
        errorCode: 1,
        message: 'No data returned after update. Site may not exist.',
        data: null,
      };
    }
    // Log each change individually
    const logPromises = [];
    if (currentSite[0].name !== updateData.name) {
      const activityType = 'edit_site_name';
      const activityDetails = `'${updateData.userName}' changed the site name from '${currentSite[0].name}' to' ${updateData.name}' within the organization '${updateData.orgName}'.`;
      logPromises.push(
        logActivity({
          org_id: updateData.org_id,
          site_id: updateData.siteId,
          user_id: updateData.user_id,
          activity_type: activityType,
          details: activityDetails,
        }),
      );
    }
    const currentSite_typeName = currentSite[0].site_types;
    const type_name = currentSite_typeName.name;
    const updatetypeName = data[0].site_types;
    const update_typeName = updatetypeName.name;

    if (currentSite[0].type_id !== updateData.type_id) {
      const activityType = 'edit_site_type';
      const activityDetails = `'${updateData.userName}' changed the site type from '${type_name}' to '${update_typeName}' within the site '${currentSite[0].name}'.`;
      logPromises.push(
        logActivity({
          org_id: updateData.org_id,
          site_id: updateData.siteId,
          user_id: updateData.user_id,
          activity_type: activityType,
          details: activityDetails,
        }),
      );
    }

    if (currentSite[0].about_site !== updateData.about_site) {
      const activityType = 'edit_site_description';
      const activityDetails = `'${updateData.userName}' changed the site description within the organization '${updateData.orgName}'.`;
      logPromises.push(
        logActivity({
          org_id: updateData.org_id,
          site_id: updateData.siteId,
          user_id: updateData.user_id,
          activity_type: activityType,
          details: activityDetails,
        }),
      );
    }

    if (
      currentSite[0].address1 !== updateData.address1 ||
      currentSite[0].address2 !== updateData.address2 ||
      currentSite[0].city !== updateData.city ||
      currentSite[0].pin_code !== updateData.pin_code ||
      currentSite[0].status !== updateData.status ||
      currentSite[0].country_id !== updateData.country_id ||
      currentSite[0].state_id !== updateData.state_id
    ) {
      const activityType = 'update_site';
      const activityDetails = `'${updateData.userName}' changed the site details within the organization '${updateData.orgName}'.`;
      logPromises.push(
        logActivity({
          org_id: updateData.org_id,
          site_id: updateData.siteId,
          user_id: updateData.user_id,
          activity_type: activityType,
          details: activityDetails,
        }),
      );
    }

    // Wait for all log activities to complete
    await Promise.all(logPromises);
    // Return success response
    return {
      errorCode: 0,
      message: 'Site details updated successfully',
      data: data,
    };
  } catch (error) {
    // console.error('Unexpected error during site update:');
    return {
      errorCode: 1,
      message: 'Unexpected error occurred. Please contact support.',
      data: null,
    };
  }
}
async function viewSite(site_id: any): Promise<Result<any>> {
  try {
    // Fetch site details along with site type name
    const { data: siteDetails, error } = await supabase
      .from('sites_detail')
      .select(
        `
        id,
        org_id,
        name,
        type_id,
        address1,
        address2,
        city,
        pin_code,
        about_site,
        status,
        country_id,
        state_id,
        site_types (name)
        `,
      )
      .eq('id', site_id)
      .single();

    if (error || !siteDetails) {
      console.error('Error fetching site details:', error);
      return {
        errorCode: 1,
        message: 'Error fetching site details',
        data: null,
      };
    }

    // Construct the SiteDetail object
    const siteWithDetails: any = {
      id: siteDetails.id,
      org_id: siteDetails.org_id,
      name: siteDetails.name,
      type_id: siteDetails.type_id,
      // type_name: siteDetails.site_types.name,
      address1: siteDetails.address1,
      address2: siteDetails.address2,
      city: siteDetails.city,
      pin_code: siteDetails.pin_code,
      about_site: siteDetails.about_site,
      status: siteDetails.status,
      country_id: siteDetails.country_id,
      state_id: siteDetails.state_id,
    };

    return {
      errorCode: 0,
      message: 'Site details fetched successfully',
      data: siteWithDetails,
    };
  } catch (error) {
    console.error('Error viewing site:', error);
    return { errorCode: 1, message: 'Unexpected error', data: null };
  }
}
// Function to delete a site
async function deleteSite(siteId: any): Promise<Result<any>> {
  try {
    // Validate the input
    if (!siteId) {
      return { errorCode: 1, message: 'Invalid input', data: null };
    }

    // Start a transaction to delete users associated with the site and then delete the site
    const { data: deleteUsers, error: deleteUsersError } = await supabase
      .from('site_users')
      .delete()
      .eq('site_id', siteId)
      .select();

    // Check for errors during the delete operation for site_users
    if (deleteUsersError) {
      return {
        errorCode: 1,
        message: 'Error deleting users from site_users table',
        data: null,
      };
    }

    // Delete site details
    const { data: deletedSite, error: deleteSiteError } = await supabase
      .from('sites_detail')
      .delete()
      .eq('id', siteId)
      .select();

    // Check for errors during the delete operation for sites_detail
    if (deleteSiteError) {
      return {
        errorCode: 1,
        message: 'Error deleting site details',
        data: null,
      };
    } else {
      return {
        errorCode: 0,
        message: 'Site details and associated users deleted successfully',
        data: { deletedSite, deleteUsers },
      };
    }
  } catch (error) {
    return {
      errorCode: 1,
      message: 'Unexpected error',
      data: null,
    };
  }
}
async function requestSiteDeletion(data: any): Promise<Result<any>> {
  try {
    const userName: any = data.userName;
    const siteName: any = data.siteName;
    const orgName: any = data.orgName;
    const email_data: any = await fetchEmailData('Site_Delete_Request');
    const to = email_data.data.To;
    const subject = email_data.data.email_subject;
    const heading = email_data.data.email_heading;
    const content = email_data.data.email_content;
    const headingData = heading
      .replace('{{User Name}}', userName)
      .replace('{{Site Name}}', siteName);
    const contentData = content
      .replace('{{User Name}}', userName)
      .replace('{{Site Name}}', siteName)
      .replace('{{Org Name}}', orgName);

    // Send email
    await sendEmailFunction(to, subject, headingData, contentData, data.token);
    const emailData: any = await fetchEmailData('Site_Delete_Request_User');
    const toUser = data.email;
    const subjectUser = emailData.data.email_subject;
    const headingUser = emailData.data.email_heading;
    const contentUser = emailData.data.email_content;
    const toData = toUser.replace('{{Target User EMail}}', toUser);
    const headingUserData = headingUser.replace('{{Site Name}}', siteName);
    const contentUserData = contentUser
      .replace('{{Site Name}}', siteName)
      .replace('{{Org Name}}', orgName);

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
      message: 'Site deletion request sent successfully.',
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
export {
  addSites,
  addSitesConfirm,
  deleteSite,
  requestSiteDeletion,
  updateSite,
  viewSite,
};
