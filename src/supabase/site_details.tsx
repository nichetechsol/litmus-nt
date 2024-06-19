/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from './db';

interface SiteDetails {
  id: any;
  org_id: any;
  name: string;
  type_id: any;
  address1: string;
  address2?: string;
  city: string;
  pin_code: string;
  about_site?: string;
  status: string;
  country_id: any;
  state_id: any;
}

interface User {
  id: any;
  site_id: any;
  user_id: any;
  role_id: any;
}

interface Result<T> {
  errorCode: number;
  message?: string;
  data: T | null;
}

interface SiteDetailsWithUsers {
  site: SiteDetails;
  users: User[];
  ownerNames: string[];
  country: string | null;
  state: string | null;
  type_name: string | null;
}

async function fetchSiteDetails(
  org_id: any,
  user_id: any,
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
    const siteId: any = userOrgs.map((site) => site.site_id);
    // Fetch organization details
    const { data: siteDetails, error } = await supabase
      .from('sites_detail')
      .select('*')
      .in('id', siteId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    const siteIds = siteDetails.map((site) => site.id);
    const countryIds = siteDetails.map((site) => site.country_id);
    const stateIds = siteDetails.map((site) => site.state_id);
    const typeIds = siteDetails.map((site) => site.type_id);

    // Fetch all related data in bulk
    const [
      { data: usersData, error: usersError },
      { data: countriesData, error: countriesError },
      { data: statesData, error: statesError },
      { data: typesData, error: typesError },
      { data: ownersData, error: ownersError },
    ] = await Promise.all([
      supabase
        .from('site_users')
        .select('*', { count: 'exact' })
        .in('site_id', siteIds),
      supabase.from('country').select('id, name').in('id', countryIds),
      supabase.from('state').select('id, name').in('id', stateIds),
      supabase.from('site_types').select('id, name').in('id', typeIds),
      supabase
        .from('site_users')
        .select('site_id, user_id')
        .in('site_id', siteIds)
        .eq('role_id', 1),
    ]);

    if (
      usersError ||
      countriesError ||
      statesError ||
      typesError ||
      ownersError
    ) {
      throw new Error(
        [usersError, countriesError, statesError, typesError, ownersError]
          .filter(Boolean)
          .map((err) => err?.message ?? 'Unknown error')
          .join(', '),
      );
    }

    // Fetch owner details if ownersData is not null
    let ownerDetails: { id: string; firstname: string }[] = [];
    if (ownersData) {
      const ownerUserIds = ownersData.map((owner) => owner.user_id);
      const { data: fetchedOwnerDetails, error: ownerDetailsError } =
        await supabase
          .from('users')
          .select('id, firstname')
          .in('id', ownerUserIds);

      if (ownerDetailsError) {
        throw ownerDetailsError;
      }

      ownerDetails = fetchedOwnerDetails ?? [];
    }

    const siteDetailsWithUsers: any = siteDetails.map((site) => {
      const siteUsers =
        usersData?.filter((user) => user.site_id === site.id) || [];
      const siteOwners =
        ownersData?.filter((owner) => owner.site_id === site.id) || [];
      const ownerNames = siteOwners
        .map(
          (owner) =>
            ownerDetails.find((user) => user.id === owner.user_id)?.firstname,
        )
        .filter(Boolean);
      const country =
        countriesData?.find((country) => country.id === site.country_id)
          ?.name || null;
      const state =
        statesData?.find((state) => state.id === site.state_id)?.name || null;
      const type_name =
        typesData?.find((type) => type.id === site.type_id)?.name || null;

      return {
        site,
        users: siteUsers,
        ownerNames,
        country,
        state,
        type_name,
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
  searchQuery: string,
  org_id: any,
): Promise<Result<SiteDetails[]>> {
  try {
    // Fetch site details with names matching the search query
    const { data: siteDetails, error } = await supabase
      .from('sites_detail')
      .select('*')
      .eq('org_id', org_id)
      .ilike('name', `%${searchQuery}%`);

    if (error) {
      return {
        errorCode: 1,
        message: 'Error fetching site details',
        data: null,
      };
    } else {
      return {
        errorCode: 0,
        message: 'Site details fetched successfully',
        data: siteDetails,
      };
    }
  } catch (error) {
    return {
      errorCode: 1,
      message: (error as Error).message,
      data: null,
    };
  }
}

export { fetchSiteDetails, fetchSiteSidebarList };
