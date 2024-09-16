import { NextRequest, NextResponse } from 'next/server';

import { Login } from '@/supabase/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const result = await Login(email, password);

    if (result?.errorCode === 0) {
      // Handle success response
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 },
    );
  }
}
