import { NextRequest, NextResponse } from 'next/server';

import { checkLicensePlan } from '@/supabase/auth';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    const result = await checkLicensePlan(userId);

    if (result?.errorCode === 0) {
      // Handle success response
      return NextResponse.json(result);
    } else {
      // return NextResponse.json(
      //   { success: false, message: result.message },
      //   { status: 400 },
      // );
      return NextResponse.json(result);
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 },
    );
  }
}
