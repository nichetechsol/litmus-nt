import { NextRequest, NextResponse } from 'next/server';

import { checkLicensePlan } from '@/supabase/auth';
import { validateToken } from '@/utils/authentication/auth';

export async function POST(req: NextRequest) {
  try {
    // Extract the Authorization header from the request, with a fallback to an empty string
    const authHeader = req.headers.get('Authorization') ?? '';

    // Validate the token
    const validationResponse = await validateToken(authHeader);

    // Check the validation response using errorCode
    if (validationResponse.errorCode === 1) {
      return NextResponse.json(
        { errorCode: 1, message: validationResponse.message },
        { status: validationResponse.status },
      );
    }

    // Proceed with the original logic if token is valid
    const { user } = validationResponse; // Now you have the authenticated user
    if (user) {
      const { userId } = await req.json();

      const result = await checkLicensePlan(userId);

      if (result?.errorCode === 0) {
        return NextResponse.json(result);
      } else {
        return NextResponse.json(result);
      }
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 },
    );
  }
}
