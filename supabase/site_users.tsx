/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@supabase/supabase-js";
import { supabase } from "./db";

// Define the interfaces for the input data and result
interface UserData {
  org_id?: any;
  email?: string;
  firstname?: string;
  lastname?: string;
  user_id?: any;
  role_id?: any;
}

interface Result<T> {
  errorCode: number;
  data: T | null;
}

// Function to get the role of a site user
async function getSiteUserRole(user_id: any, site_id: any): Promise<Result<any>> {
  if (!user_id || !site_id) {
    console.error('Invalid input: user ID and site ID cannot be null');
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
      console.error('Error fetching user details from site:', siteUserError.message);
      return { errorCode: 1, data: null };
    }

    const role_id = siteUser.role_id;

    const { data: userRole, error: userRoleError } = await supabase
      .from('user_role')
      .select('*')
      .eq('id', role_id)
      .single();

    if (userRoleError) {
      console.error('Error fetching user role details:', userRoleError.message);
      return { errorCode: 1, data: null };
    }

    console.log('User role details fetched successfully:', userRole);
    return { errorCode: 0, data: userRole };
  } catch (error) {
    console.error('Unexpected error fetching user role:', error);
    return { errorCode: -1, data: null };
  }
}

// Function to add a user to sites based on email or name
async function addUserToSites(UserData: UserData): Promise<Result<string>> {
  if (!UserData.org_id) {
    console.error('Invalid input: org_id cannot be null or empty');
    return { errorCode: 1, data: null };
  }

  try {
    let users: User[] | null = null;
    let selectError: any;

    if (UserData.email && UserData.email !== '') {
      ({ data: users, error: selectError } = await supabase
        .from('users')
        .select('*')
        .eq('email', UserData.email));

      if (selectError) {
        console.error('Error while selecting users by email:', selectError.message);
        return { errorCode: 1, data: null };
      }
    } else if (UserData.firstname && UserData.lastname) {
      ({ data: users, error: selectError } = await supabase
        .from('users')
        .select('*')
        .eq('firstname', UserData.firstname)
        .eq('lastname', UserData.lastname));

      if (selectError) {
        console.error('Error while selecting users by name:', selectError.message);
        return { errorCode: 1, data: null };
      }
    } else {
      console.error('Please provide either an email or both firstname and lastname');
      return { errorCode: 1, data: null };
    }

    if (!users || users.length === 0) {
      console.log('No such user found');
      return { errorCode: 1, data: null };
    } else {
      const { data: org_users, error: orgSelectError } = await supabase
        .from('org_users')
        .select('*')
        .eq('user_id', users[0].id)
        .eq('org_id', UserData.org_id);

      if (orgSelectError) {
        console.error('Error while selecting org_users:', orgSelectError.message);
        return { errorCode: 1, data: null };
      } else {
        if (org_users && org_users.length > 0) {
          const { data: site_users, error: siteSelectError } = await supabase
            .from('site_users')
            .select('*')
            .eq('user_id', users[0].id);

          if (siteSelectError) {
            console.error('Error while checking site users:', siteSelectError.message);
            return { errorCode: 1, data: null };
          } else {
            if (!site_users || site_users.length === 0) {
              console.log('Send invitation email to user to join the sites');
              // Add email function here to send an invitation to the user
              return { errorCode: 0, data: 'Invitation sent' };
            } else {
              console.log('User is already in the sites');
              return { errorCode: 0, data: 'User already in sites' };
            }
          }
        } else {
          console.log('User is not in the organization, please add this user to the organization first');
          return { errorCode: 1, data: null };
        }
      }
    }
  } catch (error) {
    console.error('Unexpected error during user addition:', error);
    return { errorCode: -1, data: null };
  }
}

// Function to update a user's role in the 'site_users' table
async function modifyUserOfSites(UserData: UserData): Promise<Result<any>> {
  if (!UserData.user_id || !UserData.role_id) {
    console.error('Invalid input: user_id and role_id cannot be null');
    return { errorCode: 1, data: null };
  }

  try {
    const { data, error } = await supabase
      .from('site_users')
      .update({ role_id: UserData.role_id })
      .eq('user_id', UserData.user_id)
      .select();

    if (error) {
      console.error('Error while updating user role:', error.message);
      return { errorCode: 1, data: null };
    } else {
      console.log('User role updated successfully:', data);
      return { errorCode: 0, data: data };
    }
  } catch (error) {
    console.error('Unexpected error during role update:', error);
    return { errorCode: -1, data: null };
  }
}

// Function to remove a user from the 'site_users' table based on user ID
async function removeUserFromSites(id: any): Promise<Result<string>> {
  if (!id) {
    console.error('Invalid input: user ID cannot be null or empty');
    return { errorCode: 1, data: null };
  }

  try {
    const { error } = await supabase
      .from('site_users')
      .delete()
      .eq('user_id', id);

    if (error) {
      console.error('Error while removing user from sites:', error.message);
      return { errorCode: 1, data: null };
    } else {
      console.log('User removed successfully from sites');
      return { errorCode: 0, data: 'User removed successfully' };
    }
  } catch (error) {
    console.error('Unexpected error during user removal:', error);
    return { errorCode: -1, data: null };
  }
}

export {
  getSiteUserRole,
  addUserToSites,
  modifyUserOfSites,
  removeUserFromSites
};
