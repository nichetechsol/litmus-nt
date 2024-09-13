import { NextRequest, NextResponse } from 'next/server';

import { AsureAuth } from '@/supabase/auth';

export async function POST(req: NextRequest) {
  try {
    const { provider } = await req.json();

    const result = await AsureAuth(provider);
    if (!provider) {
      return NextResponse.json(
        { error: 'Provider is required' },
        { status: 400 },
      );
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
