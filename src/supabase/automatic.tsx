/* eslint-disable @typescript-eslint/no-explicit-any */
import { orgDefaultEntitlement } from '@/supabase/org_details';
import { processEntitlements } from '@/supabase/site_details_crud';

import { supabase } from './db';
// async function automaticallyCreateOrganization(
//   organization_name: any,
//   type: any,
//   userId: any,
//   email: any,
// ): Promise<any> {
//   const userEmailDomain = email.split('@')[1];

//   //type to type_id
//   let type_id: any;
//   if (type == 'end_user') {
//     type_id = 1;
//   }
//   if (type == 'oem') {
//     type_id = 2;
//   }
//   if (type == 'partner') {
//     type_id = 3;
//   }

//   // Fetch the known public domains from the table for all normalized domains
//   const { data: existingDomain, error: existingDomainerror } = await supabase
//     .from('known_public_domains')
//     .select('domain_name')
//     .eq('domain_name', userEmailDomain);
//   let isBusinessAccount = false;
//   if (existingDomain && existingDomain.length > 0) {
//     isBusinessAccount = false;
//   } else {
//     isBusinessAccount = true;
//   }

//   //check organization exists or not exist
//   let orgId = null;
//   const { data: orgCheckData, error: orgCheckError } = await supabase
//     .from('org_details')
//     .select('id')
//     .eq('name', organization_name);
//   if (orgCheckData && orgCheckData.length > 0) {
//     orgId = orgCheckData[0].id;
//   } else {
//     const { data: retentionData, error: retentionError } = await supabase
//       .from('general_settings')
//       .select('*')
//       .eq('setting_name', 'org_retention');
//     let retValue = 7;
//     if (retentionData && retentionData.length > 0) {
//       retValue = parseInt(retentionData[0].value_text);
//     }
//     // Insert organization details
//     const { data: insertOrg, error: insertOrgError } = await supabase
//       .from('org_details')
//       .insert([
//         {
//           name: organization_name,
//           type_id: type_id,
//           status: 'Y',
//           retention_setting: 0, // Default value; will update after fetching settings
//         },
//       ])
//       .select();

//     if (insertOrg && insertOrg.length > 0) {
//       orgId = insertOrg[0].id;
//     }
//     // Normalize domains to ensure all entries are domains
//     await orgDefaultEntitlement(isBusinessAccount, orgId);

//     //in domains table check domain_name  exists
//     let domainId: any;
//     const { data: existingDomains, error: fetchError } = await supabase
//       .from('domains')
//       .select('id, name')
//       .eq('name', userEmailDomain);

//     if (existingDomains && existingDomains.length > 0) {
//       domainId = existingDomains[0].id;
//     } else {
//       const { data: insertedDomains, error: insertError } = await supabase
//         .from('domains')
//         .insert(userEmailDomain)
//         .select('id, name');
//       if (insertedDomains && insertedDomains.length > 0) {
//         domainId = insertedDomains[0].id;
//       }
//     }
//     const { data: existingOrgDomain, error: existingOrgDomainError } =
//       await supabase
//         .from('org_domains')
//         .select('*')
//         .eq('org_id', orgId)
//         .eq('domain_id', domainId);

//     if (!existingOrgDomain) {
//       const { data: insertOrgDomain, error: errorOrgDomain } = await supabase
//         .from('org_domains')
//         .insert([{ org_id: orgId, domain_id: domainId }])
//         .select();
//     }
//     // Update retention setting after fetching
//   }
//   //check existing user
//   const { data: existingUser, error: existingUserError } = await supabase
//     .from('org_users')
//     .select('id')
//     .eq('user_id', userId)
//     .eq('org_id', orgId);

//   if (!existingUser) {
//     // Insert organization user
//     const { data: addUserOrg, error: addUserOrgDomain } = await supabase
//       .from('org_users')
//       .insert([
//         {
//           user_id: userId,
//           role_id: 1,
//           org_id: orgId,
//         },
//       ])
//       .select();
//   }
//   return {
//     errorCode: 0,
//     message: 'Automatically organization created sucessfully',
//     orgId: orgId,
//   };

