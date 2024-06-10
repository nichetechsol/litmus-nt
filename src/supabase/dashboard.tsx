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

    if (userError || entitlementError || siteError) {
      return {
        errorCode: 1,
        data: {
          userCount: null,
          entitlementCount: null,
          sitesDetailCount: null,
        },
      };
    }

    return {
      errorCode: 0,
      data: {
        userCount,
        entitlementCount,
        sitesDetailCount,
      },
    };
  } catch (error) {
    return {
      errorCode: 1,
      data: {
        userCount: null,
        entitlementCount: null,
        sitesDetailCount: null,
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
      const { data: entitlementName, error: entitlementNameError } =
        await supabase
          .from('entitlements_name')
          .select('name')
          .eq('id', entitlement.entitlement_name_id)
          .single();

      const { data: entitlementValue, error: entitlementValueError } =
        await supabase
          .from('entitlements_values')
          .select('value_number')
          .eq('id', entitlement.entitlement_value_id)
          .single();

      if (entitlementNameError || entitlementValueError) {
        continue;
      }

      const detailedEntitlement = {
        ...entitlement,
        entitlementName: entitlementName.name,
        entitlementValue: entitlementValue.value_number,
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
