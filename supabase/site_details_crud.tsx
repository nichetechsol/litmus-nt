/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "./db";

// Define interfaces for the site data and result structure
interface SiteData {
  org_id: any;
  name: string;
  type_id: any;
  address1: string;
  address2?: string;
  city: string;
  pin_code: string;
  about_site?: string;
  status: string;
  country_id: any;
  state_id: any;
}

interface UpdateSiteData {
  name?: string;
  type_id?: any;
  address1?: string;
  address2?: string;
  city?: string;
  pin_code?: string;
  about_site?: string;
  status?: string;
  country_id?: any;
  state_id?: any;
}

interface Result<T> {
  errorCode: number;
  message: string;
  data: T | null;
}

// Function to add a site
async function addSites(data: SiteData): Promise<Result<any>> {
  try {
    // Check for duplicate site names in the organization
    const { data: existingSite, error: duplicateCheckError } = await supabase
      .from("sites_detail")
      .select('id')
      .eq('org_id', data.org_id)
      .eq('name', data.name)
      .single(); // Assuming a single record is expected

    // If a duplicate is found, return an error
    if (existingSite) {
      console.error("Duplicate site name found within the organization.");
      return {
        errorCode: 1,
        message: "Duplicate site name",
        data: null,
      };
    }

    // Check for errors during the duplicate check
    if (duplicateCheckError && duplicateCheckError.code !== 'PGRST116') { // PGRST116: No rows found
      console.error("Error checking for duplicate site name:", duplicateCheckError.message);
      return {
        errorCode: 1,
        message: "Error checking for duplicate site name",
        data: null,
      };
    }

    // Insert new site details if no duplicate is found
    const { data: siteDetails, error: insertError } = await supabase
      .from("sites_detail")
      .insert([data])
      .select();

    // Check for errors during the insert operation
    if (insertError) {
      console.error("Error inserting site details:", insertError.message);
      return {
        errorCode: 1,
        message: "Error inserting site details",
        data: null,
      };
    } else {
      console.log("Site details inserted successfully:", siteDetails);
      return {
        errorCode: 0,
        message: "Site details inserted successfully",
        data: siteDetails,
      };
    }
  } catch (error) {
    console.error("Unexpected error:", (error as Error).message);
    return {
      errorCode: 1,
      message: "Unexpected error",
      data: null,
    };
  }
}

// Function to update a site
async function updateSite(siteId: any, updateData: UpdateSiteData): Promise<Result<any>> {
  try {
    // Validate the input
    if (!siteId || !updateData) {
      console.error('Invalid input: site ID and update data cannot be null');
      return { errorCode: 1, message: "Invalid input", data: null };
    }

    // Update site details
    const { data: updatedSite, error: updateError } = await supabase
      .from("sites_detail")
      .update(updateData)
      .eq('id', siteId)
      .select();

    // Check for errors during the update operation
    if (updateError) {
      console.error("Error updating site details:", updateError.message);
      return {
        errorCode: 1,
        message: "Error updating site details",
        data: null,
      };
    } else {
      console.log("Site details updated successfully:", updatedSite);
      return {
        errorCode: 0,
        message: "Site details updated successfully",
        data: updatedSite,
      };
    }
  } catch (error) {
    console.error("Unexpected error:", (error as Error).message);
    return {
      errorCode: 1,
      message: "Unexpected error",
      data: null,
    };
  }
}

// Function to delete a site
async function deleteSite(siteId: any): Promise<Result<any>> {
  try {
    // Validate the input
    if (!siteId) {
      console.error('Invalid input: site ID cannot be null');
      return { errorCode: 1, message: "Invalid input", data: null };
    }

    // Start a transaction to delete users associated with the site and then delete the site
    const { data: deleteUsers, error: deleteUsersError } = await supabase
      .from("site_users")
      .delete()
      .eq('site_id', siteId)
      .select();

    // Check for errors during the delete operation for site_users
    if (deleteUsersError) {
      console.error("Error deleting users from site_users table:", deleteUsersError.message);
      return {
        errorCode: 1,
        message: "Error deleting users from site_users table",
        data: null,
      };
    }

    // Delete site details
    const { data: deletedSite, error: deleteSiteError } = await supabase
      .from("sites_detail")
      .delete()
      .eq('id', siteId)
      .select();

    // Check for errors during the delete operation for sites_detail
    if (deleteSiteError) {
      console.error("Error deleting site details:", deleteSiteError.message);
      return {
        errorCode: 1,
        message: "Error deleting site details",
        data: null,
      };
    } else {
      console.log("Site details and associated users deleted successfully:", { deletedSite, deleteUsers });
      return {
        errorCode: 0,
        message: "Site details and associated users deleted successfully",
        data: { deletedSite, deleteUsers },
      };
    }
  } catch (error) {
    console.error("Unexpected error:", (error as Error).message);
    return {
      errorCode: 1,
      message: "Unexpected error",
      data: null,
    };
  }
}

export { addSites, updateSite, deleteSite };
