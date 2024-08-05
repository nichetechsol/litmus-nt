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
  user_role_id: any;
}
interface modifyUserData {
  email?: string;
  firstname?: string;
  lastname?: string;
  user_id?: any;
  role_id?: any;
  org_id?: any;
  token?: any;
  modifying_user_id: any;
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
  data: any;
}
async function searchUsers(search: any): Promise<Result<User[]>> {
  try {
    // Construct the base query for searching users
    let userQuery = supabase.from('users').select('*'); // Limit to 10 results for suggestions

    // Add search criteria if provided
    if (search != '') {
      const searchLower = `%${search.toLowerCase()}%`;
      userQuery = userQuery.or(
        `firstname.ilike.${searchLower},lastname.ilike.${searchLower},email.ilike.${searchLower}`,
      );
      const { data: users, error: userError } = await userQuery;

      // Handle potential errors from fetching user details
      if (userError) {
        return {
          errorCode: 1,
          message: 'Failed to retrieve users.',
          data: null,
        };
      }
      // Handle case where no users are found
      if (!users || users.length === 0) {
        return {
          errorCode: 1,
          message: 'User not found',
          data: null,
        };
      }
      return {
        errorCode: 0,
        message: 'Success',
        data: users,
      };
    }
    return {
      errorCode: 1,
      message: 'User not found',
      data: null,
    };
    // Execute the query
  } catch (err) {
    // Handle any other errors (e.g., network issues)
    return {
      errorCode: 1,
      message: 'Unexpected error during fetching users',
      data: null,
    };
  }
}
// Function to add a user to an organization based on email or name
async function addUserToOrganization(
  UserData: UserData,
): Promise<Result<string>> {
  try {
    // Test logActivity with static data

    let users: User[] | null = null;
    let selectError: any = null;
    if (UserData.user_role_id == 2) {
      if (UserData.role_id == 1) {
        return { errorCode: -1, data: 'Admin cannot add the Owner' };
      }
    }
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
            sendEmailFunction(
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
              activity_type: 'add_user_org',
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
          return { errorCode: -1, data: 'User already in organization' };
        }
      }
    }
  } catch (error) {
    // Log any unexpected errors
    return { errorCode: -1, data: 'User not added ' };
  }
}

async function modifyUserOfOrganization(
  UserData: modifyUserData,
): Promise<Result<any>> {
  // Validate inputs
  if (
    !UserData.user_id ||
    !UserData.role_id ||
    !UserData.org_id ||
    !UserData.modifying_user_id
  ) {
    return { errorCode: 1, message: 'Invalid input data', data: null };
  }

  try {
    // Fetch the role of the modifying user
    const { data: modifyingUserRoleData, error: modifyingUserRoleError } =
      await supabase
        .from('org_users')
        .select('role_id')
        .eq('user_id', UserData.modifying_user_id)
        .eq('org_id', UserData.org_id);

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
        .from('org_users')
        .select('role_id')
        .eq('user_id', UserData.user_id)
        .eq('org_id', UserData.org_id);

    if (targetUserRoleError || !targetUserRoleData) {
      return {
        errorCode: 1,
        message: 'Error fetching target user role',
        data: null,
      };
    }

    const targetUserRoleId = targetUserRoleData[0].role_id;

    if (modifyingUserRoleId === 2) {
      // Admin can modify non-owner roles (Admin and Member)
      if (UserData.role_id == 1) {
        return {
          errorCode: 1,
          message: 'Admin cannot assign Owner role',
          data: null,
        };
      }
      if (targetUserRoleId == 1) {
        return {
          errorCode: 1,
          message: 'Admin cannot modify an Owner role',
          data: null,
        };
      }
    }

    // Update the role_id of the user in the 'org_users' table based on user_id
    const { data, error } = await supabase
      .from('org_users')
      .update({ role_id: UserData.role_id })
      .eq('user_id', UserData.user_id)
      .eq('org_id', UserData.org_id)
      .select();

    if (error) {
      return { errorCode: 1, message: 'Error updating user role', data: null };
    } else {
      return {
        errorCode: 0,
        message: 'User role updated successfully',
        data: data,
      };
    }
  } catch (error) {
    // Log any unexpected errors
    return { errorCode: -1, message: 'Unexpected error occurred', data: null };
  }
}

