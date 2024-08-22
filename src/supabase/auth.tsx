/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  automaticallyCreateOrganization,
  automaticeCreateSite,
} from '@/supabase/automatic';
import {
  automaticallyCreateOrg,
  checkBusinessDomain,
} from '@/supabase/org_details';
import { automaticallyCreateSite } from '@/supabase/site_details_crud';

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
  let domain = email.split('@')[1];
  const result = await checkBusinessDomain(domain);

  const domainExists = result.domain;
  if (domainExists === true) {
    domain = email;
  } else {
    domain = email.split('@')[1];
  }

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
    // Fetch org_users and general_settings data in parallel
    const [orgUsersResponse, settingsResponse] = await Promise.all([
      supabase.from('org_users').select('*').eq('user_id', userId),
      supabase
        .from('general_settings')
        .select('*')
        .eq('setting_name', 'license_plan_allowed_to_create_organization'),
    ]);

    const { data: orgUsersData, error: orgUsersError } = orgUsersResponse;
    const { data: settingsData, error: settingsError } = settingsResponse;

    if (orgUsersError || settingsError) {
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

      // Get all org IDs where user has role_id === 1
      const orgIds = orgUsersData
        .filter((orgUser) => orgUser.role_id === 1)
        .map((orgUser) => orgUser.org_id);

      if (orgIds.length > 0) {
        // Fetch entitlements for all these org IDs in a single query
        const { data: entitlementsData, error: entitlementsError } =
          await supabase
            .from('entitlements_package')
            .select('*,entitlement_value_id(value_text)')
            .in('org_id', orgIds)
            .eq('entitlement_name_id', 14);

        if (entitlementsError) {
          return {
            errorCode: 1,
            org_exists: false,
            add_orgUser: false,
          };
        }

        // Check if any entitlement matches the allowed license plans
        const allowedLicensePlans: any[] = settingsData?.[0]?.value_text || [];
        for (const entitlement of entitlementsData) {
          const entitlement_value_text =
            entitlement.entitlement_value_id?.value_text;
          if (allowedLicensePlans.includes(entitlement_value_text)) {
            add_orgUser = true;
            break; // Exit the loop early if the condition is met
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
async function autoOrgAndSiteGenerate(raw_user_meta_data: any): Promise<any> {
  try {
    // Step 1: Create the Organization
    const orgResult = await automaticallyCreateOrg(raw_user_meta_data);

    if (orgResult.errorCode !== 0) {
      return { errorCode: 1, message: orgResult.message, data: null };
    }

    const orgId = orgResult.data?.orgId;
    if (!orgId) {
      return {
        errorCode: 1,
        message: 'Failed to retrieve organization ID',
        data: null,
      };
    }

    // Step 2: Create the Site using the retrieved orgId
    const siteResult = await automaticallyCreateSite(raw_user_meta_data, orgId);

    if (siteResult.errorCode !== 0) {
      return { errorCode: 1, message: siteResult.message, data: null };
    }

    return {
      errorCode: 0,
      message: 'Organization and site created successfully.',
      data: {
        orgId: orgId,
        siteId: siteResult.data?.siteId,
        siteName: siteResult.data?.site_name,
      },
    };
  } catch (error) {
    return {
      errorCode: 1,
      message: 'Error creating organization and site',
      data: null,
    };
  }
}
export type AuthProvider = 'azure';
async function AsureAuth(provider: AuthProvider): Promise<void> {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        scopes: 'email,profile,openid',
        queryParams: {
          prompt: 'login',
          policy: 'B2X_1_signup_folow',
        },
      },
    });
  } catch (error) {
    const data = true;
  }
}
async function GetUser() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user && session) {
      const variabletaken = user.user_metadata.custom_claims;
      const auth_id = user.id;
      const result = await addUser(user, variabletaken, auth_id, session);
      return result;
    }
    if (error) {
      throw error; // Propagate the error to the catch block
    }

    return session;
  } catch (error) {
    return null; // Return null or handle the error appropriately
  }
}
// async function addUser(
//   auth_data: any,
//   user_data: any,
//   auth_id: any,
// ): Promise<any> {
//   try {
//     if (user_data != null) {
//       const organizations_name = user_data['Organization Name'];
//       const type = user_data['I am a Litmus'];
//       const first_name = user_data['First Name'];
//       const last_name = user_data['First Name'];
//       const email = user_data['email'];

//       // Check if the email already exists
//       const { data: existingUser, error: existingUserError } = await supabase
//         .from('users')
//         .select('id')
//         .eq('email', email)
//         .single();
//       let userId: any;
//       let userData: any;
//       if (existingUser) {
//         userId = existingUser.id;
//         userData = existingUser;
//         // Update the user's first name and last name if they exist
//         const { data: updatedUser, error: updateError } = await supabase
//           .from('users')
//           .update({
//             firstname: first_name,
//             lastname: last_name,
//           })
//           .eq('id', userId)
//           .select();

//         if (updateError) {
//           throw updateError;
//         }

//         userData = updatedUser;
//       } else {
//         // Insert the new user if email doesn't exist
//         const { data: user, error: insertError } = await supabase
//           .from('users')
//           .insert([
//             {
//               email: email,
//               firstname: first_name,
//               lastname: last_name,
//               auth_id: auth_id,
//             },
//           ])
//           .select();

