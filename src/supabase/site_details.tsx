/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from './db';

interface SiteDetails {
  id: number;
  org_id: number;
  name: string;
  type_id: number;
  address1: string;
  address2?: string;
  city: string;
  pin_code: string;
  about_site?: string;
  status: string;
  country_id: number;
  state_id: number;
}
export interface SiteDetailsWithOwner {
  site: SiteDetails;
  id: number;
  org_id: number;
  name: string;
  type_id: number;
  address1: string;
  address2?: string;
  city: string;
  pin_code: string;
  about_site?: string;
  status: string;
  country_id: number;
  state_id: number;
}
interface User {
  id: number;
  site_id: number;
  user_id: number;
  role_id: number;
}

export interface Result<T> {
  errorCode: number;
  message?: string;
  data: T | null;
}

export interface SiteDetailsWithUsers {
  user_role_id: number;
  site: SiteDetails;
  users: User[];
  ownerNames: string[];
  country: string | null;
  state: string | null;
  type_name: string | null;
}

async function fetchSiteDetails(
  org_id: number,
  user_id: number,
): Promise<Result<SiteDetailsWithUsers[]>> {
  try {
    // Fetch site_id associated with the user
    const { data: userOrgs, error: userOrgError } = await supabase
      .from('site_users')
      .select('site_id')
      .eq('user_id', user_id);

    if (userOrgError) {
      throw userOrgError;
    }

    // Extract the site_ids from userOrgs
    const siteIds: any = userOrgs.map((site) => site.site_id);

    // Fetch site details and related data
    const { data: siteDetails, error } = await supabase
      .from('sites_detail')
      .select(
        `
        *,
        country:country_id (name),
        state:state_id (name),
        type:type_id (name),
        users:site_users (
          user_id,
          role_id,
          user:users (
            id,
            firstname,
            lastname,
            email
          )
        ),
        owners:site_users (
          user_id,
          role_id,
          user:users (
            id,
            firstname,
            email
          )
        )
      `,
      )
      .in('id', siteIds)
      .eq('org_id', org_id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    const siteDetailsWithUsers: any = siteDetails.map((site) => {
      const siteUsers = site.users || [];
      const siteOwners =
        site.owners.filter((owner: any) => owner.role_id === 1) || [];
      const ownerNames = siteOwners.map((owner: any) => owner.user.email);
      // Find the role of the logged-in user
      const loggedInUserRole = siteUsers.find(
        (user: any) => user.user_id === user_id,
      );

      return {
        site,
        user_role_id: loggedInUserRole ? loggedInUserRole.role_id : null,
        users: siteUsers.map((user: any) => ({
          // Including the logged-in user's role_id
          user_id: user.user_id,
          role_id: user.role_id,
          user: {
            id: user.user.id,
            firstname: user.user.firstname,
            lastname: user.user.lastname,
            email: user.user.email,
          },
        })),
        ownerNames,
        country: site?.country?.name ?? '',
        state: site?.state?.name ?? '',
        type_name: site?.type?.name ?? '',
      };
    });

    return {
      errorCode: 0,
      data: siteDetailsWithUsers,
    };
  } catch (error) {
    return {
      errorCode: 1,
      message: (error as Error).message,
      data: null,
    };
  }
}

async function fetchSiteSidebarList(
  searchQuery: string | null,
  org_id: number,
  user_id: number,
): Promise<Result<SiteDetailsWithOwner[]>> {
  try {
    // Fetch site_ids associated with the user
    const { data: userOrgs, error: userOrgError } = await supabase
      .from('site_users')
      .select('site_id')
      .eq('user_id', user_id);

    if (userOrgError) {
      return {
        errorCode: 1,
        message: 'No data found',
        data: null,
      };
    }

    // Extract the site_ids
    const siteIds = userOrgs.map((site) => site.site_id);

    // Fetch site details with names matching the search query, including owner details
    const { data: siteDetails, error } = await supabase
      .from('sites_detail')
      .select(
        `
        *,
        owners:site_users (
          user_id,
          role_id,
          user:users (
            id,
            firstname,
            email
          )
        )
      `,
      )
      .in('id', siteIds)
      .eq('org_id', org_id)
      .ilike('name', `%${searchQuery}%`)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Process the site details to include owner names
    const siteDetailsWithOwners = siteDetails.map((site) => {
      const siteOwners =
        site.owners.filter((owner: any) => owner.role_id === 1) || [];
      const ownerNames = siteOwners.map((owner: any) => owner.user.email);

      return {
        site,
        ownerNames,
        ...site,
      };
    });

    return {
      errorCode: 0,
      message: 'Site details fetched successfully',
      data: siteDetailsWithOwners,
    };
  } catch (error) {
    return {
      errorCode: 1,
      message: 'No data found',
      data: null,
    };
  }
}

export { fetchSiteDetails, fetchSiteSidebarList };
