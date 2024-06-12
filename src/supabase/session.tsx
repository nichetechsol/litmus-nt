/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/supabase/db';

supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    saveSession(session);
  } else if (event === 'SIGNED_OUT') {
    clearSession();
  }
});

const saveSession = (session: any) => {
  if (session) {
    localStorage.setItem(
      'sb-emsjiuztcinhapaurcrl-auth-token',
      JSON.stringify(session),
    );
  } else {
    localStorage.removeItem('sb-emsjiuztcinhapaurcrl-auth-token');
  }
};

const clearSession = () => {
  localStorage.removeItem('sb-emsjiuztcinhapaurcrl-auth-token');
};
export const refreshToken = async () => {
  const { data, error } = await supabase.auth.refreshSession();
  if (error) {
    // Handle token refresh error (e.g., redirect to login)
  } else {
    saveSession(data.session);
  }
};
