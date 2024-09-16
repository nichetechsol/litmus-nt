import { NextRequest, NextResponse } from 'next/server';

import { deleteDomains } from '@/supabase/org_details';
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

    const { user } = validationResponse; // Now you have the authenticated user
    if (user) {
      const { data } = await req.json();

      const result = await deleteDomains(data);
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
