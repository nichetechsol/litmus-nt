import { createClient } from '@supabase/supabase-js';

// Define the URL and key for Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
// import { createClient } from '@supabase/supabase-js';

// // Define the URL and key for Supabase, with fallback error handling
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error('Missing Supabase URL or Key');
// }

// // Create the Supabase client
// export const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;
