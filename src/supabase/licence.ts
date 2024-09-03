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

const checkLimit = async (data: any): Promise<any> => {
  try {
    // Fetch entitlements package data (same as before)

    let requestButton = false;

    // Check if the license exceeds the allowed entitlement
    const license_exceed_allowed_entitlement: any =
      await findEntitlementValueId(
        data.orgId,
        data.license_exceed_allowed_entitlement,
      );
    if (license_exceed_allowed_entitlement === null) {
      requestButton = false;
    } else {
      if (license_exceed_allowed_entitlement.value_bool === true) {
        const license_limit_entitlement = await findEntitlementValueId(
          data.orgId,
          data.license_limit_entitlement,
        );
        const license_number_entitlement = await findEntitlementValueId(
          data.orgId,
          data.license_number_entitlement,
        );
        if (license_number_entitlement != null) {
          const value_entitlement =
            license_number_entitlement.value_number + data.increase_by;
          if (
            license_limit_entitlement != null &&
            license_number_entitlement != null
          ) {
            if (license_limit_entitlement.value_number > value_entitlement) {
              requestButton = true;
            } else {
              requestButton = false;
            }
          } else {
            requestButton = false;
          }
        } else {
          requestButton = false;
        }
      }
      if (license_exceed_allowed_entitlement.value_bool === false) {
        const license_limit_entitlement = await findEntitlementValueId(
          data.orgId,
          data.license_limit_entitlement,
        );
        const license_number_entitlement = await findEntitlementValueId(
          data.orgId,
          data.license_number_entitlement,
        );
        if (license_number_entitlement != null) {
          const value_entitlement =
            license_number_entitlement.value_number + data.increase_by;
          if (
            license_limit_entitlement != null &&
            license_number_entitlement != null
          ) {
            if (license_limit_entitlement.value_number > value_entitlement) {
              requestButton = true;
            } else {
              requestButton = false;
            }
          } else {
            requestButton = false;
          }
        } else {
          requestButton = false;
        }
      }
    }

    return {
      errorCode: 0,
      requestButton,
      message: 'Fetch license information',
    }; // Return the final array
  } catch (error) {
    return null;
  }
};

