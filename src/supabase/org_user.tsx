/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { logActivity } from '@/supabase/activity';
import { sendEmailFunction } from '@/supabase/email';
import fetchEmailData from '@/supabase/email_configuration';

import { supabase } from './db';

// Define interfaces for the data structures used

interface UserData {
  email: string;
  firstname?: string;
  lastname?: string;
  user_id?: any;
  role_id?: any;
  org_id: any;
  token?: any;
  userName: any;
  orgName: any;
}
interface modifyUserData {
  email?: string;
  firstname?: string;
  lastname?: string;
  user_id?: any;
  role_id?: any;
  org_id?: any;
  token?: any;
}

interface User {
  id: any;
  email: string;
  firstname: string;
  lastname: string;
}

interface OrgUser {
  user_id: any;
  role_id: any;
}

interface Result<T> {
  errorCode: number;
  message?: string;
  data: T | null;
}

// Function to add a user to an organization based on email or name
async function addUserToOrganization(
  UserData: UserData,
): Promise<Result<string>> {
  try {
    // Test logActivity with static data

    let users: User[] | null = null;
    let selectError: any = null;

    // Check if the email is provided and not empty
    if (UserData.email && UserData.email !== '') {
      // Select the user from the 'users' table using the email
      ({ data: users, error: selectError } = await supabase
        .from('users')
        .select('*')
        .eq('email', UserData.email));

      // Check for errors during the select operation
      if (selectError) {
        return { errorCode: 1, data: 'User is not in Central V2' };
      }
    }
    // If email is not provided, check if both firstname and lastname are provided
    else if (UserData.firstname && UserData.lastname) {
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
    // If neither email nor both firstname and lastname are provided
    else {
      return { errorCode: 1, data: 'User is not in Central V2' };
    }

    // Check if no users were found
    if (!users || users.length === 0) {
      return { errorCode: 1, data: 'User is not in Central V2' };
    } else {
      // Check if the user is already part of the organization
      const { data: org_users, error } = await supabase
        .from('org_users')
        .select('*')
        .eq('user_id', users[0].id)
        .eq('org_id', UserData.org_id);

      if (error) {
        return { errorCode: 1, data: 'User is not in Central V2' };
      } else {
        // If user is not in the organization, send an invitation
        if (org_users.length === 0) {
          const { data: insertedOrgUsers, error: orgInsertError } =
            await supabase
              .from('org_users')
              .insert([
                {
                  user_id: users[0].id,
                  org_id: UserData.org_id,
                  role_id: UserData.role_id,
                },
              ])
              .select();

          if (orgInsertError) {
            return { errorCode: 1, data: 'User is not in Central V2' };
          } else {
            const emaildata: any = {
              org_id: UserData.org_id,
              user_id: UserData.user_id,
              target_user_id: users[0].id,
            };

            const userName: any = UserData.userName;
            const orgName: any = UserData.orgName;
            const email_data: any = await fetchEmailData('Add_User_To_Org');
            const to = UserData.email;
            const subject = email_data.data.email_subject;
            const heading = email_data.data.email_heading;
            const content = email_data.data.email_content;
            const toData = to.replace('{{Target User EMail}}', to);
            const headingData = heading.replace('{{Org Name}}', orgName);
            const contentData = content
              .replace('{{User Name}}', userName)
              .replace('{{Org Name}}', orgName);
            await sendEmailFunction(
              toData,
              subject,
              headingData,
              contentData,
              UserData.token,
            );
            // await fetchEmailData('Add_User_To_Org');

            // Send the invitation email
            // await sendEmailFunction(
            //   'shruti@nichetech.in', // To
            //   'Add User To Organization', // Subject
            //   'add_orgUser', // Type
            //   UserData.token, // Token (Generate or provide the actual token)
            //   emaildata, // Data
            // );
            // Log the activity before sending the invitation
            const logResult = await logActivity({
              org_id: UserData.org_id,
              user_id: UserData.user_id,
              target_user_id: users[0].id,
              target_user_role: UserData.role_id,
              activity_type: 'add_user',
            });

            // Add email function here to send an invitation to the user
            // email logic goes here
            return {
              errorCode: 0,
              data: 'User added successfully to the organization',
            };
          }
        } else {
          // If user is already in the organization
          return { errorCode: 1, data: 'User already in organization' };
        }
      }
    }
  } catch (error) {
    // Log any unexpected errors
    return { errorCode: 1, data: 'User not added ' };
  }
}

// Function to change the role of a user in an organization
async function modifyUserOfOrganization(
  UserData: modifyUserData,
): Promise<Result<OrgUser[]>> {
  // Validate inputs
  if (!UserData.user_id || !UserData.role_id || !UserData.org_id) {
    return { errorCode: 1, data: null };
  }

  try {
    // Update the role_id of the user in the 'org_users' table based on user_id
    const { data, error } = await supabase
      .from('org_users')
      .update({ role_id: UserData.role_id })
      .eq('user_id', UserData.user_id)
      .eq('org_id', UserData.org_id)
      .select();

    // Check for errors during the update operation
    if (error) {
      return { errorCode: 1, data: null };
    } else {
      return { errorCode: 0, data: data };
    }
  } catch (error) {
    // Log any unexpected errors
    return { errorCode: -1, data: null };
  }
}

// Function to remove a user from an organization based on user ID
async function removeUserFromOrganization(
  id: any,
  org_id: any,
  user_id: any,
): Promise<Result<null>> {
  // Validate the input
  if (!id || !org_id) {
    return { errorCode: 1, data: null };
  }

  try {
    // Delete the user from the 'org_users' table based on user ID
    const { error } = await supabase
      .from('org_users')
      .delete()
      .eq('user_id', id)
      .eq('org_id', org_id);

    // Check for errors during the delete operation
    if (error) {
      return { errorCode: 1, data: null };
    } else {
      const logResult = await logActivity({
        org_id: org_id,
        user_id: user_id, // You might want to pass the admin's user_id who is performing the removal
        target_user_id: id,
        activity_type: 'remove_user',
      });

      return { errorCode: 0, data: null };
    }
  } catch (error) {
    // Log any unexpected errors
    return { errorCode: -1, data: null };
  }
}

async function getOrgUserRole(
  user_id: any,
  org_id: any,
): Promise<Result<null>> {
  // Validate the input
  if (!user_id || !org_id) {
    return { errorCode: 1, data: null };
  }

  try {
    // Fetch the user details from the 'org_users' table based on user ID and org ID
    const { data: orgUser, error: orgUserError } = await supabase
      .from('org_users')
      .select('role_id')
      .eq('org_id', org_id)
      .eq('user_id', user_id)
      .single(); // Assuming a single record is returned

    // Check for errors during the fetch operation
    if (orgUserError) {
      return { errorCode: 1, data: null };
    }

    // Extract the role_id from the fetched data
    const role_id = orgUser.role_id;

    // Fetch the role details from the 'user_role' table based on role_id
    const { data: userRole, error: userRoleError } = await supabase
      .from('user_role')
      .select('*')
      .eq('id', role_id)
      .single(); // Assuming a single record is returned

    // Check for errors during the fetch operation
    if (userRoleError) {
      return { errorCode: 1, data: null };
    }

    // Log the user role details and return them
    return { errorCode: 0, data: userRole };
  } catch (error) {
    // Log any unexpected errors
    return { errorCode: -1, data: null };
  }
}

export {
  addUserToOrganization,
  getOrgUserRole,
  modifyUserOfOrganization,
  removeUserFromOrganization,
};