// Function to remove a user from an organization based on user ID
async function removeUserFromOrganization(
  id: any,
  org_id: any,
  user_id: any,
  user_role_id: any,
  role_id: any,
): Promise<Result<null>> {
  // Validate the input
  if (!id || !org_id) {
    return { errorCode: 1, data: 'Please enter proper data' };
  }
  if (user_role_id == 2) {
    if (role_id == 1) {
      return { errorCode: 1, data: 'Admin cannot delete the Owner' };
    }
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
      return { errorCode: 1, data: 'User not found' };
    } else {
      const logResult = await logActivity({
        org_id: org_id,
        user_id: user_id, // You might want to pass the admin's user_id who is performing the removal
        target_user_id: id,
        activity_type: 'remove_user_org',
      });

      return { errorCode: 0, data: 'User deleted succesfully' };
    }
  } catch (error) {
    // Log any unexpected errors
    return { errorCode: -1, data: 'User not found' };
  }
}
async function inviteSendToUser(data: any) {
  try {
    // Fetch the email template data for 'Invite_Not_existing_User'
    const emailResult = await fetchEmailData('Invite_Not_existing_User');

    // Ensure emailResult and emailResult.data are valid
    if (!emailResult || !emailResult.data) {
      return { message: 'Failed to fetch email template data.', errorCode: 1 };
    }

    // Extract data from the fetched email template
    const emailData = emailResult.data;
    const toTemplate: string = emailData.To;
    const subject: string = emailData.email_subject;
    const headingTemplate: string = emailData.email_heading;
    const contentTemplate: string = emailData.email_content;

    // Define the sign-up link
    const signUpLink =
      '<a href="https://central-v2-external-naehe0iv7-litmusio.vercel.app/">Sign Up Here</a>';

    // Replace placeholders with actual values
    const toData = toTemplate.replace(
      '{{Target User EMail}}',
      data.targetUserEmail,
    );
    const headingData = headingTemplate
      .replace('{{User Name}}', data.userName)
      .replace('{{Org Name}}', data.orgName);
    const contentData = contentTemplate
      .replace('{{User Name}}', data.userName)
      .replace('{{Org Name}}', data.orgName)
      .replace('<to be added when available>', signUpLink);

    // Send the email using the provided sendEmailFunction
    const response = await sendEmailFunction(
      toData,
      subject,
      headingData,
      contentData,
      data.token,
    );

    // Return success message with errorCode 0
    if (response) {
      return { message: 'Invitation email sent successfully.', errorCode: 0 };
    } else {
      return { message: 'Failed to send invitation email.', errorCode: 2 };
    }
  } catch (error) {
    // Return error message and an errorCode
    return { message: 'Error sending invitation email.', errorCode: 2 };
  }
}

async function getOrgUserRole(
  user_id: any,
  org_id: any,
): Promise<Result<null>> {
  // Validate the input
  if (!user_id || !org_id) {
    return { errorCode: 1, data: null, message: 'Please provide valid inputs' };
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
      return {
        errorCode: 1,
        data: null,
        message: 'Failed to fetch organization user details.',
      };
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
      return {
        errorCode: 1,
        data: null,
        message: 'Failed to fetch user role details.',
      };
    }

    // Log the user role details and return them
    return { errorCode: 0, data: userRole };
  } catch (error) {
    // Log any unexpected errors
    return {
      errorCode: -1,
      data: null,
      message: 'An unexpected error occurred.',
    };
  }
}

export {
  addUserToOrganization,
  getOrgUserRole,
  inviteSendToUser,
  modifyUserOfOrganization,
  removeUserFromOrganization,
  searchUsers,
};