//         if (insertError) {
//           throw insertError;
//         }
//         userData = user;
//         userId = user[0].id;
//       }

//       if (existingUserError && existingUserError.code !== 'PGRST120') {
//         // Handle other potential errors from the query
//         throw existingUserError;
//       }

//       await autoOrgAndSiteGenerate(user_data);
//       const userEmail = email;
//       await handleDomainUserAssignment(userId, userEmail);
//       // Check the number of organizations where the user has role_id = 1
//       const { data: orgUsersData, error: orgUsersError } = await supabase
//         .from('org_users')
//         .select('*')
//         .eq('user_id', userId);

//       if (orgUsersError) {
//         return {
//           errorCode: 1,
//           message: 'Error fetching organization user data',
//         };
//       }

//       let add_orgUser = false;
//       let org_exists = false;
//       if (orgUsersData.length > 0) {
//         org_exists = true;
//         for (const orgUser of orgUsersData) {
//           if (orgUser.role_id === 1) {
//             add_orgUser = true;
//           }
//         }
//       } else {
//         add_orgUser = true;
//         org_exists = false;
//       }
//       if (userData.length > 0) {
//         return {
//           errorCode: 0,
//           auth: auth_data,
//           user: userData,
//           org_exists: org_exists,
//           add_orgUser: add_orgUser,
//         };
//       } else {
//         return { errorCode: 1, message: 'User data is not found' };
//       }
//     }
//   } catch (error) {
//     return {
//       errorCode: 2,
//       message: 'An error occurred while adding the user',
//     };
//   }
// }
async function addUser(
  auth_data: any,
  user_data: any,
  auth_id: any,
  session: any,
): Promise<any> {
  try {
    if (user_data != null) {
      const organization_name = user_data['Organization Name'];
      const siteName = user_data['Site Name'];
      const type = user_data['I am a Litmus'];
      const first_name = user_data['First Name'];
      const last_name = user_data['Last Name'];
      const email = user_data['email'];
      const address = user_data['Street Address'];
      const cityName = user_data['City'];
      const pin_code = user_data['Postal Code'];
      const stateName = user_data['State/Province'];

      // Check if the email already exists
      const { data: existingUser, error: existingusererror } = await supabase
        .from('users')
        .select('id')
        .eq('email', email);
      let userId: any = null;
      let userData: any;
      if (existingUser && existingUser.length > 0) {
        userId = existingUser[0].id;
        userData = existingUser;
        // Update the user's first name and last name if they exist
        const updatedUser = await supabase
          .from('users')
          .update({
            firstname: first_name,
            lastname: last_name,
          })
          .eq('id', userId)
          .select();

        userData = updatedUser;
      } else {
        // Insert the new user if email doesn't exist
        const user: any = await supabase
          .from('users')
          .insert([
            {
              email: email,
              firstname: first_name,
              lastname: last_name,
              auth_id: auth_id,
            },
          ])
          .select();

        userData = user;
        userId = user[0].id;
      }
      if (userId != null) {
        await handleDomainUserAssignment(userId, email);
        // Check the number of organizations where the user has role_id = 1
        const { data: orgUsersData, error: orgUsersError } = await supabase
          .from('org_users')
          .select('*')
          .eq('user_id', userId);

        if (orgUsersError) {
          return {
            errorCode: 1,
            message: 'Error fetching organization user data',
          };
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
          if (userData.data.length > 0) {
            return {
              errorCode: 0,
              auth: auth_data,
              user: userData,
              org_exists: org_exists,
              add_orgUser: add_orgUser,
            };
          } else {
            return { errorCode: 1, message: 'User data is not found' };
          }
        } else {
          const token = session.access_token;
          const result = await automaticallyCreateOrganization(
            organization_name,
            type,
            userId,
            email,
            token,
          );

          const orgId = result.orgId;
          if (orgId != null) {
            const result2 = await automaticeCreateSite(
              orgId,
              siteName,
              stateName,
              address,
              pin_code,
              cityName,
              email,
              userId,
              token,
              organization_name,
            );
            const siteId = result2.siteId;
            if (siteId != null) {
              await handleDomainUserAssignment(userId, email);
              // Check the number of organizations where the user has role_id = 1
              const { data: orgUsersData, error: orgUsersError } =
                await supabase
                  .from('org_users')
                  .select('*')
                  .eq('user_id', userId);

              if (orgUsersError) {
                return {
                  errorCode: 1,
                  message: 'Error fetching organization user data',
                };
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
              if (userData.data.length > 0) {
                return {
                  errorCode: 0,
                  auth: auth_data,
                  user: userData,
                  org_exists: org_exists,
                  add_orgUser: add_orgUser,
                };
              } else {
                return { errorCode: 1, message: 'User data is not found' };
              }
            } else {
              return { errorCode: 1, message: 'User data is not found' };
            }
          } else {
            return { errorCode: 1, message: 'User data is not found' };
          }
        }
      }
    }
  } catch (error) {
    return {
      errorCode: 2,
      message: 'User data is not found',
    };
  }
}
export {
  addUser,
  AsureAuth,
  autoOrgAndSiteGenerate,
  checkLicensePlan,
  GetUser,
  Login,
};
