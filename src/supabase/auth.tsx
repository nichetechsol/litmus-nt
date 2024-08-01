/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from './db';

// Define the types for the function parameters and return values
interface AuthData {
  user: {
    id: string;
  };
}
interface CheckLicensePlanResult {
  errorCode: number;
  org_exists?: any;
  add_orgUser?: any;
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
  const domain = email.split('@')[1];

  // Get domain ID and associated organizations in one query
  const { data: domainOrgData, error: domainOrgError } = await supabase
    .from('domains')
    .select('id, org_domains(org_id)')
    .eq('name', domain)
    .single();

  if (domainOrgError || !domainOrgData) {
    return;
  }

  const domainId = domainOrgData.id;
  const orgDomains = domainOrgData.org_domains || [];

  // Check existing org_users in one query
  const existingOrgUserCheck = await supabase
    .from('org_users')
    .select('org_id')
    .eq('user_id', userId)
    .in(
      'org_id',
      orgDomains.map((org) => org.org_id),
    );

  if (existingOrgUserCheck.error) {
    return;
  }

  const existingOrgIds = new Set(
    existingOrgUserCheck.data.map((org) => org.org_id),
  );
  const newOrgUsers = orgDomains
    .map((org) => org.org_id)
    .filter((orgId) => !existingOrgIds.has(orgId))
    .map((orgId) => ({ user_id: userId, role_id: 3, org_id: orgId }));

  if (newOrgUsers.length > 0) {
    const { error: insertOrgUserError } = await supabase
      .from('org_users')
      .insert(newOrgUsers);

    if (insertOrgUserError) {
      return;
    }
  }
}
async function checkLicensePlan(userId: any): Promise<CheckLicensePlanResult> {
  try {
    const { data: orgUsersData, error: orgUsersError } = await supabase
      .from('org_users')
      .select('*')
      .eq('user_id', userId);
    const { data: settingsData, error: settingsError } = await supabase
      .from('general_settings')
      .select('*')
      .eq('setting_name', 'license_plan_allowed_to_create_organization');
    if (orgUsersError) {
      return {
        errorCode: 1,
        org_exists: false,
        add_orgUser: false,
      };
    }

    let add_orgUser = false;
    let org_exists = false;
    if (orgUsersData.length > 0) {
      org_exists = true;
      for (const orgUser of orgUsersData) {
        if (orgUser.role_id === 1) {
          // add_orgUser = true;
          // Fetch data from `entitlements_package` table based on `org_id`
          const { data: entitlementsData, error: entitlementsError } =
            await supabase
              .from('entitlements_package')
              .select(`*,entitlement_value_id(value_text)`)
              .eq('org_id', orgUser.org_id)
              .eq('entitlement_name_id', 14);

          // if (entitlementsError) {
          //   return {
          //     errorCode: 1,
          //     org_exists: false,
          //     add_orgUser: false,
          //   };
          // }

          // Check if any entitlement value exists
          if (entitlementsData) {
            let entitlement_value_text;

            if (entitlementsData.length > 0) {
              entitlement_value_text =
                entitlementsData[0].entitlement_value_id.value_text;
            }

            if (settingsData) {
              const allowedLicensePlans: any[] = settingsData[0].value_text;
              const add_orgUser_true = allowedLicensePlans.includes(
                entitlement_value_text,
              );
              if (add_orgUser_true === true) {
                add_orgUser = true;
              }
            }
          }
        }
      }
    } else {
      add_orgUser = true;
      org_exists = false;
    }
    return {
      errorCode: 0,
      org_exists: org_exists,
      add_orgUser: add_orgUser,
    };
  } catch (error) {
    return {
      errorCode: 1,
      org_exists: false,
      add_orgUser: false,
    };
  }
}

export { checkLicensePlan, Login };
