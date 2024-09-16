/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@supabase/supabase-js';

import { logActivity } from '@/supabase/activity';
import { sendEmailFunction } from '@/supabase/email';
import fetchEmailData from '@/supabase/email_configuration';

import { supabase } from './db';

// Define the interfaces for the input data and result
export interface UserData {
  site_id: number;
  org_id?: number;
  email: string;
  firstname?: string;
  lastname?: string;
  user_id?: any;
  role_id?: any;
  token: any;
  userName: any;
  siteName: any;
  orgName: any;
  modifying_user_id?: any;
  user_role_id: any;
}
interface SiteUser {
  user_id: any;
  role_id: any;
}

interface Result<T> {
  errorCode: number;
  data: T | null;
}
interface ModifyResult<T> {
  errorCode: number;
  message: any;
  data: T | null;
}

// Function to get the role of a site user
async function getSiteUserRole(
  user_id: any,
  site_id: any,
): Promise<Result<any>> {
  if (!user_id || !site_id) {
    return { errorCode: 1, data: null };
  }

  try {
    const { data: siteUser, error: siteUserError } = await supabase
      .from('site_users')
      .select('role_id')
      .eq('site_id', site_id)
      .eq('user_id', user_id)
      .single();

    if (siteUserError) {
      return { errorCode: 1, data: null };
    }

    const role_id = siteUser.role_id;

    const { data: userRole, error: userRoleError } = await supabase
      .from('user_role')
      .select('*')
      .eq('id', role_id)
      .single();

    if (userRoleError) {
      return { errorCode: 1, data: null };
    }

    return { errorCode: 0, data: userRole };
  } catch (error) {
    return { errorCode: -1, data: null };
  }
}

// Function to add a user to sites based on email or name
async function addUserToSites(UserData: UserData): Promise<Result<string>> {
  if (!UserData.org_id) {
    return { errorCode: 1, data: 'User Not added successfully' };
  }

  try {
    let users: User[] | null = null;
    let selectError: any;
    if (UserData.user_role_id == 2) {
      if (UserData.role_id == 1) {
        return { errorCode: 1, data: 'Admin cannot add the Owner' };
      }
    }
    if (UserData.email && UserData.email !== '') {
      ({ data: users, error: selectError } = await supabase
        .from('users')
        .select('*')
        .eq('email', UserData.email));

      if (selectError) {
        return { errorCode: 1, data: 'User is not in Central V2' };
      }
      if (users?.length === 0) {
        if (UserData.firstname && UserData.lastname) {
          // Select the user from the 'users' table using the firstname and lastname
          ({ data: users, error: selectError } = await supabase
            .from('users')
            .select('*')
            .eq('firstname', UserData.firstname)
            .eq('lastname', UserData.lastname));

          // Check for errors during the select operation
          if (selectError) {
            return { errorCode: 1, data: 'User is not in Central V2' };
          }
        }
      }
    } else if (UserData.firstname && UserData.lastname) {
      ({ data: users, error: selectError } = await supabase
        .from('users')
        .select('*')
        .eq('firstname', UserData.firstname)
        .eq('lastname', UserData.lastname));

      if (selectError) {
        return { errorCode: 1, data: 'User is not in Central V2' };
      }
    } else {
      return { errorCode: 1, data: 'User is not in Central V2' };
    }

    if (!users || users.length === 0) {
      return { errorCode: 1, data: 'User Not found in central v2' };
    } else {
      const { data: org_users, error: orgSelectError } = await supabase
        .from('org_users')
        .select('*')
        .eq('user_id', users[0].id)
        .eq('org_id', UserData.org_id);

      if (orgSelectError) {
        return { errorCode: 1, data: 'User is not in organization' };
      } else {
        if (org_users.length !== 0) {
          const { data: site_users, error: siteSelectError } = await supabase
            .from('site_users')
            .select('*')
            .eq('user_id', users[0].id)
            .eq('site_id', UserData.site_id);

          if (siteSelectError) {
            return { errorCode: 1, data: 'User not added ' };
          } else {
            if (site_users.length === 0) {
              const { data: insertedSiteUsers, error: siteInsertError } =
                await supabase
                  .from('site_users')
                  .insert([
                    {
                      user_id: users[0].id,
                      site_id: UserData.site_id,
                      role_id: UserData.role_id,
                    },
                  ])
                  .select();

              if (siteInsertError) {
                return { errorCode: 1, data: 'User not added' };
              } else {
                // Prepare email data
                const emaildata: any = {
                  org_id: UserData.org_id,
                  user_id: UserData.user_id,
                  target_user_id: users[0].id,
                  site_id: UserData.site_id,
                };
                const userName: any = UserData.userName;
                const orgName: any = UserData.orgName;
                const siteName: any = UserData.siteName;
                const email_data: any =
                  await fetchEmailData('Add_User_to_Site');
                const to = UserData.email;
                const subject = email_data.data.email_subject;
                const heading = email_data.data.email_heading;
                const content = email_data.data.email_content;
                const toData = to.replace('{{Target User EMail}}', to);
                // const siteData = siteName.replace('{{Site Name}}', siteName);
                const headingData = heading
                  .replace('{{Org Name}}', orgName)
                  .replace('{{Site Name}}', siteName);
                const contentData = content
                  .replace('{{Site Name}}', siteName)
                  .replace('{{User Name}}', userName)
                  .replace('{{Org Name}}', orgName);
                sendEmailFunction(
                  toData,
                  subject,
                  headingData,
                  contentData,
                  UserData.token,
                );

                if (UserData.role_id == '1' || UserData.role_id == '2') {
                  const userName: any = UserData.userName;
                  const orgName: any = UserData.orgName;
                  const siteName: any = UserData.siteName;
                  let role_name: any;
                  if (UserData.role_id == 1) {
                    role_name = 'Owner';
                  } else {
                    role_name = 'Admin';
                  }
                  const target_user = UserData.email;
                  const email_data: any = await fetchEmailData(
                    'Add_User_to_Site_inform_Litmus',
                  );
                  const to = email_data.data.To;
                  const subject = email_data.data.email_subject;
                  const heading = email_data.data.email_heading;
                  const content = email_data.data.email_content;
                  const headingData = heading
                    .replace('{{Target User Name}}', target_user)
                    .replace('{{Site Name}}', siteName)
                    .replace('{{Org name}}', orgName)
                    .replace('{{Role Name}}', role_name);
                  const contentData = content
                    .replace('{{Target User Name}}', target_user)
                    .replace('{{Site Name}}', siteName)
                    .replace('{{Org Name}}', orgName)
                    .replace('{{User Name}}', userName)
                    .replace('{{Role Name}}', role_name);
                  await sendEmailFunction(
                    to,
                    subject,
                    headingData,
                    contentData,
                    UserData.token,
                  );
                }
                await logActivity({
                  user_id: UserData.user_id,
                  org_id: UserData.org_id,
                  site_id: UserData.site_id,
                  target_user_id: parseInt(users[0].id),
                  target_user_role: UserData.role_id,
                  activity_type: 'add_user_site',
                });
                // Add email function here to send an invitation to the user
                return { errorCode: 0, data: 'User added successfully' };
              }
            } else {
              return { errorCode: 1, data: 'User already in sites' };
            }
          }
        } else {
          return { errorCode: 1, data: 'User is not added in organization.' };
        }
      }
    }
  } catch (error) {
    return { errorCode: 1, data: 'User not added' };
  }
}

