/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from './db';

// Define interfaces for the data structures used

interface Result<T> {
  errorCode: number;
  message?: string;
  data: T | null;
}

interface DashboardCounts {
  userCount: any | null;
  entitlementCount: any | null;
  sitesDetailCount: any | null;
  entitlementExceed: any | null;
}

interface UserList {
  data: any;
  id: any;
  email: string;
  firstname: string;
  lastname: string;
  role_id: any;
  role: string;
}

interface EntitlementList {
  id: any;
  org_id: any;
  entitlement_name_id: any;
  entitlement_value_id: any;
  entitlementName: string;
  entitlementValue: any;
}

// Function to count records for an organization dashboard
async function orgDashboardCounts(
  org_id: any,
): Promise<Result<DashboardCounts>> {
  try {
    const { count: userCount, error: userError } = await supabase
      .from('org_users')
      .select('*', { count: 'exact' })
      .eq('org_id', org_id);

    const { count: entitlementCount, error: entitlementError } = await supabase
      .from('entitlements_package')
      .select('*', { count: 'exact' })
      .eq('org_id', org_id);

    const { count: sitesDetailCount, error: siteError } = await supabase
      .from('sites_detail')
      .select('*', { count: 'exact' })
      .eq('org_id', org_id);
    const { data: currentSites, error: countError } = await supabase
      .from('sites_detail')
      .select('id')
      .eq('org_id', org_id);

    if (countError) {
      return {
        errorCode: 1,
        message: 'Error retrieving current site count',
        data: null,
      };
    }
    // Get entitlement limit for the organization
    const { data: entitlement, error: entitlementError1 } = await supabase
      .from('entitlements_package')
      .select('entitlement_value_id')
      .eq('org_id', org_id)
      .eq('entitlement_name_id', 16); // Assuming 'max_sites_prod' has id 14

    if (entitlementError1) {
      return {
        errorCode: 1,
        message: 'Error retrieving entitlement limit',
        data: null,
      };
    }

    if (!entitlement || entitlement.length === 0) {
      return {
        errorCode: 1,
        message: 'No entitlement found for the organization',
        data: null,
      };
    }

    // Check entitlement value
    const { data: entitlementValue, error: valueError } = await supabase
      .from('entitlements_values')
      .select('value_number')
      .eq('id', entitlement[0].entitlement_value_id)
      .single();

    if (valueError) {
      return {
        errorCode: 1,
        message: 'Error retrieving entitlement value',
        data: null,
      };
    }
    let entitlementExceed = null;
    // Check if current number of sites exceeds entitlement limit
    if (currentSites.length >= (entitlementValue.value_number ?? 0)) {
      entitlementExceed = 'Y';
    } else {
      entitlementExceed = 'N';
    }
    if (userError || entitlementError || siteError) {
      return {
        errorCode: 1,
        data: {
          userCount: null,
          entitlementCount: null,
          sitesDetailCount: null,
          entitlementExceed: null,
        },
      };
    }

    return {
      errorCode: 0,
      data: {
        userCount,
        entitlementCount,
        sitesDetailCount,
        entitlementExceed,
      },
    };
  } catch (error) {
    return {
      errorCode: 1,
      data: {
        userCount: null,
        entitlementCount: null,
        sitesDetailCount: null,
        entitlementExceed: null,
      },
    };
  }
}