const getSKUList = async ({ orgId }: GetSKUParams): Promise<any> => {
  if (!orgId) {
    return 'Invalid parameters';
  }

  try {
    // Fetch entitlements package data (same as before)
    const { data: entitlements_package, error: entitlementsError } =
      await supabase
        .from('entitlements_package')
        .select(
          `
          entitlements_name!inner(name),
          entitlements_values(value_text, value_bool, value_number)
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

    // Create a dictionary of entitlements
    const entPkgData: Record<string, any> = entitlements_package.reduce(
      (acc, item: any) => {
        acc[item.entitlements_name.name] = {
          value_text: item.entitlements_values.value_text,
          value_bool: item.entitlements_values.value_bool,
          value_number: item.entitlements_values.value_number,
        };
        return acc;
      },
      {} as Record<string, any>,
    );

    // Extract relevant entitlement values (same as before)
    const license_tier_value =
      entPkgData['License Tier']?.value_text ??
      entPkgData['License Tier']?.value_bool ??
      entPkgData['License Tier']?.value_number;
    const license_plan_value =
      entPkgData['License Plan']?.value_text ??
      entPkgData['License Plan']?.value_bool ??
      entPkgData['License Plan']?.value_number;
    const license_catalog_value =
      entPkgData['License Catalog']?.value_text ??
      entPkgData['License Catalog']?.value_bool ??
      entPkgData['License Catalog']?.value_number;
    const licence_addon_value =
      entPkgData['Add-on Licenses']?.value_text ??
      entPkgData['Add-on Licenses']?.value_bool ??
      entPkgData['Add-on Licenses']?.value_number;

    // Initialize the final license list
    let allLicenses = [];

    // Fetch licenses for all types except 'addon'
    const { data: licenseTierPlanCatalog, error: licenseError } = await supabase
      .from('licence_type')
      .select('*')
      .eq('license_tier', license_tier_value)
      .eq('license_plan', license_plan_value)
      .eq('license_catalog', license_catalog_value)
      .neq('type', 'addon'); // Exclude 'addon' type

    if (licenseError) {
      throw licenseError;
    }

    allLicenses = licenseTierPlanCatalog;

    // Check if "Add-on Licenses" is TRUE
    if (licence_addon_value === true) {
      const { data: addonLicenses, error: addonLicenseError } = await supabase
        .from('licence_type')
        .select('*')
        .eq('license_tier', license_tier_value)
        .eq('type', 'addon')
        .eq('license_catalog', license_catalog_value);

      if (addonLicenseError) {
        throw addonLicenseError;
      }

      // Combine license types and add-on types if applicable
      allLicenses = [...allLicenses, ...addonLicenses];
    }

    // Array to hold the final licenses with the requestButton value
    const licensesWithRequestButton = [];

    // Iterate through all licenses and determine the requestButton value
    for (const license of allLicenses) {
      const exceedAllowedEntitlement =
        license.license_exceed_allowed_entitlement;
      const exceedLicenseLimitEntitlement = license.license_limit_entitlement;
      const exceedLicenseNumberEntitlement = license.license_number_entitlement;
      let requestButton = false; // Initialize the requestButton

      // Check if the license exceeds the allowed entitlement
      if (exceedAllowedEntitlement != null) {
        const license_exceed_allowed_entitlement: any =
          await findEntitlementValueId(orgId, exceedAllowedEntitlement);
        if (license_exceed_allowed_entitlement === null) {
          requestButton = false;
        } else {
          if (license_exceed_allowed_entitlement.value_bool === false) {
            const license_limit_entitlement = await findEntitlementValueId(
              orgId,
              exceedLicenseLimitEntitlement,
            );
            const license_number_entitlement = await findEntitlementValueId(
              orgId,
              exceedLicenseNumberEntitlement,
            );
            if (license_limit_entitlement && license_number_entitlement) {
              if (
                license_limit_entitlement.value_number <=
                license_number_entitlement.value_number
              ) {
                requestButton = true;
              } else {
                requestButton = false;
              }
            }
          }
          if (license_exceed_allowed_entitlement.value_bool === true) {
            requestButton = true;
          }
        }
      }
      if (exceedAllowedEntitlement === null) {
        requestButton = false;
      }

      // Push the license along with the requestButton value into the final array
      licensesWithRequestButton.push({
        ...license,
        requestButton,
      });
    }

    return {
      errorCode: 0,
      data: licensesWithRequestButton,
      message: 'Fetch license information',
    }; // Return the final array
  } catch (error) {
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
  entitlement: any,
): Promise<any> => {
  try {
    // Step 1: Find the `license_limit_entitlement` from the `license_type` table
    // const { data: licenseData, error: licenseError } = await supabase
    //   .from('licence_type')
    //   .select(columnName)
    //   .ilike('type', type)
    //   .ilike('license_tier', license_tier)
    //   .ilike('license_catalog', license_catalog)
    //   .ilike('license_plan', license_plan)
    //   .single();

    // if (licenseError) {
    //   return null;
    // }

    // const entitlementNameId = licenseData?.[columnName];
    // if (!entitlementNameId) {
    //   return null;
    // }

    // Step 2: Find the `entitlement_value_id` in the `entitlements_package` table based on `entitlement_name_id` and `org_id`
    const { data: entitlementData, error: entitlementError } = await supabase
      .from('entitlements_package')
      .select('entitlement_value_id(value_text, value_number, value_bool)')
      .eq('org_id', orgId)
      .eq('entitlement_name_id', entitlement)
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
async function requestQuotaMail(data: any): Promise<any> {
  // Fetch email configuration
  try {
    const emailResult = await fetchEmailData('Request_Quota');
    const userName: string = data.userName;
    const orgName: string = data.org_name;
    const licensePlanName: any = data.license_plan_name;

    const emailData = emailResult.data;
    const to: string = emailData.To;
    const subject: string = emailData.email_subject;
    const heading: string = emailData.email_heading;
    const contentTemplate: string = emailData.email_content;

    const headingData: string = heading
      .replace('{{Target User Name}}', userName)
      .replace('{{License Plan Name}}', licensePlanName);
    const contentData = contentTemplate
      .replace('{{Target User Name}}', userName)
      .replace('{{License Plan Name}}', licensePlanName)
      .replace('{{Org Name}}', orgName);

    // Send email
    await sendEmailFunction(to, subject, headingData, contentData, data.token);
    return {
      errorCode: 0,
      message: 'Request Quota mail sent successfully.',
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
async function requestMail(data: any): Promise<any> {
  try {
    const email_data: any = await fetchEmailData('Request_Entitlement');

    const userName: string = data.userName;
    const orgName: string = data.org_name;
    const entitlementName: string = data.entitlement_name;
    const to = email_data.data.To;
    const subject = email_data.data.email_subject;
    const heading = email_data.data.email_heading;
    const content = email_data.data.email_content;

    const headingUserData = heading.replace('{{Target User Name}}', userName);
    const contentUserData = content
      .replace('{{Target User Name}}', userName)
      .replace('{{Entitlement Name}}', entitlementName)
      .replace('{{Org Name}}', orgName);

    // Send email
    await sendEmailFunction(
      to,
      subject,
      headingUserData,
      contentUserData,
      data.token,
    );
    return {
      errorCode: 0,
      message: 'Request Entiltement mail sent successfully.',
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
// Define the asynchronous function
async function insertLicence(data: {
  licenseNumber: any;
  type: number;
  siteId: number;
  userId: number;
}) {
  try {
    // Perform the insertion operation
    const { data: insertLicense, error } = await supabase
      .from('licence')
      .insert([
        {
          licence_number: data.licenseNumber,
          type: data.type,
          site_id: data.siteId,
          created_by: data.userId,
        },
      ])
      .select(); // Use .select() if you want to return the inserted data

    // Check for errors
    if (error) {
      return {
        errorCode: 1,
        data: null,
        message: `License not inserted`,
      };
    }

    // Handle successful insertion
    return {
      errorCode: 0,
      message: 'License inserted successfully',
      data: data,
    }; // Optionally return the inserted data
  } catch (err) {
    return {
      errorCode: 1,
      message: `An unexpected error occurred`,
      data: null,
    };
  }
}
async function increaseValue(data: {
  licenseLimitEntitlement: number;
  orgId: any;
  increaseByValue: number;
}) {
  try {
    // Fetch the current entitlement value
    const { data: entitlementData, error: fetchError } = await supabase
      .from('entitlements_package')
      .select('entitlement_value_id')
      .eq('org_id', data.orgId)
      .eq('entitlement_name_id', data.licenseLimitEntitlement)
      .single();

    if (fetchError) {
      return null;
    }

    const entitlementValueId = entitlementData?.entitlement_value_id;

    if (!entitlementValueId) {
      return null;
    }

    // Fetch the current value from the entitlements_values table
    const { data: valueData, error: valueFetchError } = await supabase
      .from('entitlements_values')
      .select('value_number, value_bool, value_text')
      .eq('id', entitlementValueId)
      .single();

    if (valueFetchError) {
      return null;
    }

    const { value_number } = valueData;

    // Handle the different types
    if (value_number !== undefined) {
      // Increment numeric value
      const newValue = value_number + data.increaseByValue;
      const { error: updateError } = await supabase
        .from('entitlements_values')
        .update({ value_number: newValue })
        .eq('id', entitlementValueId);

      if (updateError) {
        return null;
      }

      return {
        errorCode: 0,
        message: 'Value updated successfully',
        data: { newValue },
      };
    }
  } catch (error: any) {
    return null;
  }
}
export {
  addLicence,
  checkLicensePlanEntitlement,
  checkLimit,
  findEntitlementValueId,
  getLicenceData,
  getSKUList,
  increaseValue,
  insertLicence,
  renderLicense,
  reqLicense,
  reqLicenseLimitMail,
  reqProductsforLitmus,
  requestMail,
  requestQuotaMail,
  showReqLicenceButton,
};
