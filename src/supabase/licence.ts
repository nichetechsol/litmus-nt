/* eslint-disable @typescript-eslint/no-explicit-any */

import supabase from '@/supabase/db';

interface GetSKUParams {
  orgId: number;
}

interface GetLicenceDataParams {
  siteID: number;
}

interface EntitlementName {
  name: string;
}

interface EntitlementValue {
  value_text: string;
}

interface EntitlementPackage {
  entitlements_name: EntitlementName;
  entitlements_values: EntitlementValue;
}

interface AddLicenceParams {
  siteId: number;
  licence_number: string;
  licence_name_id: number;
  expiry: Date;
  user_id: number;
}

const getSKUList = async ({ orgId }: GetSKUParams): Promise<any> => {
  if (orgId === undefined) {
    return 'Invalid parameters';
  }

  try {
    // Fetch entitlements and license data in a single operation
    const { data: entitlements_package, error: entitlementsError } =
      await supabase
        .from('entitlements_package')
        .select(
          `
        entitlements_name!inner(name),
        entitlements_values(value_text)
      `,
        )
        .in('entitlements_name.name', ['License Tier', 'License Catalog'])
        .eq('org_id', orgId)
        .returns<EntitlementPackage[]>();

    if (entitlementsError) {
      throw entitlementsError;
    }

    if (!entitlements_package) {
      return 'No entitlements_package found';
    }

    // Extract entitlements values
    const entitlements_values = entitlements_package.map(
      (e) => e.entitlements_values.value_text,
    );

    // Fetch license types
    const { data: licence_type, error: licenseError } = await supabase
      .from('licence_type')
      .select('id, name, license_sku_name, type')
      .in('license_tier', entitlements_values)
      .in('license_catalog', entitlements_values);

    if (licenseError) {
      throw licenseError;
    }

    return licence_type;
  } catch (error: any) {
    return null;
  }
};
const addLicence = async ({
  user_id,
  expiry,
  licence_name_id,
  licence_number,
  siteId,
}: AddLicenceParams): Promise<any> => {
  if (
    user_id === undefined ||
    expiry === undefined ||
    licence_name_id === undefined ||
    licence_number === undefined ||
    siteId === undefined
  ) {
    return 'Invalid parameters';
  }

  try {
    // Fetch entitlements and license data in a single operation
    const { data, error } = await supabase
      .from('licence')
      .insert([
        {
          created_by: user_id,
          expiry: expiry,
          type: licence_name_id,
          licence_number: licence_number,
          site_id: siteId,
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

const getLicenceData = async ({
  siteID,
}: GetLicenceDataParams): Promise<any> => {
  if (siteID === undefined) {
    return 'Invalid parameters';
  }

  try {
    // Fetch entitlements and license data in a single operation
    const { data: licences, error: licencesError } = await supabase
      .from('licence')
      .select(
        `
          *,
        type!inner(name),
        created_by!inner(email,firstname,lastname)
      `,
      )
      .eq('site_id', siteID);
    // .returns<EntitlementPackage[]>();

    if (licencesError) {
      throw licencesError;
    }

    if (!licences) {
      return 'No entitlements_package found';
    }

    return licences;
  } catch (error: any) {
    return null;
  }
};

export { addLicence, getLicenceData, getSKUList };