// Function to update a user's role in the 'site_users' table
async function modifyUserOfSites(
  UserData: UserData,
): Promise<ModifyResult<SiteUser[]>> {
  // Check if required UserData properties are present
  if (
    !UserData.user_id ||
    !UserData.role_id ||
    !UserData.site_id ||
    !UserData.modifying_user_id
  ) {
    return { errorCode: 1, message: 'Missing required fields', data: null };
  }

  try {
    // Fetch the role of the modifying user
    const { data: modifyingUserRoleData, error: modifyingUserRoleError } =
      await supabase
        .from('site_users')
        .select(`role_id,user_role(name)`)
        .eq('user_id', UserData.modifying_user_id)
        .eq('site_id', UserData.site_id);

    if (modifyingUserRoleError || !modifyingUserRoleData) {
      return {
        errorCode: 1,
        message: 'Error fetching modifying user role',
        data: null,
      };
    }

    const modifyingUserRoleId = modifyingUserRoleData[0].role_id;

    // Fetch the role of the target user
    const { data: targetUserRoleData, error: targetUserRoleError } =
      await supabase
        .from('site_users')
        .select('role_id,user_role(name)')
        .eq('user_id', UserData.user_id)
        .eq('site_id', UserData.site_id);
    if (targetUserRoleError || !targetUserRoleData) {
      return {
        errorCode: 1,
        message: 'Error fetching target user role',
        data: null,
      };
    }

    const targetUserRoleId = targetUserRoleData[0].role_id;

    const oldUserRoleId = targetUserRoleId;
    // Owner can modify any role
    if (modifyingUserRoleId === 2) {
      // Admin can modify non-owner roles (Admin and Member)
      if (targetUserRoleId == 1) {
        return {
          errorCode: 2,
          message: 'Admin cannot modify an Owner role',
          data: null,
        };
      }
      if (UserData.role_id == 1) {
        return {
          errorCode: 2,
          message: 'Admin cannot assign Owner role',
          data: null,
        };
      }
    }

    // Update the role_id of the user in the 'site_users' table based on user_id and site_id
    const { data, error } = await supabase
      .from('site_users')
      .update({ role_id: UserData.role_id })
      .eq('user_id', UserData.user_id)
      .eq('site_id', UserData.site_id)
      .select();

    if (error) {
      return { errorCode: 1, message: 'Error updating user role', data: null };
    }

    return {
      errorCode: 0,
      message: 'User role updated successfully',
      data: data,
    };
  } catch (error) {
    return { errorCode: -1, message: 'Unexpected error occurred', data: null };
  }
}

// Function to remove a user from the 'site_users' table based on user ID
async function removeUserFromSites(
  target_user_id: any,
  site_id: any,
  user_id: any,
  user_role_id: any,
  role_id: any,
): Promise<Result<string>> {
  if (!target_user_id || !site_id) {
    return { errorCode: 1, data: 'Please enter proper data' };
  }
  if (user_role_id == 2) {
    if (role_id == 1) {
      return { errorCode: 1, data: 'Admin cannot delete the Owner' };
    }
  }
  try {
    const { error } = await supabase
      .from('site_users')
      .delete()
      .eq('user_id', target_user_id)
      .eq('site_id', site_id);

    if (error) {
      return { errorCode: 1, data: 'Site user not found' };
    } else {
      // Log the activity
      await logActivity({
        site_id: site_id,
        user_id: user_id, // You might want to pass the admin's user_id who is performing the removal
        target_user_id: target_user_id,
        activity_type: 'remove_user_site',
      });

      return { errorCode: 0, data: 'Site user deleted successfully' };
    }
  } catch (error) {
    return { errorCode: -1, data: 'Error while delete user' };
  }
}

export {
  addUserToSites,
  getSiteUserRole,
  modifyUserOfSites,
  removeUserFromSites,
};
