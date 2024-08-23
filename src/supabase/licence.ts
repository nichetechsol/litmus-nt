/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import supabase from '@/supabase/db';
import { sendEmailFunction } from '@/supabase/email';
import fetchEmailData from '@/supabase/email_configuration';

interface GetSKUParams {
  orgId: number;
}

interface GetLicenceDataParams {
  orgID: number;
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
async function reqProductsforLitmus(data: any) {
  const userName: any = data.userName;
  const orgName: any = data.name;
  const token: any = data.token;

  try {
    // Fetch email data for License_Request
    const email_data: any = await fetchEmailData('Request_for_Trial');
    const to = email_data.data.To; //here To is email_config table's To
    const subject = email_data.data.email_subject;
    const heading = email_data.data.email_heading;
    const content = email_data.data.email_content;

    const headingData = heading.replace('{{Target User Name}}', userName);
    const contentData = content
      .replace('{{Target User Name}}', userName)
      .replace('{{Org Name}}', orgName);

    await sendEmailFunction(to, subject, headingData, contentData, data.token);

    return {
      errorCode: 0,
      message: 'Products request sent successfully.',
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
  orgID,
}: GetLicenceDataParams): Promise<any> => {
  if (orgID === undefined) {
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
      .eq('org_id', orgID);
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
  orgID,
}: GetLicenceDataParams): Promise<boolean> => {
  if (!orgID) {
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
        .eq('org_id', orgID)) as {
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
//for license limit_exceed_entitlements
const findEntitlementValueId = async (
  orgId: number,
  type: string,
  license_tier: string,
  license_catalog: string,
  license_plan: string,
  columnName: any,
): Promise<any> => {
  try {
    // Step 1: Find the `license_limit_entitlement` from the `license_type` table
    const { data: licenseData, error: licenseError } = await supabase
      .from('licence_type')
      .select(columnName)
      .ilike('type', type)
      .ilike('license_tier', license_tier)
      .ilike('license_catalog', license_catalog)
      .ilike('license_plan', license_plan)
      .single();

    if (licenseError) {
      return null;
    }

    const entitlementNameId = licenseData?.[columnName];
    if (!entitlementNameId) {
      return null;
    }

    // Step 2: Find the `entitlement_value_id` in the `entitlements_package` table based on `entitlement_name_id` and `org_id`
    const { data: entitlementData, error: entitlementError } = await supabase
      .from('entitlements_package')
      .select('entitlement_value_id(value_text, value_number, value_bool)')
      .eq('org_id', orgId)
      .eq('entitlement_name_id', entitlementNameId)
      .single();

    if (entitlementError) {
      return null;
    }

    return entitlementData?.entitlement_value_id || null;
  } catch (error: any) {
    return null;
  }
};
//request entitlement button
const checkLicensePlanEntitlement = async (
  orgId: number,
  role_id: any,
): Promise<any> => {
  try {
    // Check if the userRole is 1 or 2
    if (role_id !== 1 && role_id !== 2) {
      // If the user role is not 1 or 2, return false
      return {
        errorCode: 0,
        reqEntitlementButton: false,
      };
    }
    const { data, error } = await supabase
      .from('entitlements_package')
      .select('entitlement_value_id')
      .eq('org_id', orgId)
      .eq('entitlement_name_id', 14) // 14 corresponds to "License Plan"
      .single();

    if (error || !data) {
      // If there's an error or no data is returned, return false
      return {
        errorCode: 1,
        reqEntitlementButton: false,
      };
    }

    // Check if data exists and if entitlement_value_id is present
    const reqEntitlementButton = data?.entitlement_value_id !== undefined;

    return {
      errorCode: 0,
      reqEntitlementButton,
    };
  } catch (err) {
    return {
      errorCode: 1,
      reqEntitlementButton: false,
    };
  }
};
//to render the license plans and entitlement
async function renderLicense(orgId: number) {
  try {
    // Query to check if the organization has specific entitlements
    const { data: entitlements, error: entitlementsError } = await supabase
      .from('entitlements_package')
      .select(
        `
        entitlement_name_id,
        entitlement_value_id,
        entitlements_name!inner(name),
        entitlements_values(value_text, value_number, value_bool)
      `,
      )
      .eq('org_id', orgId)
      .in('entitlements_name.name', [
        'License Plan',
        'Litmus UNS',
        'API Portal Access',
      ]);

    // Handle possible query error
    if (entitlementsError) {
      return {
        errorCode: 1,
        message: 'Error fetching entitlements',
        data: null,
      };
    }

    if (!entitlements || entitlements.length === 0) {
      return {
        errorCode: 2,
        message: 'No entitlements found for the organization',
        data: null,
      };
    }

    let availablePlans: any = [];
    let litmusUNS: any = false;
    let apiProtalAcess: any = false;
    // Check if the organization has a specific "License Plan" entitlement
    const licensePlan: any = entitlements.find(
      (entitlement: any) =>
        entitlement.entitlements_name.name == 'License Plan',
    );

    if (licensePlan != null) {
      switch (licensePlan.entitlements_values.value_text) {
        case 'trial':
          availablePlans = ['Foundation', 'Growth', 'Scale'];
          break;
        case 'foundation':
          availablePlans = ['Growth', 'Scale'];
          break;
        case 'foundation plus':
          availablePlans = ['Growth', 'Scale'];
          break;
        case 'growth':
          availablePlans = ['Foundation', 'Scale'];
          break;
        case 'scale':
          availablePlans = ['Foundation', 'Growth'];
          break;
        default:
          availablePlans = [];
      }
    }

    // Check for "Litmus UNS" entitlement
    const litmusUNSData = entitlements.find(
      (entitlement: any) =>
        entitlement.entitlements_name.name == 'Litmus UNS' &&
        entitlement.entitlements_values.value_bool == true,
    );

    if (!litmusUNSData) {
      litmusUNS = false;
    } else {
      litmusUNS = true;
    }
    const apiProtalAcessData = entitlements.find(
      (entitlement: any) =>
        entitlement.entitlements_name.name == 'API Portal Access' &&
        entitlement.entitlements_values.value_bool == true,
    );

    if (!apiProtalAcessData) {
      apiProtalAcess = false;
    } else {
      apiProtalAcess = true;
    }
    return {
      errorCode: 0,
      message: 'Fetch Plan Successfully',
      data: {
        availablePlans,
        litmusUNS,
        apiProtalAcess,
      },
    };
  } catch (error) {
    return {
      errorCode: 1,
      message: `An unexpected error occurred: ${error}`,
      data: null,
    };
  }
}
async function reqLicenseLimitMail(data: any): Promise<any> {
  // Fetch email configuration
  try {
    const emailResult = await fetchEmailData('Add_License_Limit_Exceed_Litmus');
    const userName: string = data.userName;
    const orgName: string = data.org_name;
    const siteName: string = data.site_name;
    const emailData = emailResult.data;
    const to: string = emailData.To;
    const subject: string = emailData.email_subject;
    const heading: string = emailData.email_heading;
    const contentTemplate: string = emailData.email_content;

    const contentData = contentTemplate
      .replace('{{User Name}}', userName)
      .replace('{{Site Name}}', siteName)
      .replace('{{Org Name}}', orgName);

    // Send email
    await sendEmailFunction(to, subject, heading, contentData, data.token);

    const email_data: any = await fetchEmailData(
      'Add_License_Limit_Exceed_User ',
    );
    const toUser = data.userName;
    const subjectUser = email_data.data.email_subject;
    const headingUser = email_data.data.email_heading;
    const contentUser = email_data.data.email_content;
    const toData = toUser.replace('{{Target User EMail}}', toUser);
    const contentUserData = contentUser
      .replace('{{Org Name}}', orgName)
      .replace('{{Site Name}}', siteName);

    // Send email
    await sendEmailFunction(
      toData,
      subjectUser,
      headingUser,
      contentUserData,
      data.token,
    );
    return {
      errorCode: 0,
      message: 'License Limit request sent successfully.',
      data: null,
    };
  } catch (error) {
    // Handle unexpected errors
    return {
      errorCode: 1,
      message: 'Unexpected error',
      data: null,
    };
  }
}
export {
  addLicence,
  checkLicensePlanEntitlement,
  findEntitlementValueId,
  getLicenceData,
  getSKUList,
  renderLicense,
  reqLicense,
  reqLicenseLimitMail,
  reqProductsforLitmus,
  showReqLicenceButton,
};
