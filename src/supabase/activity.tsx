/* eslint-disable @typescript-eslint/no-explicit-any */

import supabase from '@/supabase/db';

const valid_activity_types: string[] = [
  'create_org',
  'create_site',
  'add_user',
  'remove_user',
  'add_licence',
  'download_file',
];

interface LogActivityParams {
  org_id?: string;
  site_id?: string;
  user_id?: string;
  target_user_id?: string;
  target_user_role?: string;
  activity_type: string;
}

const logActivity = async ({
  org_id,
  site_id,
  user_id,
  target_user_id,
  target_user_role,
  activity_type,
}: LogActivityParams): Promise<string | any[]> => {
  if (
    (!org_id && !site_id && !user_id && !target_user_id && !target_user_role) ||
    !activity_type
  ) {
    return 'Invalid parameters';
  }

  if (!valid_activity_types.includes(activity_type)) {
    return 'invalid activity_type';
  }

  try {
    const { data, error } = await supabase
      .from('activities')
      .insert([
        {
          org_id,
          site_id,
          user_id,
          target_user_id,
          target_user_role: target_user_role,
          activity_type,
        },
      ])
      .select();

    if (error) {
      throw error;
    }
    return data;
  } catch (error: any) {
    return error;
  }
};

const getActivitiesByOrgId = async (orgId: string): Promise<any[] | null> => {
  try {
    const { data: activities, error } = await supabase
      .from('activities')
      .select('*')
      .eq('org_id', orgId);

    if (error) {
      throw error;
    }
    return activities;
  } catch (error: any) {
    return null;
  }
};

export { getActivitiesByOrgId, logActivity };
