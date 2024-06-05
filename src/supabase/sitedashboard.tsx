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
interface FunctionReturnLicence {
  errorCode: number;
  message: string;
  data: any | null;
}

async function allSitesOfUsers(
  user_id: any,
  org_id: any,
): Promise<FunctionReturn> {
  // Validate inputs
  if (!user_id || !org_id) {
    return {
      errorCode: 1,
      message: 'Invalid input: user_id and org_id cannot be null or empty',
      data: null,
    };
  }

  try {
    // Perform the join query
    const { data, error } = await supabase
      .from('site_users')
      .select(
        `
        *,
        sites_detail (*)
      `,
      )
      .eq('user_id', user_id)
      .eq('sites_detail.org_id', org_id);

    // Handle potential errors from the query
    if (error) {
      return {
        errorCode: 1,
        message: 'Error while fetching site users',
        data: null,
      };
    }

    // Filter out entries where sites_detail is null
    const filteredData = (data ?? []).filter(
      (item) => item.sites_detail !== null,
    );

    return { errorCode: 0, message: 'Success', data: filteredData };
  } catch (err) {
    // Handle any other errors (e.g., network issues)
    return {
      errorCode: -1,
      message: 'Unexpected error during fetching site users',
      data: null,
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

export { allSitesOfUsers, licenceData, sitesCounts, sitesDetails };
