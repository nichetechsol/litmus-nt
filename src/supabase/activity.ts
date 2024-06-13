/* eslint-disable @typescript-eslint/no-explicit-any */

import supabase from '@/supabase/db';

interface LogActivityParams {
  org_id?: number;
  site_id?: number;
  user_id?: number;
  target_user_id?: number;
  target_user_role?: number;
  activity_type?: string;
}

const valid_activity_types: string[] = [
  'create_org',
  'create_site',
  'add_user',
  'remove_user',
  'add_licence',
  'download_file',
];

const logActivity = async ({
  org_id,
  site_id,
  user_id,
  target_user_id,
  target_user_role,
  activity_type,
}: LogActivityParams): Promise<any> => {
  if (
    org_id === undefined &&
    site_id === undefined &&
    user_id === undefined &&
    target_user_id === undefined &&
    target_user_role === undefined &&
    activity_type === undefined
  ) {
    return 'Invalid parameters';
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (!valid_activity_types.includes(activity_type!)) {
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
          target_user_role,
          activity_type,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    return null;
  }
};

const getActivitiesByOrgId = async (orgId: number): Promise<any> => {
  try {
    const { data: activities, error } = await supabase
      .from('activities')
      .select(
        `
        activity_type,
        activity_date,
        details,
        org_id (
          name
        ),
        site_id (
          name
        ),
        target_user_role (
          name
        ),
        user_id (
          email,
          firstname,
          lastname
        ),
        target_user_id (
          email,
          firstname,
          lastname
        )
      `,
      )
      .eq('org_id', orgId)
      .range(0, 9);

    if (error) {
      throw error;
    }

    return activities;
  } catch (error: any) {
    return null;
  }
};

const getActivitiesBySiteID = async (siteID: number): Promise<any> => {
  try {
    const { data: activities, error } = await supabase
      .from('activities')
      .select(
        `
        activity_type,
        activity_date,
        details,
        org_id (
          name
        ),
        site_id (
          name
        ),
        target_user_role (
          name
        ),
        user_id (
          email,
          firstname,
          lastname
        ),
        target_user_id (
          email,
          firstname,
          lastname
        )
      `,
      )
      .eq('site_id', siteID);

    if (error) {
      throw error;
    }

    return activities;
  } catch (error: any) {
    return null;
  }
};

export { getActivitiesByOrgId, getActivitiesBySiteID, logActivity };
