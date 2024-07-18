/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import supabase from '@/supabase/db';
import { sendEmailFunction } from '@/supabase/email';
import fetchEmailData from '@/supabase/email_configuration';

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
  if (!orgId) {
    return 'Invalid parameters';
  }

  try {
    // Fetch entitlements package data
    const { data: entitlements_package, error: entitlementsError } =
      await supabase
        .from('entitlements_package')
        .select(
          `
        entitlements_name!inner(name),
        entitlements_values(value_text)
      `,
        )
        .in('entitlements_name.name', [
          'License Tier',
          'License Catalog',
          'License Plan',
          'Add-on Licenses',
        ])
        .eq('org_id', orgId)
        .returns<EntitlementPackage[]>();

    if (entitlementsError) {
      throw entitlementsError;
    }

    if (!entitlements_package || entitlements_package.length === 0) {
      return 'No entitlements_package found';
    }

    const entPkgData: Record<string, string> = entitlements_package.reduce(
      (acc, item) => {
        acc[item.entitlements_name.name] = item.entitlements_values.value_text;
        return acc;
      },
      {} as Record<string, string>,
    );

    // Extract entitlements values
    const entitlements_values = entitlements_package.map(
      (item) => item.entitlements_values.value_text,
    );

    // Fetch license types
    const { data: licence_type, error: licenseError } = await supabase
      .from('licence_type')
      .select('id, name, license_sku_name, type')
      .in('license_tier', entitlements_values)
      .in('license_plan', entitlements_values)
      .in('license_catalog', entitlements_values);

    if (licenseError) {
      throw licenseError;
    }

    let licence_addon_type: {
      id: any;
      name: any;
      license_sku_name: any;
      type: any;
    }[] = [];

    //Fetch Addons
    if (entPkgData['Add-on Licenses'] == 'TRUE') {
      const { data: addonType, error: licenseAddonError } = await supabase
        .from('licence_type')
        .select('id, name, license_sku_name, type')
        .in('license_tier', entitlements_values)
        .eq('type', 'addon')
        .in('license_catalog', entitlements_values);

      if (licenseAddonError) {
        throw licenseAddonError;
      }

      licence_addon_type = addonType;
    }

    // Combine license types and add-on types if applicable
    const allLicenses = [...licence_type, ...licence_addon_type];

    return allLicenses;
  } catch (error: any) {
    return null;
  }
};

// async function reqLicense (data:any):Promise<any>{
//   const userName: string = data.userName;
//   const orgName: string = data.org_name;
//   try{
//     const emailResult = await fetchEmailData('License_Request');
//     if (emailResult.errorCode !== 0) {
//       return {
//         errorCode: 1,
//         message: 'Error fetching email configuration.',
//         data: null,
//       };
//     }
//     const emailData = emailResult.data;

//     const to: string = emailData.To;
//     const subject: string = emailData.email_subject;
//     const heading: string = emailData.email_heading;
//     const contentTemplate: string = emailData.email_content;

//     const headingData = heading
//     .replace('{{User Name}}', userName)
//     .replace('{{Org Name}}', orgName);
//     const contentData = contentTemplate
//     .replace('{{User Name}}', userName)
//     .replace('{{Org Name}}', orgName);

//     // Send email
//     await sendEmailFunction(to, subject, headingData, contentData, data.token);

//     return {
//       errorCode: 0,
//       message: 'Organization deletion request sent successfully.',
//       data: null,
//     };

//   } catch (error) {
//     // Handle unexpected errors
//     return {
//       errorCode: 1,
//       message: 'Unexpected error',
//       data: null,
//     };
//   }
// }

async function reqLicense(data: any) {
  const userName: any = data.userName;
  const orgName: any = data.name;
  const siteName: any = data.siteName;
  const license_sku_name: any = data.license_sku_name;

  try {
    // Fetch email data for License_Request
    const email_data: any = await fetchEmailData('License_Request');
    const to = email_data.data.To; //here To is email_config table's To
    const subject = email_data.data.email_subject;
    const heading = email_data.data.email_heading;
    const content = email_data.data.email_content;

    const headingData = heading.replace('{{User Name}}', userName);
    const contentData = content
      .replace('{{User Name}}', userName)
      .replace('{{Site Name}}', siteName)
      .replace('{{Org Name}}', orgName)
      .replace('{{License SKU}}', license_sku_name);

    await sendEmailFunction(to, subject, headingData, contentData, data.token);

    // Fetch email data for License_Request_User
    const emailData: any = await fetchEmailData('License_Request_User');

    const toRequestUser = data.userName;
    const subjectRequestUser = emailData.data.email_subject;
    const headingRequestUser = emailData.data.email_heading;
    const contentRequestUser = emailData.data.email_content;

    const toData = toRequestUser.replace(
      '{{Target User EMail}}',
      toRequestUser,
    );
    const contentDataRequestUser = contentRequestUser
      .replace('{{Site Name}}', siteName)
      .replace('{{Org Name}}', orgName)
      .replace('{{License SKU}}', license_sku_name);

    await sendEmailFunction(
      toData,
      subjectRequestUser,
      headingRequestUser,
      contentDataRequestUser,
      data.token,
    );
    return {
      errorCode: 0,
      message: 'License request sent successfully.',
      data: null,
    };
  } catch (error) {
    return {
      errorCode: 1,
      message: 'Unexpected error',
      data: null,
    };
  }
}

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
const showReqLicenceButton = async ({
  siteID,
}: GetLicenceDataParams): Promise<boolean> => {
  if (!siteID) {
    return false;
  }

  try {
    const { data: entitlements_package, error: entitlementsError } =
      (await supabase
        .from('entitlements_package')
        .select(
          `
          entitlements_name!inner(name),
          entitlements_values(value_text)
        `,
        )
        .in('entitlements_name.name', [
          'License Tier',
          'License Catalog',
          'License Plan',
        ])
        .eq('site_id', siteID)) as {
        data: EntitlementPackage[] | null;
        error: any;
      };

    if (
      entitlementsError ||
      !entitlements_package ||
      entitlements_package.length === 0
    ) {
      return false;
    }

    return true;
  } catch (error: any) {
    return false;
  }
};

export {
  addLicence,
  getLicenceData,
  getSKUList,
  reqLicense,
  showReqLicenceButton,
};
