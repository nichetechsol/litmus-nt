/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@supabase/supabase-js';

import { supabase } from './db';

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
        return { errorCode: 1, data: null };
      }
    } else if (UserData.firstname && UserData.lastname) {
      ({ data: users, error: selectError } = await supabase
        .from('users')
        .select('*')
        .eq('firstname', UserData.firstname)
        .eq('lastname', UserData.lastname));

      if (selectError) {
        return { errorCode: 1, data: null };
      }
    } else {
      return { errorCode: 1, data: null };
    }

    if (!users || users.length === 0) {
      return { errorCode: 1, data: null };
    } else {
      const { data: org_users, error: orgSelectError } = await supabase
        .from('org_users')
        .select('*')
        .eq('user_id', users[0].id)
        .eq('org_id', UserData.org_id);

      if (orgSelectError) {
        return { errorCode: 1, data: null };
      } else {
        if (org_users && org_users.length > 0) {
          const { data: site_users, error: siteSelectError } = await supabase
            .from('site_users')
            .select('*')
            .eq('user_id', users[0].id);

          if (siteSelectError) {
            return { errorCode: 1, data: null };
          } else {
            if (!site_users || site_users.length === 0) {
              // Add email function here to send an invitation to the user
              return { errorCode: 0, data: 'Invitation sent' };
            } else {
              return { errorCode: 0, data: 'User already in sites' };
            }
          }
        } else {
          return { errorCode: 1, data: null };
        }
      }
    }
  } catch (error) {
    return { errorCode: -1, data: null };
  }
}

// Function to update a user's role in the 'site_users' table
async function modifyUserOfSites(UserData: UserData): Promise<Result<any>> {
  if (!UserData.user_id || !UserData.role_id) {
    return { errorCode: 1, data: null };
  }

  try {
    const { data, error } = await supabase
      .from('site_users')
      .update({ role_id: UserData.role_id })
      .eq('user_id', UserData.user_id)
      .select();

    if (error) {
      return { errorCode: 1, data: null };
    } else {
      return { errorCode: 0, data: data };
    }
  } catch (error) {
    return { errorCode: -1, data: null };
  }
}

// Function to remove a user from the 'site_users' table based on user ID
async function removeUserFromSites(
  user_id: any,
  site_id: any,
): Promise<Result<string>> {
  if (!user_id || site_id) {
    return { errorCode: 1, data: null };
  }

  try {
    const { error } = await supabase
      .from('site_users')
      .delete()
      .eq('user_id', user_id)
      .eq('site_id', site_id);

    if (error) {
      return { errorCode: 1, data: null };
    } else {
      return { errorCode: 0, data: 'User sites removed successfully' };
    }
  } catch (error) {
    return { errorCode: -1, data: null };
  }
}

export {
  addUserToSites,
  getSiteUserRole,
  modifyUserOfSites,
  removeUserFromSites,
};
