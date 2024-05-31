/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "./db";

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
  data:any
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
async function orgDashboardCounts(org_id: any): Promise<Result<DashboardCounts>> {
  try {
    const { count: userCount, error: userError } = await supabase
      .from("org_users")
      .select("*", { count: "exact" })
      .eq("org_id", org_id);

    const { count: entitlementCount, error: entitlementError } = await supabase
      .from("entitlements_package")
      .select("*", { count: "exact" })
      .eq("org_id", org_id);

    const { count: sitesDetailCount, error: siteError } = await supabase
      .from("sites_detail")
      .select("*", { count: "exact" })
      .eq("org_id", org_id);

    if (userError || entitlementError || siteError) {
      console.error(
        "Error counting records:",
        userError?.message,
        entitlementError?.message,
        siteError?.message
      );
      return {
        errorCode: 1,
        data: {
          userCount: null,
          entitlementCount: null,
          sitesDetailCount: null,
        },
      };
    }

    console.log("Total users counted:", userCount);
    console.log("Total entitlements counted:", entitlementCount);
    console.log("Total sites details counted:", sitesDetailCount);
    return {
      errorCode: 0,
      data: {
        userCount,
        entitlementCount,
        sitesDetailCount,
      },
    };
  } catch (error) {
    console.error("Error counting records:", (error as Error).message);
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
// Function to fetch a list of users for an organization
async function orgUserList(org_id: any, start: any, end: any,search:any): Promise<Result<{ userList: UserList[], totalCount: any }>> {
  try {
    const { data: orgUsers, error: orgUsersError } = await supabase
      .from("org_users")
      .select("*")
      .eq("org_id", org_id);

    if (orgUsersError) {
      console.error("Error fetching organization users list:", orgUsersError.message);
      return {
        errorCode: 1,
        data: null,
      };
    }

    const userIds = orgUsers.map(orgUser => orgUser.user_id);
    const roleIds = orgUsers.map(orgUser => orgUser.role_id);

    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*")
      .in("id", userIds)
      .range(start, end)
      .ilike("firstname", `%${search}%`);


    if (usersError) {
      console.error("Error fetching users details:", usersError.message);
      return {
        errorCode: 1,
        data: null,
      };
    }

    const { data: userRoles, error: userRolesError } = await supabase
      .from("user_role")
      .select("*")
      .in("id", roleIds);

    if (userRolesError) {
      console.error("Error fetching user roles:", userRolesError.message);
      return {
        errorCode: 1,
        data: null,
      };
    }

    const roleMap: Record<number, string> = {};
    userRoles.forEach(role => {
      roleMap[role.id] = role.name;
    });

    const userList = users.map(user => {
      const orgUser = orgUsers.find(orgUser => orgUser.user_id === user.id);
      if (!orgUser) {
        return null; // Handle case where orgUser is not found
      }
      return {
        ...user,
        role_id: orgUser.role_id,
        role: roleMap[orgUser.role_id],
      };
    }).filter(Boolean) as UserList[];

    const totalCount = await supabase
    .from("users")
      .select("*", { count: 'exact' })
      .in("id", userIds)
      .ilike("firstname", `%${search}%`).then(({ count }) => count);

    console.log("Organization users list with details:", userList);
    return {
      errorCode: 0,
      data: { userList, totalCount },
    };
  } catch (error) {
    console.error("Error fetching user list:", (error as Error).message);
    return {
      errorCode: 1,
      data: null,
    };
  }
}

// Function to fetch a list of entitlements for an organization
async function orgEntitlementList(org_id: any, start: any, end: any): Promise<Result<{ totalCount: number, entitlements: EntitlementList[] }>> {
  try {
    // Fetch total count of entitlements
    const { count: totalCount, error: countError } = await supabase
      .from("entitlements_package")
      .select("*", { count: 'exact', head: true })
      .eq("org_id", org_id);

    if (countError) {
      console.error("Error fetching total count of entitlements:", countError.message);
      return {
        errorCode: 1,
        data: null,
      };
    }

    // Fetch paginated list of entitlements
    const { data: entitlements, error: entitlementsError } = await supabase
      .from("entitlements_package")
      .select("*")
      .eq("org_id", org_id)
      .range(start, end);

    if (entitlementsError) {
      console.error("Error fetching entitlements list:", entitlementsError.message);
      return {
        errorCode: 1,
        data: null,
      };
    }

    const entitlementList: EntitlementList[] = [];

    for (const entitlement of entitlements) {
      const { data: entitlementName, error: entitlementNameError } = await supabase
        .from("entitlements_name")
        .select("name")
        .eq("id", entitlement.entitlement_name_id)
        .single();

      const { data: entitlementValue, error: entitlementValueError } = await supabase
        .from("entitlements_values")
        .select("value_number")
        .eq("id", entitlement.entitlement_value_id)
        .single();

      if (entitlementNameError || entitlementValueError) {
        console.error(
          "Error fetching entitlement details for entitlement_id:",
          entitlement.id,
          entitlementNameError?.message || entitlementValueError?.message
        );
        continue;
      }

      const detailedEntitlement = {
        ...entitlement,
        entitlementName: entitlementName.name,
        entitlementValue: entitlementValue.value_number,
      };

      entitlementList.push(detailedEntitlement);
    }

    console.log("Organization entitlements list with details:", entitlementList);

    return {
      errorCode: 0,
      data: {
        totalCount: totalCount || 0, // Provide a default value in case totalCount is undefined
        entitlements: entitlementList,
      },
    };
  } catch (error) {
    console.error("Error fetching entitlement list:", (error as Error).message);
    return {
      errorCode: 1,
      data: null,
    };
  }
}


export { orgDashboardCounts, orgUserList, orgEntitlementList };
