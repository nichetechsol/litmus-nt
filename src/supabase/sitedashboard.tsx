/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from './db';

interface SiteDetail {
  org_id: any;
  id: string;
  // Add other properties relevant to sites_detail here
}
interface SiteDetailResponse {
  errorCode: number;
  message: string;
  data: SiteDetail[] | null;
}

interface FunctionReturn {
  errorCode: number;
  message: string;
  data: any | null;
}
interface FunctionReturnUser {
  errorCode: number;
  message: string;
  data: any | null;
  totalCount: any;
}
interface FunctionReturnLicence {
  errorCode: number;
  message: string;
  data: any | null;
}

async function allSitesOfUsers(
  site_id: any,
  search: any,
  start: any,
  end: any,
): Promise<FunctionReturnUser> {
  try {
    // Fetch site users
    const { data: siteUserData, error: siteUserError } = await supabase
      .from('site_users')
      .select('*')
      .eq('site_id', site_id);

    // Handle potential errors from fetching site users
    if (siteUserError) {
      return {
        errorCode: 1,
        message: 'Error while fetching site users',
        data: null,
        totalCount: null,
      };
    }

    // Extract user ids and role ids
    const userIds = siteUserData.map((siteUser: any) => siteUser.user_id);
    const roleIds = siteUserData.map((siteUser: any) => siteUser.role_id);

    // Fetch user details based on user ids
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, firstname, lastname, email')
      .in('id', userIds);

    // Handle potential errors from fetching user details
    if (userError) {
      return {
        errorCode: 1,
        message: 'Error while fetching user details',
        data: null,
        totalCount: null,
      };
    }

    // Filter user details based on search parameter
    let totalCount: any;
    let filteredUserData = userData;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUserData = userData.filter(
        (user: any) =>
          user.firstname && user.firstname.toLowerCase().includes(searchLower),
      );
      totalCount = filteredUserData.length;
    } else {
      totalCount = userData.length;
    }

    // Apply range to filtered users
    const paginatedUserData = filteredUserData.slice(start, end + 1);

    // Extract filtered user ids for merging with site user data
    const filteredUserIds = paginatedUserData.map((user: any) => user.id);

    // Filter site user data based on filtered user ids
    const filteredSiteUserData = siteUserData.filter((siteUser: any) =>
      filteredUserIds.includes(siteUser.user_id),
    );

    // Extract role ids from filtered site user data
    const filteredRoleIds = filteredSiteUserData.map(
      (siteUser: any) => siteUser.role_id,
    );

    // Fetch role details based on filtered role ids
    const { data: roleData, error: roleError } = await supabase
      .from('user_role')
      .select('id, name')
      .in('id', filteredRoleIds);

    // Handle potential errors from fetching role details
    if (roleError) {
      return {
        errorCode: 1,
        message: 'Error while fetching role details',
        data: null,
        totalCount: null,
      };
    }

    // Merge user details with filtered site users data and role details
    const mergedData = filteredSiteUserData.map((siteUser: any) => {
      const userDetail = paginatedUserData.find(
        (user: any) => user.id === siteUser.user_id,
      );
      const roleDetail = roleData.find(
        (role: any) => role.id === siteUser.role_id,
      );
      return {
        ...siteUser,
        role_name: roleDetail ? roleDetail.name : null,
        firstname: userDetail ? userDetail.firstname : null,
        lastname: userDetail ? userDetail.lastname : null,
        email: userDetail ? userDetail.email : null,
      };
    });

    return {
      errorCode: 0,
      message: 'Success',
      data: mergedData,
      totalCount: totalCount,
    };
  } catch (err) {
    // Handle any other errors (e.g., network issues)
    return {
      errorCode: -1,
      message: 'Unexpected error during fetching site users',
      data: null,
      totalCount: null,
    };
  }
}

async function sitesDetails(site_id: any): Promise<SiteDetailResponse> {
  // Validate the input
  if (!site_id) {
    return {
      errorCode: 1,
      message: 'Invalid input: site_id cannot be null or empty',
      data: null,
    };
  }

  try {
    // Fetch the site details from the 'sites_detail' table using the site_id
    const { data: sites_detail, error } = await supabase
      .from('sites_detail')
      .select('*')
      .eq('id', site_id);

    // Check for errors during the fetch operation
    if (error) {
      return {
        errorCode: 1,
        message: 'Error while fetching site details',
        data: null,
      };
    } else {
      // Log the fetched site details
      return { errorCode: 0, message: 'Success', data: sites_detail };
    }
  } catch (error) {
    // Log any unexpected errors
    return {
      errorCode: -1,
      message: 'Unexpected error during fetching site details',
      data: null,
    };
  }
}

