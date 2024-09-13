import { NextRequest, NextResponse } from 'next/server';

import { Login } from '@/supabase/auth';
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
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 },
    );
  }
}
