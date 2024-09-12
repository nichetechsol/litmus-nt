/* eslint-disable @typescript-eslint/no-explicit-any */

import supabase from '@/supabase/db';
export interface EmailConfiguration {
  To: string;
  email_subject: string;
  email_heading: string;
  email_content: string;
  // Add more fields as per the table structure
}
export interface Result<T> {
  errorCode: number;
  message?: string;
  data: T | null;
}
async function fetchEmailData(
  action: any,
): Promise<Result<EmailConfiguration>> {
  try {
    const { data: email_configuration, error } = await supabase
      .from('email_configuration')
      .select('*')
      .eq('action', action)
      .single();

    if (error) {
      return { errorCode: 1, data: null };
    } else {
      return { errorCode: 0, data: email_configuration };
    }
  } catch (error) {
    return { errorCode: 1, data: null };
  }
}

export default fetchEmailData;