// Function to fetch and log the number of users, licenses, and sandboxes for a given site
async function sitesCounts(site_id: any, org_id: any): Promise<FunctionReturn> {
  // Validate the input
  if (!site_id || !org_id) {
    return {
      errorCode: 1,
      message: 'Invalid input: site_id and org_id cannot be null or empty',
      data: null,
    };
  }

  try {
    // Fetch the users associated with the site
    const { data: site_users, error: userError } = await supabase
      .from('site_users')
      .select('*')
      .eq('site_id', site_id);

    // Check for errors during the fetch operation for users
    if (userError) {
      return {
        errorCode: 1,
        message: 'Error while fetching site users',
        data: null,
      };
    }

    // Fetch the licenses associated with the site
    const { data: licence, error: licenceError } = await supabase
      .from('licence')
      .select('*')
      .eq('site_id', site_id);

    // Check for errors during the fetch operation for licenses
    if (licenceError) {
      return {
        errorCode: 1,
        message: 'Error while fetching site licenses',
        data: null,
      };
    }

    // Fetch the entitlements package associated with the site
    const { data: entitlements_package, error: entitlementsPackageError } =
      await supabase
        .from('entitlements_package')
        .select('*')
        .eq('entitlement_name_id', '12')
        .eq('site_id', site_id)
        .eq('org_id', org_id);

    // Check for errors during the fetch operation for entitlements package
    if (entitlementsPackageError) {
      return {
        errorCode: 1,
        message: 'Error while fetching entitlements package',
        data: null,
      };
    }

    let entitlementsPackageCount = 0;
    if (entitlements_package.length > 0) {
      const { data: entitlements_values, error } = await supabase
        .from('entitlements_values')
        .select('*')
        .eq('id', entitlements_package[0].entitlement_value_id);
      if (error) {
        return {
          errorCode: 1,
          message: 'Error while fetching entitlements_values',
          data: null,
        };
      }
      if (entitlements_values) {
        entitlementsPackageCount = entitlements_values[0].value_number;
      } else {
        entitlementsPackageCount = 0;
      }
    }

    // Return the number of users, licenses, and sandboxes
    return {
      errorCode: 0,
      message: 'Success',
      data: {
        usersCount: site_users.length,
        licencesCount: licence.length,
        sandboxesCount: entitlementsPackageCount,
      },
    };
  } catch (error) {
    // Log any unexpected errors
    return {
      errorCode: -1,
      message: 'Unexpected error during fetching site data',
      data: null,
    };
  }
}
interface FunctionReturnLicence {
  errorCode: number;
  message: string;
  data: any | null;
}

// Function to fetch licenses and their types for a given site
async function licenceData(site_id: any): Promise<FunctionReturnLicence> {
  // Validate the input
  if (!site_id) {
    return {
      errorCode: 1,
      message: 'Invalid input: site_id cannot be null or empty',
      data: null,
    };
  }

  try {
    // Fetch the licenses associated with the site
    const { data: licences, error: licenceError } = await supabase
      .from('licence')
      .select('*')
      .eq('site_id', site_id);

    // Check for errors during the fetch operation for licenses
    if (licenceError) {
      return {
        errorCode: 1,
        message: 'Error while fetching site licenses',
        data: null,
      };
    }

    // If no licenses are found, return immediately
    if (!licences || licences.length === 0) {
      return {
        errorCode: 0,
        message: 'No licenses found for the given site_id',
        data: [],
      };
    }

    // Fetch all license types in parallel
    const licenceDetails = await Promise.all(
      licences.map(async (licence) => {
        const { data: licenceType, error: licenceTypeError } = await supabase
          .from('licence_type')
          .select('name')
          .eq('id', licence.type)
          .single(); // Assuming licence.type refers to the license type ID

        // If there's an error fetching the license type, handle it here
        if (licenceTypeError) {
          throw new Error('Error while fetching license type name');
        }
        const licenseTypeName = licenceType.name;
        return {
          ...licence,
          licence_type_name: licenseTypeName,
        };
      }),
    );

    // Return the license details with type names
    return {
      errorCode: 0,
      message: 'Success',
      data: licenceDetails,
    };
  } catch (error) {
    // Log any unexpected errors
    return {
      errorCode: -1,
      message: 'Unexpected error during fetching license data',
      data: null,
    };
  }
}

// Define the function to fetch entitlement data for a site
async function entitlementSite(site_id: any, start: any, end: any) {
  try {
    // Validate the input
    if (!site_id) {
      return {
        errorCode: 1,
        message: 'Invalid input: site_id cannot be null or empty',
        data: null,
      };
    }
    const { count: totalCount, error: countError } = await supabase
      .from('entitlements_package')
      .select('*', { count: 'exact', head: true })
      .eq('site_id', site_id);

    if (countError) {
      return {
        errorCode: 1,
        data: null,
      };
    }

    // Fetch the licenses associated with the site
    const { data: entitlements_package, error: entitlementsError } =
      await supabase
        .from('entitlements_package')
        .select('*')
        .eq('site_id', site_id)
        .range(start, end);

    // Check for errors during the fetch operation for licenses
    if (entitlementsError) {
      return {
        errorCode: 1,
        message: 'Error while fetching entitlement packages',
        data: null,
      };
    }

    const entitlementList = [];

    for (const entitlement of entitlements_package) {
      // Fetch the name of the entitlement
      const { data: entitlementName, error: entitlementNameError } =
        await supabase
          .from('entitlements_name')
          .select('name')
          .eq('id', entitlement.entitlement_name_id)
          .single();

      // Fetch the value of the entitlement
      const { data: entitlementValue, error: entitlementValueError } =
        await supabase
          .from('entitlements_values')
          .select('value_number')
          .eq('id', entitlement.entitlement_value_id)
          .single();

      // Handle errors for fetching entitlement details
      if (entitlementNameError || entitlementValueError) {
        continue;
      }

      // Create detailed entitlement object
      const detailedEntitlement = {
        ...entitlement,
        entitlementName: entitlementName.name,
        entitlementValue: entitlementValue.value_number,
      };

      entitlementList.push(detailedEntitlement);
    }

    // Return the license details with type names
    return {
      errorCode: 0,
      message: 'Success',
      data: entitlementList,
      totalCount: totalCount,
    };
  } catch (error) {
    // Log any unexpected errors
    return {
      errorCode: -1,
      message: 'Unexpected error during fetching license data',
      data: null,
    };
  }
}

export {
  allSitesOfUsers,
  entitlementSite,
  licenceData,
  sitesCounts,
  sitesDetails,
};
