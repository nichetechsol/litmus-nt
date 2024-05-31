import { supabase } from "./db";

// Define an interface for the state data
interface State {
  id: any;
  name: string;
  country_id: any;
}

// Define a type for the result returned by the function
interface Result<T> {
  errorCode: number;
  message: string;
  data: T | null;
}

// Function to fetch the list of states based on the country_id
async function stateList(country_id: any): Promise<Result<State[]>> {
  try {
    // Validate the country_id
    if (!country_id) {
      return {
        errorCode: 1,
        message: "Invalid country_id provided",
        data: null,
      };
    }

    // Fetch all records from the 'state' table where country_id matches
    const { data: states, error } = await supabase
      .from('state')
      .select('*')
      .eq('country_id', country_id);

    // Check for any errors during the fetch operation
    if (error) {
      console.error("Error fetching state details:", error.message);
      return {
        errorCode: 1,
        message: "Error fetching state details",
        data: null,
      };
    } else {
      console.log("State details fetched successfully:", states);
      return {
        errorCode: 0,
        message: "State details fetched successfully",
        data: states,
      };
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Unexpected error fetching state details:", error);
    return {
      errorCode: 1,
      message: "Unexpected error fetching state details",
      data: null,
    };
  }
}

export { stateList };
