/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "./db";



interface OrgDetail {
  id: number;
  name: string;
  description: string;
  type_id: number;
  status: string;
}

interface UserRole {
  id: number;
  name: string;
}

// Define return types for the functions
interface Result<T> {
  errorCode: number;
  message?: string;
  data: T | null;
}

interface OrganizationWithSiteCount {
  errorCode: number;
  org_id: string;
  org_name: string;
  sites_count: number;
}

async function fetchOrganizationAndSiteDetails(user_id: any | null): Promise<OrganizationWithSiteCount[] | null> {
  try {
    // Fetch org_id associated with the user
    const { data: userOrgs, error: userOrgError } = await supabase
      .from("org_users")
      .select("org_id")
      .eq('user_id', user_id);

    if (userOrgError) {
      throw userOrgError;
    }

    // Extract the org_ids from userOrgs
    const orgIds = userOrgs.map(org => org.org_id);

    // Fetch organization details based on orgIds
    const { data: orgDetails, error: orgError } = await supabase
      .from("org_details")
      .select("*")
      .in('id', orgIds)
      .order('created_at', { ascending: false });

    if (orgError) {
      throw orgError;
    }

    // Fetch site details
    const { data: siteDetails, error: siteError } = await supabase
      .from("sites_detail")
      .select("*");

    if (siteError) {
      throw siteError;
    }

    // Count sites for each organization
    const orgsWithSitesCount = orgDetails.map(org => {
      const sitesCountForOrg = siteDetails.filter(
        site => site.org_id === org.id
      ).length;
      return {
        errorCode: 0,
        org_id: org.id,
        org_name: org.name,
        sites_count: sitesCountForOrg,
      };
    });

    return orgsWithSitesCount;
  } catch (error) {
    console.error("Error fetching organization and site details:", (error as Error).message);
    return null;
  }
}

async function organizationSidebarList(search: string, user_id: string): Promise<Result<OrgDetail[]>> {
  try {
    // Fetch org_id associated with the user
    const { data: userOrgs, error: userOrgError } = await supabase
      .from("org_users")
      .select("org_id")
      .eq('user_id', user_id);

    if (userOrgError) {
      throw userOrgError;
    }

    // Extract the org_ids from userOrgs
    const orgIds = userOrgs.map(org => org.org_id);

    let orgDetails: OrgDetail[] = [];

    if (search.trim() !== "") {
      const { data, error } = await supabase
        .from("org_details")
        .select("*")
        .in('id', orgIds)
        .ilike("name", `%${search}%`);

      if (error) {
        console.error("Error fetching organization details:", error.message);
        return { errorCode: 1, data: null };
      } else {
        orgDetails = data ?? [];
      }
    }

    console.log("Organization details fetched successfully:", orgDetails);
    return { errorCode: 0, data: orgDetails };
  } catch (error) {
    console.error("Error fetching organization details:", (error as Error).message);
    return { errorCode: 1, data: null };
  }
}


async function organizationSearch(): Promise<Result<OrgDetail[]>> {
  try {
    // Fetch organization details
    const search = "";
    const { data: orgDetails, error } = await supabase
      .from("org_details")
      .select("*")
      .ilike("name", `%${search}%`);

    if (error) {
      console.error("Error fetching organization details:", error.message);
      return { errorCode: 1, data: null };
    } else {
      console.log("Organization details fetched successfully:", orgDetails);
      return { errorCode: 0, data: orgDetails };
    }
  } catch (error) {
    console.error("Error fetching organization details:", (error as Error).message);
    return { errorCode: 1, data: null };
  }
}

async function fetchOrganizationTypes(): Promise<Result<any[]>> { // Replace `any` with the appropriate type if available
  try {
    // Fetch organization types
    const { data: orgTypes, error } = await supabase
      .from("org_types")
      .select("*");

    if (error) {
      console.error("Error fetching organization types:", error.message);
      return { errorCode: 1, data: null };
    } else {
      console.log("Organization types fetched successfully:", orgTypes);
      return { errorCode: 0, data: orgTypes };
    }
  } catch (error) {
    console.error("Error fetching organization types:", (error as Error).message);
    return { errorCode: 1, data: null };
  }
}

