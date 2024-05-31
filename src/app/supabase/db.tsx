import { createClient } from '@supabase/supabase-js';

// Define the URL and key for Supabase
const supabaseUrl = 'https://emsjiuztcinhapaurcrl.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtc2ppdXp0Y2luaGFwYXVyY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0ODc1MTUsImV4cCI6MjAzMDA2MzUxNX0.79_004dmDW8KA-wXxBD2EP3iwNUu_FhCvumdN4jiCWk';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
