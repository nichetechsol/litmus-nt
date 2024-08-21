/* eslint-disable @typescript-eslint/no-explicit-any */
import { logActivity } from '@/supabase/activity';
import { sendEmailFunction } from '@/supabase/email';
import fetchEmailData from '@/supabase/email_configuration';
import { orgDefaultEntitlement } from '@/supabase/org_details';
import { processEntitlements } from '@/supabase/site_details_crud';

import { supabase } from './db';

async function automaticallyCreateOrganization(
  organization_name: any,
  type: any,
  userId: any,
  email: any,
  token: any,
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
        ? parseInt(retentionData[0].value_number)
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
    // Send emails asynchronously
    if (orgId != null) {
      await orgDefaultEntitlement(isBusinessAccount, orgId);

      const emailPromise = (async () => {
        const emailData = await fetchEmailData(
          type_id === 1 ? 'Add_Org_EndUser' : 'Add_Org_OEM_Partner',
        );
        const to = emailData.data.To;
        const subject = emailData.data.email_subject.replace(
          '{{Org Name}}',
          organization_name,
        );
        const heading = emailData.data.email_heading.replace(
          '{{Org Name}}',
          organization_name,
        );
        const content = emailData.data.email_content
          .replace('{{User Name}}', email)
          .replace('{{Org Name}}', organization_name)
          .replace(/{{Org Type}}/g, type || '');

        sendEmailFunction(to, subject, heading, content, token);
      })();

      // Log activity asynchronously
      const logPromise = logActivity({
        org_id: orgId,
        user_id: userId,
        activity_type: 'create_org',
      });

      // Wait for email sending and logging to complete
      await Promise.all([emailPromise, logPromise]);
    }
  }

  // Check if the user is already associated with the organization
  if (orgId != null) {
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
  }

  return {
    errorCode: 0,
    message: 'Organization automatically created successfully',
    orgId: orgId,
  };
}

async function automaticeCreateSite(
  orgId: any,
  siteName: any,
  stateName: any,
  address: any,
  pin_code: any,
  cityName: any,
  email: any,
  userId: any,
  token: any,
  organization_name: any,
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
    await logActivity({
      org_id: orgId,
      site_id: site_id,
      user_id: userId,
      activity_type: 'create_site',
    });
    const userName: any = email;
    const site_name: any = siteName;
    const orgName: any = organization_name;
    const email_data: any = await fetchEmailData('Add_Site_Limit_Not_Exceed');
    const to = email_data.data.To;
    const subject = email_data.data.email_subject;
    const heading = email_data.data.email_heading;
    const content = email_data.data.email_content;

    const contentData = content
      .replace('{{User Name}}', userName)
      .replace('{{Site Name}}', site_name)
      .replace('{{Org name}}', orgName);
    sendEmailFunction(to, subject, heading, contentData, token);
  }

  return {
    errorCode: 0,
    message: 'Site automatically created successfully',
    siteId: site_id,
  };
}

export { automaticallyCreateOrganization, automaticeCreateSite };
