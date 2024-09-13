import { NextResponse } from 'next/server';

import { countryList } from '@/supabase/country';

// In the API route
export async function GET(): Promise<NextResponse> {
  const result = await countryList();

  return NextResponse.json(result);
}