//   // Insert org_domain
// }
async function automaticallyCreateOrganization(
  organization_name: any,
  type: any,
  userId: any,
  email: any,
): Promise<any> {
  const userEmailDomain = email.split('@')[1];

  // Map type to type_id
  let type_id: any;
  switch (type) {
    case 'end_user':
      type_id = 1;
      break;
    case 'oem':
      type_id = 2;
      break;
    case 'partner':
      type_id = 3;
      break;
    default:
      type_id = null;
  }

  // Fetch known public domains to check if it's a business account
  const { data: existingDomain } = await supabase
    .from('known_public_domains')
    .select('domain_name')
    .eq('domain_name', userEmailDomain);

  const isBusinessAccount = !existingDomain || existingDomain.length === 0;

  // Check if the organization already exists
  let orgId = null;
  const { data: orgCheckData } = await supabase
    .from('org_details')
    .select('id')
    .eq('name', organization_name);

  if (orgCheckData && orgCheckData.length > 0) {
    orgId = orgCheckData[0].id;
  } else {
    // Fetch organization retention setting
    const { data: retentionData } = await supabase
      .from('general_settings')
      .select('*')
      .eq('setting_name', 'org_retention');

    const retValue =
      retentionData && retentionData.length > 0
        ? parseInt(retentionData[0].value_text)
        : 7;

    // Insert organization details
    const { data: insertOrg } = await supabase
      .from('org_details')
      .insert([
        {
          name: organization_name,
          type_id: type_id,
          status: 'Y',
          retention_setting: retValue, // Update retention setting
        },
      ])
      .select();

    if (insertOrg && insertOrg.length > 0) {
      orgId = insertOrg[0].id;
    }

    // Apply default entitlements based on business account status
    await orgDefaultEntitlement(isBusinessAccount, orgId);
  }

  // Check if the domain exists in the domains table
  let domainId: any;
  const { data: existingDomains } = await supabase
    .from('domains')
    .select('id, name')
    .eq('name', userEmailDomain);

  if (existingDomains && existingDomains.length > 0) {
    domainId = existingDomains[0].id;
  } else {
    const { data: insertedDomains } = await supabase
      .from('domains')
      .insert([{ name: userEmailDomain }])
      .select('id, name');

    if (insertedDomains && insertedDomains.length > 0) {
      domainId = insertedDomains[0].id;
    }
  }

  // Check if org_domain already exists
  const { data: existingOrgDomain } = await supabase
    .from('org_domains')
    .select('*')
    .eq('org_id', orgId)
    .eq('domain_id', domainId);

  if (!existingOrgDomain || existingOrgDomain.length === 0) {
    await supabase
      .from('org_domains')
      .insert([{ org_id: orgId, domain_id: domainId }])
      .select();
  }

  // Check if the user is already associated with the organization
  const { data: existingUser } = await supabase
    .from('org_users')
    .select('id')
    .eq('user_id', userId)
    .eq('org_id', orgId);

  if (!existingUser || existingUser.length === 0) {
    await supabase
      .from('org_users')
      .insert([
        {
          user_id: userId,
          role_id: 1, // Assuming role_id 1 is the default role
          org_id: orgId,
        },
      ])
      .select();
  }

  return {
    errorCode: 0,
    message: 'Organization automatically created successfully',
    orgId: orgId,
  };
}

// async function automaticeCreateSite(
//   orgId: any,
//   siteName: any,
//   stateName: any,
//   address: any,
//   pin_code: any,
//   cityName: any,
//   email: any,
//   userId: any,
// ): Promise<any> {
//   //find sit exists and not then insert it
//   let site_id: any;
//   const { data: existingSite, error: existingSiteError } = await supabase
//     .from('sites_detail')
//     .select('id')
//     .eq('name', siteName)
//     .eq('org_id', orgId);
//   if (existingSite && existingSite.length > 0) {
//     site_id = existingSite[0].id;
//   } else {
//     const { data: defaultSiteTypeData, error: defaultSiteTypeError } =
//       await supabase
//         .from('general_settings')
//         .select('value_text')
//         .eq('setting_name', 'default_site_type');
//     let defaultSiteTypeId = 1;
//     if (defaultSiteTypeData && defaultSiteTypeData.length > 0) {
//       const defaultSiteType: any = defaultSiteTypeData[0].value_text;
//       // Fetch the corresponding ID for the default site type
//       const { data: siteTypeData, error: siteTypeError } = await supabase
//         .from('site_types')
//         .select('id')
//         .eq('name', defaultSiteType);
//       if (siteTypeData && siteTypeData.length > 0) {
//         defaultSiteTypeId = siteTypeData[0].id;
//       }
//     }

