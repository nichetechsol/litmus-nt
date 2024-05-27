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
}

// Function for logging in
async function Login(email: string, password: string): Promise<LoginResult> {
  try {
    // Fetch organization details
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (authError) {
      if (authError.message === "Invalid login credentials") {
        console.error("Invalid login credentials");
        return { errorCode: 1, message: authError.message };
      } else {
        console.error("Error signing in:", authError.message);
        return { errorCode: 1, message: authError.message };
      }
    }

    if (!authData || !authData.user) {
      console.error("Auth data or user is missing");
      return { errorCode: 1, message: "Invalid data" };
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select("*")
      .eq('auth_id', authData.user.id);

    if (userError) {
      console.error("Error fetching user details:", userError.message);
      return { errorCode: 1, message: userError.message };
    }

    console.log("User signed in successfully:", authData.user);
    return { errorCode: 0, auth: authData, user: userData };
  } catch (error) {
    console.error("Error fetching organization and user details:", (error as Error).message);
    return { errorCode: -1, message: (error as Error).message }; // Return a general error code
  }
}

export { Login };
