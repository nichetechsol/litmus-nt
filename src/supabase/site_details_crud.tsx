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
async function updateSite(
  siteId: any,
  updateData: UpdateSiteData,
): Promise<Result<any>> {
  try {
    // Validate the input
    if (!siteId || !updateData) {
      return { errorCode: 1, message: 'Invalid input', data: null };
    }

    // Update site details
    const { data: updatedSite, error: updateError } = await supabase
      .from('sites_detail')
      .update(updateData)
      .eq('id', siteId)
      .select();

    // Check for errors during the update operation
    if (updateError) {
      return {
        errorCode: 1,
        message: 'Error updating site details',
        data: null,
      };
    } else {
      return {
        errorCode: 0,
        message: 'Site details updated successfully',
        data: updatedSite,
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

export { addSites, addSitesConfirm, deleteSite, updateSite };