//     // Fetch the state ID based on state name
//     let stateId = null;
//     let countryId = null;
//     const { data: stateData, error: stateError } = await supabase
//       .from('state')
//       .select('id,country_id')
//       .ilike('name', stateName);

//     if (stateData && stateData.length > 0) {
//       // return { errorCode: 1, message: 'State not found', data: null };
//       stateId = stateData[0].id;
//       countryId = stateData[0].country_id;
//     }
//     const { data: siteInsertData, error } = await supabase
//       .from('sites_detail')
//       .insert([
//         {
//           name: siteName,
//           type_id: defaultSiteTypeId,
//           org_id: orgId,
//           address: address,
//           city: cityName,
//           pin_code: pin_code,
//           status: 'Y',
//           country_id: countryId,
//           state_id: stateId,
//         },
//       ])
//       .select();
//     if (siteInsertData && siteInsertData.length > 0) {
//       site_id = siteInsertData[0].id;
//     }
//     await processEntitlements(orgId, site_id);
//     const { data: existingUser, error: existingUserError } = await supabase
//       .from('site_users')
//       .select('*')
//       .eq('site_id', site_id)
//       .eq('user_id', userId);
//     if (!existingUser) {
//       const { data: newUserSite, error: userInsertError } = await supabase
//         .from('site_users')
//         .insert([
//           {
//             site_id: site_id,
//             user_id: userId,
//             role_id: 1, // Owner role
//           },
//         ]);
//     }

//     return {
//       errorCode: 0,
//       message: 'Automatically site created sucessfully',
//       siteId: site_id,
//     };
//   }
// }
async function automaticeCreateSite(
  orgId: any,
  siteName: any,
  stateName: any,
  address: any,
  pin_code: any,
  cityName: any,
  email: any,
  userId: any,
): Promise<any> {
  // Check if the site already exists
  let site_id: any;
  const { data: existingSite } = await supabase
    .from('sites_detail')
    .select('id')
    .eq('name', siteName)
    .eq('org_id', orgId);

  if (existingSite && existingSite.length > 0) {
    site_id = existingSite[0].id;
  } else {
    // Fetch default site type ID
    let defaultSiteTypeId = 1;
    const { data: defaultSiteTypeData } = await supabase
      .from('general_settings')
      .select('value_text')
      .eq('setting_name', 'default_site_type');

    if (defaultSiteTypeData && defaultSiteTypeData.length > 0) {
      const defaultSiteType: any = defaultSiteTypeData[0].value_text;
      const { data: siteTypeData } = await supabase
        .from('site_types')
        .select('id')
        .eq('name', defaultSiteType);
      if (siteTypeData && siteTypeData.length > 0) {
        defaultSiteTypeId = siteTypeData[0].id;
      }
    }

    // Fetch state ID based on state name
    let stateId = null;
    let countryId = null;
    const { data: stateData } = await supabase
      .from('state')
      .select('id, country_id')
      .ilike('name', stateName);

    if (stateData && stateData.length > 0) {
      stateId = stateData[0].id;
      countryId = stateData[0].country_id;
    }

    // Insert the site details
    const { data: siteInsertData } = await supabase
      .from('sites_detail')
      .insert([
        {
          name: siteName,
          type_id: defaultSiteTypeId,
          org_id: orgId,
          address1: address,
          city: cityName,
          pin_code: pin_code,
          status: 'Y',
          country_id: countryId,
          state_id: stateId,
        },
      ])
      .select();

    if (siteInsertData && siteInsertData.length > 0) {
      site_id = siteInsertData[0].id;
    }

    // Process entitlements after site creation
    await processEntitlements(orgId, site_id);
  }

  // Check if the user is already associated with the site
  const { data: existingUser } = await supabase
    .from('site_users')
    .select('*')
    .eq('site_id', site_id)
    .eq('user_id', userId);

  if (!existingUser || existingUser.length === 0) {
    // Insert the user into the site_users table
    await supabase.from('site_users').insert([
      {
        site_id: site_id,
        user_id: userId,
        role_id: 1, // Owner role
      },
    ]);
  }

  return {
    errorCode: 0,
    message: 'Site automatically created successfully',
    siteId: site_id,
  };
}

export { automaticallyCreateOrganization, automaticeCreateSite };
