/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-vars */

import supabase from '@/supabase/db';

interface Result<T> {
  errorCode: number;
  message?: any;
  data: T | null;
}
async function fetchEmailData(action: any): Promise<Result<any>> {
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
