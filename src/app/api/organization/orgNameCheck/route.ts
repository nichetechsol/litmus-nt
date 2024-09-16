import { NextRequest, NextResponse } from 'next/server';

import { orgNameCheck } from '@/supabase/org_details';
import { validateToken } from '@/utils/authentication/auth';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization') ?? '';
    const validationResponse = await validateToken(authHeader);

    if (validationResponse.errorCode === 1) {
      return NextResponse.json(
        { errorCode: 1, message: validationResponse.message },
        { status: validationResponse.status },
      );
    }

    // Proceed with the original logic if token is valid
    const { user } = validationResponse; // Now you have the authenticated user
    if (user) {
      const { name, org_id } = await req.json();

      const result = await orgNameCheck(name, org_id);

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
