/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from './db';

// Define the types for the function parameters and return values
interface AuthData {
  user: {
    id: string;
  };
}

interface UserData {
  id: string;
  auth_id: string;
  [key: string]: any;
}

interface LoginResult {
  errorCode: number;
  message?: string;
  auth?: AuthData;
  user?: UserData[];
  add_orgUser?: any;
  org_exists?: any;
}

// // Function for logging in
// async function Login(email: string, password: string): Promise<LoginResult> {
//   try {
//     // Fetch organization details
//     const { data: authData, error: authError } =
//       await supabase.auth.signInWithPassword({
//         email: email,
//         password: password,
//       });

//     if (authError) {
//       if (authError.message === 'Invalid login credentials') {
//         return { errorCode: 1, message: authError.message };
//       } else {
//         return { errorCode: 1, message: authError.message };
//       }
//     }

//     if (!authData || !authData.user) {
//       return { errorCode: 1, message: 'Invalid data' };
//     }

//     const { data: userData, error: userError } = await supabase
//       .from('users')
//       .select('*')
//       .eq('auth_id', authData.user.id);

//     if (userError) {
//       return { errorCode: 1, message: userError.message };
//     }

//     return { errorCode: 0, auth: authData, user: userData };
//   } catch (error) {
//     return { errorCode: -1, message: (error as Error).message }; // Return a general error code
//   }
// }

// export { Login };
// Function for logging in
async function Login(email: string, password: string): Promise<LoginResult> {
  try {
    // Fetch organization details
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

    if (authError) {
      if (authError.message === 'Invalid login credentialss') {
        return { errorCode: 1, message: authError.message };
      } else {
        return { errorCode: 1, message: authError.message };
      }
    }

    if (!authData || !authData.user) {
      return { errorCode: 1, message: 'Invalid data' };
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', authData.user.id);

    if (userError) {
      return { errorCode: 1, message: 'Invalid data' };
    }
    const userId = userData[0].id;
    const userEmail = userData[0].email;
    await handleDomainUserAssignment(userId, userEmail);
    // Check the number of organizations where the user has role_id = 1
    const { data: orgUsersData, error: orgUsersError } = await supabase
      .from('org_users')
      .select('*')
      .eq('user_id', userId);

    if (orgUsersError) {
      return { errorCode: 1, message: 'Error fetching organization user data' };
    }

    let add_orgUser = false;
    let org_exists = false;
    if (orgUsersData.length > 0) {
      org_exists = true;
      for (const orgUser of orgUsersData) {
        if (orgUser.role_id === 1) {
          add_orgUser = true;
        }
      }
    } else {
      add_orgUser = true;
      org_exists = false;
    }
    if (userData.length > 0) {
      return {
        errorCode: 0,
        auth: authData,
        user: userData,
        org_exists: org_exists,
        add_orgUser: add_orgUser,
      };
    } else {
      return { errorCode: 1, message: 'User data is not found' };
    }
  } catch (error) {
    return { errorCode: -1, message: (error as Error).message }; // Return a general error code
  }
}
async function handleDomainUserAssignment(
  userId: string,
  email: string,
): Promise<void> {
  // Extract domain from email
  const domain = email.split('@')[1];

  // Get domainId
  const { data: domainData, error: domainError } = await supabase
    .from('domains')
    .select('id')
    .eq('name', domain)
    .limit(1)
    .single();

  if (domainError || !domainData) {
    return;
  }

  const domainId = domainData.id;

  // Get organization IDs associated with the domain
  const { data: orgDomainsData, error: orgDomainsError } = await supabase
    .from('org_domains')
    .select('org_id')
    .eq('domain_id', domainId);

  if (orgDomainsError || !orgDomainsData || orgDomainsData.length === 0) {
    return;
  }

  // Insert into org_users if necessary
  for (const orgDomain of orgDomainsData) {
    const orgId = orgDomain.org_id;

    if (!orgId) {
      return;
    } else {
      const { data: orgUserData, error: checkOrgUserError } = await supabase
        .from('org_users')
        .select('*')
        .eq('user_id', userId)
        .eq('org_id', orgId);

      if (checkOrgUserError) {
        return;
      }

      if (!orgUserData || orgUserData.length === 0) {
        const { error: insertOrgUserError } = await supabase
          .from('org_users')
          .insert([{ user_id: userId, role_id: 3, org_id: orgId }]);

        if (insertOrgUserError) {
          return;
        }
      }
    }
  }
}

export { Login };
