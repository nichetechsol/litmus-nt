/* eslint-disable @typescript-eslint/no-explicit-any */

import { supabase } from './db';

interface SiteDetail {
  id: number;
  name: string;
  country_id: number;
  // Add other fields if necessary
}

interface Country {
  id: number;
  name: string;
}

interface Result<T> {
  errorCode: number;
  data: T | null;
}

async function getLocationOfSites(data: {
  org_id: any;
}): Promise<Result<{ country: string; count: number }[]>> {
  try {
    const org_id = data.org_id;

    // Fetch site details
    const { data: sites_detail, error: sitesError } = await supabase
      .from('sites_detail')
      .select('*')
      .eq('org_id', org_id);

    if (sitesError) {
      return { errorCode: 1, data: null };
    }

    if (!sites_detail || sites_detail.length === 0) {
      return { errorCode: 0, data: [] };
    }

    const countryIds = sites_detail.map((site: SiteDetail) => site.country_id);

    // Fetch country names
    const { data: countries, error: countriesError } = await supabase
      .from('country')
      .select('*')
      .in('id', countryIds);

    if (countriesError) {
      return { errorCode: 1, data: null };
    }

    const countryMap = new Map<number, string>();
    countries.forEach((country: Country) => {
      countryMap.set(country.id, country.name);
    });

    const siteCountMap = new Map<string, number>();
    sites_detail.forEach((site: SiteDetail) => {
      const countryName = countryMap.get(site.country_id);
      if (countryName) {
        siteCountMap.set(countryName, (siteCountMap.get(countryName) || 0) + 1);
      }
    });

    const result = Array.from(siteCountMap, ([country, count]) => ({
      country,
      count,
    }));

    return { errorCode: 0, data: result };
  } catch (error) {
    return { errorCode: 1, data: null };
  }
}

export { getLocationOfSites };
