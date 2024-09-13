// import { number } from 'zod';
import { PostgrestError } from '@supabase/supabase-js';

import supabase from '@/supabase/db';

interface LogActivityParams {
  org_id?: number;
  site_id?: number;
  user_id?: number;
  target_user_id?: number;
  target_user_role?: number;
  activity_type?: string;
  details?: string;
}
interface GetActivitiesBySiteIDResponse {
  activities: Activity[];
  total_count: number;
}
interface Activity {
  activity_type?: string | null;
  activity_date?: string | null; // Use Date if your dates are in Date format
  details?: string | null;
  org_id?: {
    name: string | null;
  } | null;
  site_id?: {
    name: string | null;
  } | null;
  target_user_role?: {
    name?: string | null;
  } | null;
  user_id?: {
    email?: string | null;
    firstname?: string | null;
    lastname?: string | null;
  } | null;
  target_user_id: {
    email?: string | null;
    firstname?: string | null;
    lastname?: string | null;
  } | null;
}

interface GetOrgActivitiesParams {
  orgId: number;
  start: number;
  end: number;
  limit: number;
}
interface GetSiteActivitiesParams {
  siteID: number;
  start: number;
  end: number;
  limit: number;
}
// Define the structure of a single activity record
interface Activitylog {
  id?: number; // Assuming there's an auto-incrementing ID
  org_id?: number;
  site_id?: number;
  user_id?: number;
  target_user_id?: number;
  target_user_role?: number;
  activity_type?: string;
  details?: string;
  created_at?: string; // Or Date, depending on your database schema
}

// Define the response type for the logActivity function
interface LogActivityResponse {
  data: Activitylog[]; // Array of Activity records
  error: PostgrestError | null; // Supabase-specific error type or use Error if generic
}

const valid_activity_types: string[] = [
  'create_org',
  'create_site',
  'add_user_org',
  'add_user_site',
  'remove_user_org',
  'remove_user_site',
  'add_licence',
  'download_file',
  'update_site',
  'update_org',
  'remove_domain',
  'add_domain',
  'edit_org_description',
  'edit_site_description',
  'edit_site_type',
  'edit_site_name',
];

const logActivity = async ({
  org_id,
  site_id,
  user_id,
  target_user_id,
  target_user_role,
  activity_type,
  details,
}: LogActivityParams): Promise<
  LogActivityResponse | 'Invalid parameters' | 'Invalid activity_type' | null
> => {
  if (
    org_id === undefined &&
    site_id === undefined &&
    user_id === undefined &&
    target_user_id === undefined &&
    target_user_role === undefined &&
    activity_type === undefined &&
    details === undefined
  ) {
    return 'Invalid parameters';
  }
  if (
    activity_type === undefined ||
    !valid_activity_types.includes(activity_type)
  ) {
    return 'Invalid activity_type';
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
          details,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return { data: data || [], error: null };
  } catch (error) {
    return null;
  }
};

const getActivitiesByOrgId = async ({
  orgId,
  start,
  end,
  limit,
}: GetOrgActivitiesParams): Promise<GetActivitiesBySiteIDResponse | null> => {
  try {
    const { data, count, error } = await supabase
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
        { count: 'exact' },
      )
      .eq('org_id', orgId)
      .range(start, end)
      .limit(limit)
      .order('activity_date', { ascending: false });

    if (error) {
      throw error;
    }

    // Ensure data is in the expected format
    const activities =
      data?.map((item) => ({
        ...item,
        org_id: item.org_id.length > 0 ? item.org_id[0] : null,
        site_id: item.site_id.length > 0 ? item.site_id[0] : null,
        target_user_role:
          item.target_user_role.length > 0 ? item.target_user_role[0] : null,
        user_id: item.user_id.length > 0 ? item.user_id[0] : null,
        target_user_id:
          item.target_user_id.length > 0 ? item.target_user_id[0] : null,
      })) || [];

    return { activities, total_count: count || 0 };
  } catch (error) {
    return null;
  }
};

const getActivitiesBySiteID = async ({
  siteID,
  start,
  end,
  limit,
}: GetSiteActivitiesParams): Promise<GetActivitiesBySiteIDResponse | null> => {
  try {
    const { data, count, error } = await supabase
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
        { count: 'exact' },
      )
      .eq('site_id', siteID)
      .range(start, end)
      .limit(limit)
      .order('activity_date', { ascending: false });

    if (error) {
      throw error;
    }

    // Ensure data is in the expected format
    const activities =
      data?.map((item) => ({
        ...item,
        org_id: item.org_id.length > 0 ? item.org_id[0] : null,
        site_id: item.site_id.length > 0 ? item.site_id[0] : null,
        target_user_role:
          item.target_user_role.length > 0 ? item.target_user_role[0] : null,
        user_id: item.user_id.length > 0 ? item.user_id[0] : null,
        target_user_id:
          item.target_user_id.length > 0 ? item.target_user_id[0] : null,
      })) || [];

    return { activities, total_count: count || 0 };
  } catch (error) {
    return null;
  }
};

export { getActivitiesByOrgId, getActivitiesBySiteID, logActivity };
