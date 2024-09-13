// src/utils/auth.ts (you can change the path based on your folder structure)

import supabase from '@/supabase/db';

export async function validateToken(authHeader: string) {
  // Check if Authorization header is provided and has a Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      errorCode: 1,
      message: 'Unauthorized: No token provided',
      status: 401,
    };
  }

  // Extract token from the Authorization header
  const token = authHeader.replace('Bearer ', '');

  // Validate the token with Supabase
  const { data, error } = await supabase.auth.getUser(token);
  const user = data?.user;

  if (error || !user) {
    return {
      errorCode: 1,
      message: 'Unauthorized: Invalid or expired token',
      status: 401,
    };
  }

  // Return the authenticated user if validation is successful
  return { errorCode: 0, user };
}