// Function to fetch a list of users for an organization
async function orgUserList(
  org_id: any,
  start: any,
  end: any,
  search: any,
): Promise<Result<{ userList: UserList[]; totalCount: any }>> {
  try {
    const { data: orgUsers, error: orgUsersError } = await supabase
      .from('org_users')
      .select('*')
      .eq('org_id', org_id);

    if (orgUsersError) {
      return {
        errorCode: 1,
        data: null,
      };
    }

    const userIds = orgUsers.map((orgUser: any) => orgUser.user_id);
    const roleIds = orgUsers.map((orgUser: any) => orgUser.role_id);

    let userQuery = supabase
      .from('users')
      .select('*')
      .in('id', userIds)
      .range(start, end);

    if (search) {
      userQuery = userQuery.ilike('firstname', `%${search}%`);
    } else {
      userQuery = userQuery.or('firstname.ilike.%,firstname.is.null');
    }

    const { data: users, error: usersError } = await userQuery;

    if (usersError) {
      return {
        errorCode: 1,
        data: null,
      };
    }

    const { data: userRoles, error: userRolesError } = await supabase
      .from('user_role')
      .select('*')
      .in('id', roleIds);

    if (userRolesError) {
      return {
        errorCode: 1,
        data: null,
      };
    }

    const roleMap: Record<number, string> = {};
    userRoles.forEach((role) => {
      roleMap[role.id] = role.name;
    });

    const userList = users
      .map((user) => {
        const orgUser = orgUsers.find((orgUser) => orgUser.user_id === user.id);
        if (!orgUser) {
          return null; // Handle case where orgUser is not found
        }
        return {
          ...user,
          role_id: orgUser.role_id,
          role: roleMap[orgUser.role_id],
        };
      })
      .filter(Boolean) as UserList[];

    const totalCountQuery = supabase
      .from('users')
      .select('*', { count: 'exact' })
      .in('id', userIds);

    if (search) {
      totalCountQuery.ilike('firstname', `%${search}%`);
    } else {
      totalCountQuery.or('firstname.ilike.%,firstname.is.null');
    }

    const totalCountResult = await totalCountQuery;
    const totalCount = totalCountResult.count || 0;

    return {
      errorCode: 0,
      data: { userList, totalCount },
    };
  } catch (error) {
    return {
      errorCode: 1,
      data: null,
    };
  }
}

// Function to fetch a list of entitlements for an organization
async function orgEntitlementList(
  org_id: any,
  start: any,
  end: any,
): Promise<Result<{ totalCount: number; entitlements: EntitlementList[] }>> {
  try {
    // Fetch total count of entitlements
    const { count: totalCount, error: countError } = await supabase
      .from('entitlements_package')
      .select('*', { count: 'exact', head: true })
      .eq('org_id', org_id);

    if (countError) {
      return {
        errorCode: 1,
        data: null,
      };
    }

    // Fetch paginated list of entitlements
    const { data: entitlements, error: entitlementsError } = await supabase
      .from('entitlements_package')
      .select('*')
      .eq('org_id', org_id)
      .range(start, end);

    if (entitlementsError) {
      return {
        errorCode: 1,
        data: null,
      };
    }

    const entitlementList: EntitlementList[] = [];

    for (const entitlement of entitlements) {
      // Fetch the name of the entitlement
      const { data: entitlementName, error: entitlementNameError } =
        await supabase
          .from('entitlements_name')
          .select('name')
          .eq('id', entitlement.entitlement_name_id)
          .single();

      // Fetch the value of the entitlement (select all potential value types)
      const { data: entitlementValue, error: entitlementValueError } =
        await supabase
          .from('entitlements_values')
          .select('*')
          .eq('id', entitlement.entitlement_value_id)
          .single();

      // Handle errors for fetching entitlement details
      if (entitlementNameError || entitlementValueError) {
        continue;
      }

      // Determine which value is present
      let entitlementValueResolved: any;
      if (
        entitlementValue.value_text !== null &&
        entitlementValue.value_text !== undefined
      ) {
        entitlementValueResolved = entitlementValue.value_text;

        entitlementValueResolved =
          entitlementValueResolved.charAt(0).toUpperCase() +
          entitlementValueResolved.slice(1);
      } else if (
        entitlementValue.value_number !== null &&
        entitlementValue.value_number !== undefined
      ) {
        entitlementValueResolved = entitlementValue.value_number;
      } else if (
        entitlementValue.value_bool !== null &&
        entitlementValue.value_bool !== undefined
      ) {
        entitlementValueResolved = entitlementValue.value_bool;
      } else {
        // If no value is present, continue to the next entitlement
        continue;
      }

      // Create detailed entitlement object
      const detailedEntitlement = {
        ...entitlement,
        entitlementName: entitlementName.name,
        entitlementValue: entitlementValueResolved,
      };

      entitlementList.push(detailedEntitlement);
    }
    return {
      errorCode: 0,
      data: {
        totalCount: totalCount || 0, // Provide a default value in case totalCount is undefined
        entitlements: entitlementList,
      },
    };
  } catch (error) {
    return {
      errorCode: 1,
      data: null,
    };
  }
}

export { orgDashboardCounts, orgEntitlementList, orgUserList };
