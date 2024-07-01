/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/supabase/db';
// import { number } from 'zod';

interface LogActivityParams {
  org_id?: number;
  site_id?: number;
  user_id?: number;
  target_user_id?: any;
  target_user_role?: any;
  activity_type?: string;
  details?: { filename: string };
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

const valid_activity_types: string[] = [
  'create_org',
  'create_site',
  'add_user',
  'remove_user',
  'add_licence',
  'download_file',
  'update_site',
];

const logActivity = async ({
  org_id,
  site_id,
  user_id,
  target_user_id,
  target_user_role,
  activity_type,
  details,
}: LogActivityParams): Promise<any> => {
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
          details,
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

const getActivitiesByOrgId = async ({
  orgId,
  start,
  end,
  limit,
}: GetOrgActivitiesParams): Promise<any> => {
  try {
    const {
      data: activities,
      count,
      error,
    } = await supabase
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
      .limit(limit);

    if (error) {
      throw error;
    }

    return { activities, total_count: count };
  } catch (error: any) {
    return null;
  }
};
const getActivitiesBySiteID = async ({
  siteID,
  start,
  end,
  limit,
}: GetSiteActivitiesParams): Promise<any> => {
  try {
    const {
      data: activities,
      count,
      error,
    } = await supabase
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
      .limit(limit);

    if (error) {
      throw error;
    }

    return { activities, total_count: count };
  } catch (error: any) {
    return null;
  }
};

// const getActivitiesByOrgId = async (orgId: number): Promise<any> => {
//   try {
//     const { data: activities, error } = await supabase
//       .from('activities')
//       .select(
//         `
//         activity_type,
//         activity_date,
//         details,
//         org_id (
//           name
//         ),
//         site_id (
//           name
//         ),
//         target_user_role (
//           name
//         ),
//         user_id (
//           email,
//           firstname,
//           lastname
//         ),
//         target_user_id (
//           email,
//           firstname,
//           lastname
//         )
//       `,
//       )
//       .eq('org_id', orgId)
//       .range(0, 9);

//     if (error) {
//       throw error;
//     }

//     return activities;
//   } catch (error: any) {
//     return null;
//   }
// };

// const getActivitiesBySiteID = async (siteID: number): Promise<any> => {
//   try {
//     const { data: activities, error } = await supabase
//       .from('activities')
//       .select(
//         `
//         activity_type,
//         activity_date,
//         details,
//         org_id (
//           name
//         ),
//         site_id (
//           name
//         ),
//         target_user_role (
//           name
//         ),
//         user_id (
//           email,
//           firstname,
//           lastname
//         ),
//         target_user_id (
//           email,
//           firstname,
//           lastname
//         )
//       `,
//       )
//       .eq('site_id', siteID);

//     if (error) {
//       throw error;
//     }

//     return activities;
//   } catch (error: any) {
//     return null;
//   }
// };

export { getActivitiesByOrgId, getActivitiesBySiteID, logActivity };
