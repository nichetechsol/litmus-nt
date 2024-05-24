import { supabase } from "./db";

interface SiteDetails {
  id: number;
  org_id: number;
  name: string;
  type_id: number;
  address1: string;
  address2?: string;
  city: string;
  pin_code: string;
  about_site?: string;
  status: string;
  country_id: number;
  state_id: number;
}

interface User {
  id: number;
  site_id: number;
  user_id: number;
  role_id: number;
}


interface Result<T> {
  errorCode: number;
  message?: string;
  data: T | null;
}

interface SiteDetailsWithUsers {
  site: SiteDetails;
  users: User[];
  ownerNames: string[];
  country: string | null;
  state: string | null;
}

async function fetchSiteDetails(org_id: number): Promise<Result<SiteDetailsWithUsers[]>> {
  try {
    // Fetch organization details
    const { data: siteDetails, error } = await supabase
      .from("sites_detail")
      .select("*")
      .eq("org_id", org_id);

    if (error) {
      throw error;
    }

    const siteDetailsWithUsers: SiteDetailsWithUsers[] = [];

    // Fetch user details for each site
    for (const site of siteDetails as SiteDetails[]) {
      const [users, country, state, owners] = await Promise.all([
        supabase
          .from("site_users")
          .select("*", { count: "exact" })
          .eq("site_id", site.id),
        supabase.from("country").select("name").eq("id", site.country_id),
        supabase.from("state").select("name").eq("id", site.state_id),
        supabase
          .from("site_users")
          .select("user_id")
          .eq("site_id", site.id)
          .eq("role_id", 1),
      ]);

      if (users.error) {
        throw users.error;
      }
      if (country.error) {
        throw country.error;
      }
      if (state.error) {
        throw state.error;
      }
      if (owners.error) {
        throw owners.error;
      }

      let ownerNames: string[] = [];
      if (owners.data.length > 0) {
        const ownerUserIds = owners.data.map((owner) => owner.user_id);

        // Fetch owners' names from users table
        const { data: ownerDetails, error: ownerDetailsError } = await supabase
          .from("users")
          .select("firstname")
          .in("id", ownerUserIds);

        if (ownerDetailsError) {
          throw ownerDetailsError;
        }

        if (ownerDetails && ownerDetails.length > 0) {
          ownerNames = ownerDetails.map((owner) => owner.firstname);
        }
      }

      siteDetailsWithUsers.push({
        site,
        users: users.data,
        ownerNames,
        country: country.data.length > 0 ? country.data[0].name : null,
        state: state.data.length > 0 ? state.data[0].name : null,
      });
    }

    console.log("site", siteDetailsWithUsers);

    return {
      errorCode: 0,
      data: siteDetailsWithUsers,
    };
  } catch (error) {
    console.error(
      "Error fetching organization and site details:",
      (error as Error).message
    );
    return {
      errorCode: 1,
      message: (error as Error).message,
      data: null,
    };
  }
}

async function fetchSiteSidebarList(searchQuery: string, org_id: number): Promise<Result<SiteDetails[]>> {
  try {
    // Fetch site details with names matching the search query
    const { data: siteDetails, error } = await supabase
      .from("sites_detail")
      .select("*")
      .eq("org_id", org_id)
      .ilike("name", `%${searchQuery}%`);

    if (error) {
      console.error("Error fetching site details:", error.message);
      return {
        errorCode: 1,
        message: "Error fetching site details",
        data: null,
      };
    } else {
      console.log("Site details fetched successfully:", siteDetails);
      return {
        errorCode: 0,
        message: "Site details fetched successfully",
        data: siteDetails,
      };
    }
  } catch (error) {
    console.error("Unexpected error fetching site details:", (error as Error).message);
    return {
      errorCode: 1,
      message: (error as Error).message,
      data: null,
    };
  }
}

export { fetchSiteDetails, fetchSiteSidebarList };
