/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from './db';

// Define the interface for SiteType
interface SiteType {
  id: any;
  name: string;
  // Add other fields as needed
}

// Define the interface for the result
interface Result<T> {
  errorCode: number;
  message: string;
  data: T | null;
}

// Fetch site types function with proper type annotations
async function fetchSiteType(): Promise<Result<SiteType[]>> {
  try {
    // Fetch site types
    const { data: siteTypes, error } = await supabase
      .from('site_types')
      .select('*');

    // Check for errors during fetch
    if (error) {
      // Return error response
      return {
        errorCode: 1,
        message: 'Error fetching site types',
        data: null,
      };
    } else {
      // Log successful fetch
      // Return success response with fetched data
      return {
        errorCode: 0,
        message: 'Site types fetched successfully',
        data: siteTypes as SiteType[],
      };
    }
  } catch (error) {
    // Log unexpected errors
    // Return error response for unexpected errors
    return {
      errorCode: 1,
      message: 'Unexpected error fetching site types',
      data: null,
    };
  }
}

export { fetchSiteType };
