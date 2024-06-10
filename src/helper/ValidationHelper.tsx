/* eslint-disable no-useless-escape */
import * as Yup from 'yup';

const OrganizationNameSchema = Yup.string()
  .required(
    'Organization name is required. Please enter your organization name.',
  )
  .min(2, 'The organization name should be at least 2 characters long.')
  .max(100, 'The organization name should not exceed 100 characters.');
// .matches(/^[a-zA-Z0-9\s\-_.,]+$/, 'Please enter a valid organization name.');

const DomainSchema = Yup.string()
  .required('Domain is required. Please enter a domain.')
  .min(2, 'The domain should be at least 2 characters long.')
  .max(255, 'The domain should not exceed 255 characters.')
  // .matches(
  //   // /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/,
  //   // /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+,)*[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/,
  //   // /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+,)*[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/,
  //   /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+)*$/,
  //   'Invalid domain format. Please enter a valid domain.',
  // );
  .test(
    'is-valid-domain',
    'Invalid domain format. Please enter a valid domain.',
    (value) => {
      if (!value) return true; // If the value is empty, don't perform validation
      const domains = value.split(',').map((domain) => domain.trim());
      const domainRegex =
        /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+)*$/;
      return domains.every((domain) => domainRegex.test(domain));
    },
  );

const TypeDropdownSchema = Yup.string().required(
  'Please select a type from the dropdown menu.',
);

const MessageSchema = Yup.string()
  // .required('It field is required.')
  // .min(1, 'It must be at least 1 character long.')
  .max(1000, 'It must be at most 1000 characters long.');
const emailSchema = Yup.string()
  .email('Invalid email address format. Please enter a valid email address.')
  .required('Email address is required. Please enter your email address.')
  .matches(
    // /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co.in)$/,
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Invalid email address format. Please enter a valid email address.',
  );

const nameSchema = Yup.string()
  .required('Please enter your name.')
  .min(2, 'Name must be at least 2 characters long.')
  .max(255, 'Name must be at most 255 characters long.')
  .matches(/^[a-zA-Z]+$/, 'Please enter a valid name.');

const roleSchema = Yup.string().required(
  'Please select a role from the dropdown menu.',
);

const passwordSchema = Yup.string().required(
  'Password is required. Please enter your password.',
);
// .min(8, "Password must be at least 8 characters long.")
// .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$/,
//   "Invalid password format. Please use at least one uppercase letter, one lowercase letter, one digit, and one special character.")

/////////////////////////////////////////////
const SiteNameSchema = Yup.string()
  .required('Site name is required. Please enter your Site name.')
  .min(3, 'The Site name should be at least 3 characters long.')
  .max(50, 'The Site name should not exceed 50 characters.')
  .matches(/^[a-zA-Z0-9\s\-_.]+$/, 'Please enter a valid Site name.');

const SiteAddressSchema = Yup.string()
  .required('Please enter your address.')
  .min(1, 'The Site address should be atleast 1 characters long.')
  .max(255, 'The Site address should not exceed 255 characters.')
  .matches(/^[A-Za-z0-9'\.\-\s\,/]+$/, 'Please enter a valid address.');

const SiteAddress2Schema = Yup.string().max(
  255,
  'The Site address should not exceed 255 characters.',
);

const SiteCitySchema = Yup.string()
  .required('Please enter your city.')
  .min(1, 'The city should be atleast 1 characters long.')
  .max(100, 'The city should not exceed 100 characters.')
  .matches(/^[a-zA-Z0-9\s\-]+$/, 'Please enter a valid address name.');

const PincodeSchema = Yup.string()
  .required('Please enter your  pincode')
  .min(5, 'The pincode should be at least 5 characters long')
  .max(6, 'The pincode should not exceed 6 characters');

export {
  DomainSchema,
  emailSchema,
  MessageSchema,
  nameSchema,
  OrganizationNameSchema,
  passwordSchema,
  roleSchema,
  TypeDropdownSchema,
};

export {
  PincodeSchema,
  SiteAddress2Schema,
  SiteAddressSchema,
  SiteCitySchema,
  SiteNameSchema,
};