async function addOrganization(data: { user_id: any; role_id: any; name: string; description: string; type_id: any; status: string; domain: string[]; }): Promise<Result<any>> {
  try {
    // Insert organization details
    const { data: insertData, error: insertError } = await supabase
      .from("org_details")
      .insert([
        {
          name: data.name,
          description: data.description,
          type_id: data.type_id,
          status: data.status,
        },
      ])
      .select();

    if (insertError) {
      console.error("Error inserting organization details:", insertError.message);
      return { errorCode: 1, data: null };
    }

    console.log("Organization details inserted successfully:", insertData);

    // Insert organization user
    const { data: userInsertData, error: userInsertError } = await supabase
      .from('org_users')
      .insert([
        { user_id: data.user_id, role_id: data.role_id, org_id: insertData[0].id },
      ])
      .select();

    if (userInsertError) {
      console.error("Error inserting organization user:", userInsertError.message);
      return { errorCode: 1, data: null };
    }

    console.log("Organization user added successfully:", userInsertData);

    // Insert domains
    const domainInsertResults = [];
    const orgId = insertData[0].id;

    for (const domain of data.domain) {
      const { data: insertDomain, error: domainError } = await supabase
        .from("domains")
        .insert([{ name: domain, org_id: orgId }])
        .select();

      if (domainError) {
        console.error("Error inserting domain:", domainError.message);
        domainInsertResults.push({ success: false, error: domainError });
      } else {
        domainInsertResults.push({ success: true, data: insertDomain });
      }
    }

    console.log("Domains inserted successfully:", domainInsertResults);

    return { errorCode: 0, data: { insertData, userInsertData, domainInsertResults } };
  } catch (error) {
    console.error("Error adding organization:", (error as Error).message);
    return { errorCode: 1, data: null };
  }
}

async function updateOrganization(data: { name: string; description: string; type_id: any; status: string; domain: string[]; org_id: any }): Promise<Result<any>> { // Replace `any` with the appropriate type if available
  try {
    // Update organization details
    const { data: updateData, error } = await supabase
      .from("org_details")
      .update({
        name: data.name,
        description: data.description,
        type_id: data.type_id,
        status: data.status,
      })
      .eq("id", data.org_id)
      .select();

    if (error) {
      console.error("Error updating organization details:", error.message);
      return { errorCode: 1, data: null };
    } else {
      console.log("Organization details updated successfully:", updateData);

      // Delete existing domains
      const { error: deleteDomainError } = await supabase
        .from("domains")
        .delete()
        .eq("org_id", data.org_id);

      if (deleteDomainError) {
        console.error("Error deleting domains:", deleteDomainError.message);
        return { errorCode: 1, data: null };
      }

      // Insert new domains
      const domainInsertResults = [];
      for (const domain of data.domain) {
        const { data: insertDomain, error: domainError } = await supabase
          .from("domains")
          .insert([{ name: domain, org_id: data.org_id }])
          .select();

        if (domainError) {
          console.error("Error inserting domain:", domainError.message);
          domainInsertResults.push({ success: false, error: domainError });
        } else {
          domainInsertResults.push({ success: true, data: insertDomain });
        }
      }

      return { errorCode: 0, data: { updateData, domainInsertResults } };
    }
  } catch (error) {
    console.error("Error updating organization details:", (error as Error).message);
    return { errorCode: 1, data: null };
  }
}

async function viewOrganization(org_id: any): Promise<Result<OrgDetail[]>> {
  try {
    // Fetch organization details
    const { data: orgDetails, error } = await supabase
      .from("org_details")
      .select("*")
      .eq("id", org_id);

    if (error) {
      console.error("Error fetching organization details:", error.message);
      return { errorCode: 1, data: null };
    } else {
      console.log("Organization details fetched successfully:", orgDetails);
      return { errorCode: 0, data: orgDetails };
    }
  } catch (error) {
    console.error("Error fetching organization details:", (error as Error).message);
    return { errorCode: 1, data: null };
  }
}

async function deleteOrganization(org_id: any): Promise<Result<null>> {
  try {
    // Delete matching domains from 'domains' table
    const { error: domainError } = await supabase
      .from("domains")
      .delete()
      .eq("org_id", org_id);

    // Delete organization details from 'org_details' table
    const { error: orgError } = await supabase
      .from("org_details")
      .delete()
      .eq("id", org_id);

    if (orgError || domainError) {
      console.error("Error deleting organization:", orgError?.message || domainError?.message);
      return { errorCode: 1, data: null };
    } else {
      console.log("Organization and matching domains deleted successfully");
      return { errorCode: 0, data: null };
    }
  } catch (error) {
    console.error("Error deleting organization:", (error as Error).message);
    return { errorCode: 1, data: null };
  }
}

async function getUserRole(): Promise<Result<UserRole[]>> {
  try {
    // Fetch user roles
    const { data: userRoles, error } = await supabase
      .from("user_role")
      .select("*");

    if (error) {
      console.error("Error fetching user roles:", error.message);
      return { errorCode: 1, data: null };
    } else {
      console.log("User roles fetched successfully:", userRoles);
      return { errorCode: 0, data: userRoles };
    }
  } catch (error) {
    console.error("Error fetching user roles:", (error as Error).message);
    return { errorCode: 1, data: null };
  }
}

export {
  fetchOrganizationAndSiteDetails,
  organizationSidebarList,
  organizationSearch,
  fetchOrganizationTypes,
  addOrganization,
  updateOrganization,
  viewOrganization,
  deleteOrganization,
  getUserRole,
};
