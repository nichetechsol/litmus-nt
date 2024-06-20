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

    // Check the number of organizations where the user has role_id = 1
    const { data: orgUsersData, error: orgUsersError } = await supabase
      .from('org_users')
      .select('*')
      .eq('user_id', userId);

    if (orgUsersError) {
      return { errorCode: 1, message: 'Error fetching organization user data' };
    }

    let add_orgUser = false;
    if (orgUsersData.length > 0) {
      for (const orgUser of orgUsersData) {
        if (orgUser.role_id === 1) {
          add_orgUser = true;
        }
      }
    } else {
      add_orgUser = false;
    }
    if (userData.length > 0) {
      return {
        errorCode: 0,
        auth: authData,
        user: userData,
        add_orgUser: add_orgUser,
      };
    } else {
      return { errorCode: 1, message: 'User data is not found' };
    }
  } catch (error) {
    return { errorCode: -1, message: (error as Error).message }; // Return a general error code
  }
}
export { Login };
