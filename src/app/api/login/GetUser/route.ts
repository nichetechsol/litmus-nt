import { NextResponse } from 'next/server';

import { GetUser } from '@/supabase/auth';

export async function POST() {
  try {
    const result = await GetUser();

    if (result?.errorCode === 0) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result);
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 },
    );
  }
}
