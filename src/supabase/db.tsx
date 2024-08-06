import { createClient } from '@supabase/supabase-js';

// Define the URL and key for Supabase
const supabaseUrl = 'https://mvygngejptxpeewhtmjm.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12eWduZ2VqcHR4cGVld2h0bWptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5MjE4NTIsImV4cCI6MjAwNjQ5Nzg1Mn0.Kw1tem3kXkEitQ42-v8Y1aWM0oBq0kgId7btWLR16S0';
// const supabaseUrl = 'https://xhfsouemrdscsfejrwmx.supabase.co';
// const supabaseKey =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZnNvdWVtcmRzY3NmZWpyd214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0Mjg3OTgsImV4cCI6MjAzODAwNDc5OH0.C49KtDPHGc3pg47epMU6BwhsT6BRq7WXvWvGVIfZNz4';
// const supabaseUrl = 'https://emsjiuztcinhapaurcrl.supabase.co';
// const supabaseKey =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtc2ppdXp0Y2luaGFwYXVyY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0ODc1MTUsImV4cCI6MjAzMDA2MzUxNX0.79_004dmDW8KA-wXxBD2EP3iwNUu_FhCvumdN4jiCWk';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
