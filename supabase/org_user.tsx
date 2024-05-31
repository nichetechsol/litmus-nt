/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "./db";

// Define interfaces for the data structures used

interface UserData {
  email?: string;
  firstname?: string;
  lastname?: string;
  user_id?: number;
  role_id?: number;
}

interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

interface OrgUser {
  user_id: number;
  role_id: number;
}



interface Result<T> {
  errorCode: number;
  message?: string;
  data: T | null;
}

// Function to add a user to an organization based on email or name
async function addUserToOrganization(UserData: UserData): Promise<Result<string>> {
  try {
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
        console.error('Error while selecting users by email:', selectError.message);
        return { errorCode: 1, data: null };
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
        console.error('Error while selecting users by name:', selectError.message);
        return { errorCode: 1, data: null };
      }
    } 
    // If neither email nor both firstname and lastname are provided
    else {
      console.error('Please provide either an email or both firstname and lastname');
      return { errorCode: 1, data: null };
    }

    // Check if no users were found
    if (!users || users.length === 0) {
      console.log('No such user found');
      return { errorCode: 1, data: null };
    } else {
      // Check if the user is already part of the organization
      const { data: org_users, error } = await supabase
        .from('org_users')
        .select('*')
        .eq('user_id', users[0].id);

      if (error) {
        console.error('Error while checking organization users:', error.message);
        return { errorCode: 1, data: null };
      } else {
        // If user is not in the organization, send an invitation
        if (!org_users || org_users.length === 0) {
          // Add email function here to send an invitation to the user
          // email logic goes here
          console.log('Send invitation email to user to join the organization');
          return { errorCode: 0, data: 'Invitation sent' };
        } else {
          // If user is already in the organization
          console.log('User is already in the organization');
          return { errorCode: 0, data: 'User already in organization' };
        }
      }
    }
  } catch (error) {
    // Log any unexpected errors
    console.error('Unexpected error during user selection:', error);
    return { errorCode: -1, data: null };
  }
}

// Function to change the role of a user in an organization
async function modifyUserOfOrganization(UserData: UserData): Promise<Result<OrgUser[]>> {
  // Validate inputs
  if (!UserData.user_id || !UserData.role_id) {
    console.error('Invalid input: user_id and role_id cannot be null');
    return { errorCode: 1, data: null };
  }

  try {
    // Update the role_id of the user in the 'org_users' table based on user_id
    const { data, error } = await supabase
      .from('org_users')
      .update({ role_id: UserData.role_id })
      .eq('user_id', UserData.user_id)
      .select();

    // Check for errors during the update operation
    if (error) {
      console.error('Error while updating user role:', error.message);
      return { errorCode: 1, data: null };
    } else {
      console.log('User role updated successfully:', data);
      return { errorCode: 0, data: data };
    }
  } catch (error) {
    // Log any unexpected errors
    console.error('Unexpected error during role update:', error);
    return { errorCode: -1, data: null };
  }
}

// Function to remove a user from an organization based on user ID
async function removeUserFromOrganization(id: number): Promise<Result<null>> {
  // Validate the input
  if (!id) {
    console.error('Invalid input: user ID cannot be null');
    return { errorCode: 1, data: null };
  }

  try {
    // Delete the user from the 'org_users' table based on user ID
    const { error } = await supabase
      .from('org_users')
      .delete()
      .eq('user_id', id);

    // Check for errors during the delete operation
    if (error) {
      console.error('Error while removing user from organization:', error.message);
      return { errorCode: 1, data: null };
    } else {
      console.log('User removed from organization successfully');
      return { errorCode: 0, data: null };
    }
  } catch (error) {
    // Log any unexpected errors
    console.error('Unexpected error during removal of user:', error);
    return { errorCode: -1, data: null };
  }
}

async function getOrgUserRole(user_id: number, org_id: number): Promise<Result<null>> {
  // Validate the input
  if (!user_id || !org_id) {
    console.error('Invalid input: user ID and org ID cannot be null');
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
      console.error('Error fetching user details from organization:', orgUserError.message);
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
      console.error('Error fetching user role details:', userRoleError.message);
      return { errorCode: 1, data: null };
    }

    // Log the user role details and return them
    console.log('User role details fetched successfully:', userRole);
    return { errorCode: 0, data: userRole };

  } catch (error) {
    // Log any unexpected errors
    console.error('Unexpected error fetching user role:', error);
    return { errorCode: -1, data: null };
  }
}

export { 
  addUserToOrganization,
  modifyUserOfOrganization,
  removeUserFromOrganization,
  getOrgUserRole
};
