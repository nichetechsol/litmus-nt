/* eslint-disable @typescript-eslint/no-explicit-any */

import supabase from '@/supabase/db';

// Define the return type for the function
interface FunctionReturn {
  errorCode: number;
  data: any | null;
}

// Function to fetch and log the number of users and licenses for a given site
async function sitesCounts(site_id: number): Promise<FunctionReturn> {
  // Validate the input
  if (!site_id) {
    // console.error('Invalid input: site_id cannot be null or empty');
    return { errorCode: 1, data: null };
  }

  try {
    // Fetch the users associated with the site
    const { data: site_users, error: userError } = await supabase
      .from('site_users')
      .select('*')
      .eq('site_id', site_id);

    // Check for errors during the fetch operation for users
    if (userError) {
      // console.error('Error while fetching site users:', userError.message);
      return { errorCode: 1, data: null };
    }

    // Log the number of users associated with the site
    // console.log('Number of users in the site:', site_users.length);

    // Fetch the licenses associated with the site
    const { data: licence, error: licenceError } = await supabase
      .from('licence')
      .select('*')
      .eq('site_id', site_id);

    // Check for errors during the fetch operation for licenses
    if (licenceError) {
      // console.error('Error while fetching site licenses:', licenceError.message);
      return { errorCode: 1, data: null };
    }

    // Log the number of licenses associated with the site
    // console.log('Number of licenses for the site:', licence.length);

    // Return the number of users and licenses
    return {
      errorCode: 0,
      data: { usersCount: site_users.length, licencesCount: licence.length },
    };
  } catch (error) {
    // Log any unexpected errors
    // console.error('Unexpected error during fetching site data:', error);
    return { errorCode: -1, data: null };
  }
}

export { sitesCounts };
