import { supabase } from "./db";

// Define the interface for the country data
interface Country {
  id: number;
  name: string;
  // Add other country fields as needed
}

// Define the interface for the result
interface Result<T> {
  errorCode: number;
  message: string;
  data: T | null;
}

// Function to fetch the list of countries
async function countryList(): Promise<Result<Country[]>> {
  try {
    // Fetch all records from the 'country' table
    const { data: countries, error } = await supabase
      .from('country')
      .select('*');

    // Check for any errors during the fetch operation
    if (error) {
      console.error("Error fetching country details:", error.message);
      return {
        errorCode: 1,
        message: "Error fetching country details",
        data: null,
      };
    } else {
      console.log("Country details fetched successfully:", countries);
      return {
        errorCode: 0,
        message: "Country details fetched successfully",
        data: countries,
      };
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Unexpected error fetching country details:", (error as Error).message);
    return {
      errorCode: 1,
      message: "Unexpected error fetching country details",
      data: null,
    };
  }
}

export { countryList };
