/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';
import Link from 'next/link';
import CryptoJS from 'crypto-js';
import { redirect, useRouter } from 'next/navigation';
import InitialsComponent from '@/helper/NameHelper';
import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import * as Yup from 'yup';
import swal from 'sweetalert';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MessageSchema,
  PincodeSchema,
  SiteAddress2Schema,
  SiteAddressSchema,
  SiteCitySchema,
  SiteCountryDropdownSchema,
  SiteNameSchema,
  SiteStateDropdownSchema,
  SiteTypeDropdownSchema,
  TypeDropdownSchema,
} from '@/helper/ValidationHelper';
import Seo from '@/shared/layout-components/seo/seo';
import { countryList } from '@/supabase/country';
import { getUserRole } from '@/supabase/org_details';
import {
  fetchSiteDetails,
  fetchSiteSidebarList,
} from '@/supabase/site_details';
import { addSites } from '@/supabase/site_details_crud';
import { fetchSiteType } from '@/supabase/site_type';
import { stateList } from '@/supabase/state';
import Loader from '@/utils/Loader/Loader';
import { getOrgUserRole } from '@/supabase/org_user';
import { decryptData, encryptData } from '@/helper/Encryption_Decryption';
import { refreshToken } from '@/supabase/session';
interface Country {
  id: number;
  name: string;
}
interface State {
  id: number;
  name: string;
  country_id: number;
}

interface SiteType {
  id: number;
  name: string;
}

interface SiteTpesDropDown {
  id: number;
  name: string;
}

interface SiteDetailsWithUsers {
  type_name: string | null;
  site: SiteDetails;
  users: User[];
  ownerNames: string[];
  country: string | null;
  state: string | null;
}
interface SiteDetails {
  id: string;
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

const Page: React.FC = () => {
  const navigate = useRouter();
  const [org_id, Setorg_id] = useState<any>('');
  const [user_id, setuser_id] = useState<any>('');
  const [orgName, setorgName] = useState<any>('');
  const [onlyToken, setOnlyToken] = useState('');
  const [userEmail, setUseremail] = useState<any>('');
  useEffect(() => {
    const decryptedUserid = decryptData(localStorage.getItem('user_id'));
    const decryptedOrgId = decryptData(localStorage.getItem('org_id'));
    const decryptedOrgName = decryptData(localStorage.getItem('org_name'));
    const decrypteduserEmail = decryptData(localStorage.getItem('email'));
    setuser_id(decryptedUserid);
    Setorg_id(decryptedOrgId);
    setorgName(decryptedOrgName);
    setUseremail(decrypteduserEmail);
    if (!decryptedOrgId) {
      // swal('Please select organization', { icon: 'error' });
      // redirect('/organization');
      swal('Please select organization', { icon: 'error' }).then(() => {
        navigate.push('/organization');
      });
    }
  }, []);
  const [userrole2, setuserrole2] = useState('');
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const data: any = await getOrgUserRole(user_id, org_id);

        if (data) {
          setuserrole2(data.data.id);
        } else {
          // console.log("No Role Found.");
        }
      } catch (error: any) {
        // console.error("Error fetching organization details:", error.message);
      }
    };

    fetchData2();
  }, [user_id, org_id]);
  const [loading, setLoading] = useState<boolean>(false);
  const [SitesList, setOSitesList] = useState<SiteDetailsWithUsers[] | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<any>();
  // const [results,setresults] = useState<SiteSearch[]>();
  const [sidebarSite, setsidebarSite] = useState<SiteType[]>();
  const [AddSiteName, setAddSiteName] = useState<string>('');
  const [AddSiteNameError, setAddSiteNameError] = useState<string>('');
  const [typeDropdown, settypeDropdown] = useState<SiteTpesDropDown[] | null>(
    null,
  );

  const [typeDropdownError, setTypeDropdownError] = useState<string>('');
  const [SelectedValueDropdown, setSelectedValueDropdown] = useState<number>();

  const [Address1, setAddress1] = useState<string>('');
  const [Address1Error, setAddress1Error] = useState<string>('');
  const [Address2, setAddress2] = useState<string>('');
  const [Address2Error, setAddress2Error] = useState<string>('');

  const [FetchdropDCounrty, setFetchdropDCounrty] = useState<Country[] | null>(
    null,
  );
  const [CountryListError, setCountryListError] = useState<string>('');
  const [SelectedValueCounrty, SetSelectedValueCounrty] = useState<number>(); // Default to 0 or any other valid number

  const [FetchdropDState, setFetchdropDState] = useState<State[] | null>(null);
  const [stateListError, setstateListError] = useState<string>('');
  const [SelectedValueState, setSelectedValueState] = useState<number>();

  const [City, setCity] = useState<string>('');
  const [CityError, setCityError] = useState<string>('');
  const [Pincode, setPincode] = useState<string>('');
  const [PincodeError, setPincodeError] = useState<string>('');

  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');

  const closeModalButtonRef = useRef<HTMLButtonElement>(null);

  /// for getting details of site
  const FetchSiteDetails = async () => {
    try {
      setLoading(true);
      const data1 = await fetchSiteDetails(org_id);
      if (org_id) {
        if (data1) {
          setOSitesList(data1.data ? data1.data : []);

          setLoading(false);
        } else {
          setLoading(false);
          // console.log("No Sites details found.");
        }
      }
    } catch (error: any) {
      setLoading(false);
      // console.error("Error fetching Sites details:", error.message);
    }
  };
  useEffect(() => {
    FetchSiteDetails();
  }, [org_id]);

  ///searching site
  const fetchData1 = async () => {
    try {
      // setLoading(true);

      const result1: any = await fetchSiteSidebarList(
        searchTerm ? searchTerm : null,
        org_id,
      );

      if (result1.errorCode === 0 && result1.data.length > 0) {
        setsidebarSite(result1.data);
      } else if (result1.errorCode === 1) {
        // console.log("No organization details found.");
        setsidebarSite([]);
        // setLoading(false);
      } else {
        if (searchTerm) {
          setsidebarSite([
            {
              id: -1,
              name: "We couldn't find any sites",
            },
          ]);
        } else {
          setsidebarSite([]);
        }
      }
    } catch (error: any) {
      // setLoading(false);
      // console.error("Error fetching Sidebar details:", error.message);
    }
  };
  useEffect(() => {
    fetchData1();
  }, [searchTerm]);
  // for search//
  const handleSearch = async () => {
    if (searchTerm === '') {
      // setResults();
    } else {
      const result = await fetchSiteType();
      if (result.errorCode === 0 && result.data && result.data.length > 0) {
        // setresults(result);
        //   setError(null);
      } else {
        //   setError("Error fetching data");
        // setResults(null);
      }
    }
  };

  ///////////////////for crud validations/////
  const validationSchema = Yup.object().shape({
    AddSiteName: SiteNameSchema,
    SelectedValueDropdown: SiteTypeDropdownSchema,
    Address1: SiteAddressSchema,
    Address2: SiteAddress2Schema,
    SelectedValueCounrty: SiteCountryDropdownSchema,
    SelectedValueState: SiteStateDropdownSchema,
    City: SiteCitySchema,
    Pincode: PincodeSchema,
    message: MessageSchema,
  });
  /////
  const handelAddSiteName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const NewSiteName = e.target.value.trimStart();
    setAddSiteName(NewSiteName);
    SiteNameSchema.validate(NewSiteName)
      .then(() => {
        setAddSiteNameError('');
      })
      .catch((err: Yup.ValidationError) => {
        setAddSiteNameError(err.message);
      });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value.trimStart();
    setMessage(newMessage);

    MessageSchema.validate(newMessage)
      .then(() => {
        setMessageError('');
      })
      .catch((err: Yup.ValidationError) => {
        setMessageError(err.message);
      });
  };
  // for dropdown//
  useEffect(() => {
    const SiteTypesFetch = async () => {
      try {
        const data = await fetchSiteType();

        if (data && data.data) {
          settypeDropdown(data.data);
        } else {
          // console.log("No Site details found.");
        }
      } catch (error: any) {
        // console.error("Error fetching Site details:", error.message);
      }
    };

    SiteTypesFetch();
  }, []);
  // for dropdown change
  const handelchangeTypeDropDown = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const NewDropdownSelected = parseInt(e.target.value);
    setSelectedValueDropdown(NewDropdownSelected);
    SiteTypeDropdownSchema.validate(NewDropdownSelected)
      .then(() => {
        setTypeDropdownError('');
      })
      .catch((err: Yup.ValidationError) => {
        setTypeDropdownError(err.message);
        // console.log(err);
      });
  };

  const handelchangeAddress1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newaddres1 = e.target.value.trimStart();
    setAddress1(newaddres1);
    SiteAddressSchema.validate(newaddres1)
      .then(() => {
        setAddress1Error('');
      })
      .catch((err: Yup.ValidationError) => {
        setAddress1Error(err.message);
      });
  };
  const handelchangeAddress2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newaddres2 = e.target.value.trimStart();
    setAddress2(newaddres2);
    SiteAddress2Schema.validate(newaddres2)
      .then(() => {
        setAddress2Error('');
      })
      .catch((err: Yup.ValidationError) => {
        setAddress2Error(err.message);
      });
  };
  // for state dropdown
  useEffect(() => {
    const AddstateDropdown = async () => {
      try {
        const data = await stateList(SelectedValueCounrty);

        if (data && data) {
          setFetchdropDState(data.data);
        } else {
          // console.log("No stateList details found.");
        }
      } catch (error: any) {
        // console.error("Error fetching stateList:", error.message);
      }
    };
    AddstateDropdown();
  }, [SelectedValueCounrty]);
  const handelchangeState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const NewStateselected = parseInt(e.target.value);
    setSelectedValueState(NewStateselected);
    SiteStateDropdownSchema.validate(NewStateselected)
      .then(() => {
        setstateListError('');
      })
      .catch((err: Yup.ValidationError) => {
        setstateListError(err.message);
        // console.log(err);
      });
  };

  // for country dropdown
  useEffect(() => {
    const AddSiteCounrtyDropDown = async () => {
      try {
        const data = await countryList();

        if (data && data) {
          setFetchdropDCounrty(data.data);
        } else {
          // console.log("No Country details found.");
        }
      } catch (error: any) {
        // console.error("Error fetching Country:", error.message);
      }
    };

    AddSiteCounrtyDropDown();
  }, []);

  const handelchangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // debugger;
    const Newcountryselected = parseInt(e.target.value);
    SetSelectedValueCounrty(Newcountryselected);

    SiteCountryDropdownSchema.validate(Newcountryselected)
      .then(() => {
        setCountryListError(''); // Clear error on successful validation
      })
      .catch((err: Yup.ValidationError) => {
        setCountryListError(err.message);
      });
  };

  // for city
  const handelAddSiteCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const NewSiteCity = e.target.value.trimStart();
    setCity(NewSiteCity);
    SiteCitySchema.validate(NewSiteCity)
      .then(() => {
        setCityError('');
      })
      .catch((err: Yup.ValidationError) => {
        setCityError(err.message);
      });
  };
  // for pincode
  const handelAddSitePincode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Newpincode = e.target.value.trim();
    setPincode(Newpincode);
    PincodeSchema.validate(Newpincode)
      .then(() => {
        setPincodeError('');
      })
      .catch((err: Yup.ValidationError) => {
        setPincodeError(err.message);
      });
  };

  /// for submit
  const validateForm = async () => {
    try {
      await validationSchema.validate(
        {
          AddSiteName,
          SelectedValueDropdown,
          Address1,
          Address2,
          SelectedValueCounrty,
          SelectedValueState,
          City,
          message,
          Pincode,
        },
        { abortEarly: false },
      );
      setAddSiteNameError('');
      setTypeDropdownError('');
      setAddress2Error('');
      setAddress1Error('');
      setCountryListError('');
      setstateListError('');
      setCityError('');
      setMessageError('');
      return true;
    } catch (err) {
      // console.log("err", err);

      if (err instanceof Yup.ValidationError) {
        const SitenameError =
          err.inner.find((error) => error.path === 'AddSiteName')?.message ||
          '';
        const SiteTypeError =
          err.inner.find((error) => error.path === 'SelectedValueDropdown')
            ?.message || '';
        const SiteAdd1err =
          err.inner.find((error) => error.path === 'Address1')?.message || '';
        const SiteAdd2err =
          err.inner.find((error) => error.path === 'Address2')?.message || '';

        const SiteCountryErr =
          err.inner.find((error) => error.path === 'SelectedValueCounrty')
            ?.message || '';

        const SiteStateErr =
          err.inner.find((error) => error.path === 'SelectedValueState')
            ?.message || '';

        const SiteCityErr =
          err.inner.find((error) => error.path === 'City')?.message || '';
        const SiteDescriptionErr =
          err.inner.find((error) => error.path === 'message')?.message || '';
        const SitePincodeErr =
          err.inner.find((error) => error.path === 'Pincode')?.message || '';
        setAddSiteNameError(SitenameError);
        setTypeDropdownError(SiteTypeError);
        setAddress1Error(SiteAdd1err);
        setAddress2Error(SiteAdd2err);
        setCountryListError(SiteCountryErr);
        setstateListError(SiteStateErr);
        setCityError(SiteCityErr);
        setMessageError(SiteDescriptionErr);
        setPincodeError(SitePincodeErr);
      }
      return false;
    }
  };
  const handleSubmit = async () => {
    const isValid = await validateForm();

    if (isValid) {
      //  const selectedTypeId =
      //    typeDropdown?.find((type) => type.name === SelectedValueDropdown)
      //      ?.id ?? null;

      const data: any = {
        org_id: org_id,
        name: AddSiteName,
        type_id: SelectedValueDropdown,
        address1: Address1,
        address2: Address2,
        city: City,
        pin_code: Pincode,
        about_site: message,
        status: 'Y',
        country_id: SelectedValueCounrty,
        state_id: SelectedValueState,
        user_id: user_id,
        token: onlyToken,
        userName: userEmail,
        org_name: orgName,
      };
      try {
        setLoading(true);
        await refreshToken();
        const result = await addSites(data);

        if (result.errorCode == 0) {
          setLoading(false);
          if (closeModalButtonRef.current) {
            closeModalButtonRef.current.click();
          }

          // setAddSiteName('');
          // setSelectedValueDropdown(undefined);
          // setAddress1('');
          // setAddress2('');
          // setMessage('');
          // setFetchdropDCounrty(null);
          // setSelectedValueState(undefined);
          // setCity('');
          // setMessageError('');
          // setPincodeError('');
          handelclosemodel();
          FetchSiteDetails();
          fetchData1();
          toast.success(result.message, { autoClose: 3000 });
        } else {
          setLoading(false);

          toast.error(result.message, { autoClose: 3000 });
          if (closeModalButtonRef.current) {
            closeModalButtonRef.current.click();
          }
          handelclosemodel();
        }
      } catch (error) {
        setLoading(false);
        // console.error("API call failed:", error);
      }
    }
  };

  // for close model add and clear all values
  const handelclosemodel = () => {
    setAddSiteNameError('');
    settypeDropdown(null);
    setTypeDropdownError('');
    setAddress2Error('');
    setAddress1Error('');
    setCountryListError('');
    setstateListError('');
    setCityError('');
    setMessageError('');
    setAddSiteName('');
    setSelectedValueDropdown(undefined);
    setAddress1('');
    setPincode('');
    setAddress2('');
    setMessage('');
    setFetchdropDCounrty(null);
    setSelectedValueState(undefined);
    setCity('');
    setPincodeError('');
    setMessageError('');
    // FetchSiteDetails();
    // fetchData1();
  };

  const [tokenVerify, setTokenVerify] = useState(false);
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('sb-emsjiuztcinhapaurcrl-auth-token');
      if (!token) {
        setTokenVerify(false);
        redirect('/');
      } else {
        setTokenVerify(true);
        const tokens = JSON.parse(token);
        setOnlyToken(tokens.access_token);
      }
    }
  }, []);
  return (
    <>
      <>
        {loading && <Loader />}
        {tokenVerify && (
          <>
            <ToastContainer />
            <Seo title='Contacts' />
            <div className='grid grid-cols-12 gap-6 mt-5'>
              <div className='xl:col-span-3 col-span-12'>
                <div className='box'>
                  <div className='box-body !p-0'>
                    {userrole2 == '1' || userrole2 == '2' ? (
                      <div className='p-4 grid border-b border-dashed dark:border-defaultborder/10'>
                        <Link
                          href=''
                          className='hs-dropdown-toggle py-2  px-3 ti-btn bg-primary text-white !font-medium w-full !mb-0'
                          data-hs-overlay='#todo-compose'
                        >
                          <i className='ri-add-circle-line !text-[1rem]'></i>Add
                          Site
                        </Link>
                        <div
                          id='todo-compose'
                          // className='hs-overlay hidden ti-modal'
                          className='hs-overlay hidden ti-modal  [--overlay-backdrop:static]'
                        >
                          <div className='hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out lg:!max-w-4xl lg:w-full m-3 lg:!mx-auto'>
                            <div className='ti-modal-content'>
                              <div className='ti-modal-header'>
                                <h6
                                  className='modal-title text-[1rem] font-semibold'
                                  id='mail-ComposeLabel'
                                >
                                  Add Site
                                </h6>
                                <button
                                  type='button'
                                  className='hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor'
                                  data-hs-overlay='#todo-compose'
                                  ref={closeModalButtonRef}
                                  onClick={handelclosemodel}
                                >
                                  <span className='sr-only'>Close</span>
                                  <i className='ri-close-line'></i>
                                </button>
                              </div>

                              <div className='ti-modal-body !overflow-visible px-4'>
                                <div className='grid grid-cols-12 gap-2'>
                                  <div className='xl:col-span-6 col-span-6'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Site Name*
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control w-full'
                                      id='task-name'
                                      placeholder='Enter Site Name'
                                      onChange={handelAddSiteName}
                                      value={AddSiteName}
                                      maxLength={256}
                                    />
                                    {AddSiteNameError && (
                                      <div className='text-danger'>
                                        {AddSiteNameError}
                                      </div>
                                    )}
                                  </div>
                                  {/* <div className='flex justify-between mt-4'>
                                    <div className="alert alert-solid-primary alert-dismissible !ms-2 fade show flex" role="alert" id="dismiss-alert2"><div className="sm:flex-shrink-0"> A simple </div><div className="ms-auto"><div className="mx-1 my-1"><button type="button" className="inline-flex bg-teal-50 rounded-sm text-teal-500 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-teal-50 focus:ring-teal-600" data-hs-remove-element="#dismiss-alert2"><span className="sr-only">Dismiss</span><svg className="h-3 w-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor"></path></svg></button></div></div></div>
                                                        <div className="alert alert-solid-primary alert-dismissible !ms-2 fade show flex" role="alert" id="dismiss-alert2"><div className="sm:flex-shrink-0"> A simple </div><div className="ms-auto"><div className="mx-1 my-1"><button type="button" className="inline-flex bg-teal-50 rounded-sm text-teal-500 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-teal-50 focus:ring-teal-600" data-hs-remove-element="#dismiss-alert2"><span className="sr-only">Dismiss</span><svg className="h-3 w-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor"></path></svg></button></div></div></div>
                                  </div> */}

                                  <div className='xl:col-span-6 col-span-6'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Type*
                                    </label>
                                    <select
                                      className='form-select'
                                      onChange={handelchangeTypeDropDown}
                                      value={SelectedValueDropdown}
                                    >
                                      <option value='' hidden>
                                        Select Type
                                      </option>
                                      {typeDropdown &&
                                        typeDropdown.map((type) => (
                                          <option key={type.id} value={type.id}>
                                            {type.name}
                                          </option>
                                        ))}
                                    </select>

                                    {typeDropdownError && (
                                      <div className='text-danger'>
                                        {typeDropdownError}
                                      </div>
                                    )}
                                  </div>
                                  <div className='xl:col-span-6 col-span-6'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Addres 1*
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control w-full'
                                      id='task-name'
                                      placeholder='Enter Address 1'
                                      onChange={handelchangeAddress1}
                                      value={Address1}
                                      maxLength={255}
                                    />
                                    {Address1Error && (
                                      <div className='text-danger'>
                                        {Address1Error}
                                      </div>
                                    )}
                                  </div>
                                  <div className='xl:col-span-6 col-span-6'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Address 2
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control w-full'
                                      id='task-name'
                                      placeholder='Enter Address 2'
                                      onChange={handelchangeAddress2}
                                      value={Address2}
                                    />
                                    {Address2Error && (
                                      <div className='text-danger'>
                                        {Address2Error}
                                      </div>
                                    )}
                                  </div>
                                  <div className='xl:col-span-6 col-span-6'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Country*
                                    </label>
                                    <select
                                      className='form-select'
                                      onChange={handelchangeCountry}
                                      value={SelectedValueCounrty}
                                    >
                                      <option value='' hidden>
                                        Select Country
                                      </option>
                                      {FetchdropDCounrty &&
                                        FetchdropDCounrty.map((Contry) => (
                                          <option
                                            key={Contry.id}
                                            value={Contry.id}
                                          >
                                            {Contry.name}
                                          </option>
                                        ))}
                                    </select>

                                    {CountryListError && (
                                      <div className='text-danger'>
                                        {CountryListError}
                                      </div>
                                    )}
                                  </div>
                                  <div className='xl:col-span-6 col-span-6'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      State*
                                    </label>
                                    <select
                                      className='form-select'
                                      onChange={handelchangeState}
                                      value={SelectedValueState}
                                    >
                                      <option value='' hidden>
                                        Select State
                                      </option>
                                      {FetchdropDState &&
                                        FetchdropDState.map((state) => (
                                          <option
                                            key={state.id}
                                            value={state.id}
                                          >
                                            {state.name}
                                          </option>
                                        ))}
                                    </select>

                                    {stateListError && (
                                      <div className='text-danger'>
                                        {stateListError}
                                      </div>
                                    )}
                                  </div>
                                  <div className='xl:col-span-6 col-span-6'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      City*
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control w-full'
                                      id='task-name'
                                      placeholder='Enter City'
                                      onChange={handelAddSiteCity}
                                      value={City}
                                      maxLength={100}
                                    />
                                    {CityError && (
                                      <div className='text-danger'>
                                        {CityError}
                                      </div>
                                    )}
                                  </div>
                                  <div className='xl:col-span-6 col-span-6'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Zip Code*
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control w-full'
                                      id='task-name'
                                      placeholder='Enter Zip Code'
                                      onChange={handelAddSitePincode}
                                      value={Pincode}
                                      minLength={5}
                                      maxLength={10}
                                    />
                                    {PincodeError && (
                                      <div className='text-danger'>
                                        {PincodeError}
                                      </div>
                                    )}
                                  </div>
                                  <div className='xl:col-span-12 col-span-12'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Description
                                    </label>
                                    <textarea
                                      className='form-control w-full'
                                      style={{ resize: 'none' }}
                                      id='task-name'
                                      placeholder='Enter Description'
                                      // onKeyDown={handleKeyPress}
                                      onChange={handleMessageChange}
                                      value={message}
                                    />
                                    {messageError && (
                                      <div className='text-danger'>
                                        {messageError}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className='ti-modal-footer'>
                                <button
                                  type='button'
                                  className='hs-dropdown-toggle ti-btn  ti-btn-light align-middle'
                                  data-hs-overlay='#todo-compose'
                                  ref={closeModalButtonRef}
                                  onClick={handelclosemodel}
                                >
                                  Cancel
                                </button>
                                <button
                                  type='button'
                                  className='ti-btn bg-primary text-white !font-medium'
                                  onClick={handleSubmit}
                                >
                                  Add Site
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className='p-4 border-b border-dashed dark:border-defaultborder/10'>
                      <div className='input-group'>
                        <input
                          type='text'
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className='form-control w-full !rounded-md !bg-light border-0 !rounded-e-none'
                          placeholder='Search Site Here'
                          aria-describedby='button-addon2'
                        />
                        <button
                          type='button'
                          aria-label='button'
                          className='ti-btn ti-btn-light !rounded-s-none !mb-0'
                          id='button-addon2'
                          onClick={handleSearch}
                        >
                          <i className='ri-search-line text-[#8c9097] dark:text-white/50'></i>
                        </button>
                      </div>
                    </div>
                    <div className='p-4 task-navigation border-b border-dashed dark:border-defaultborder/10'>
                      <ul className='list-none task-main-nav mb-0'>
                        {sidebarSite && (
                          <div>
                            {sidebarSite.map((site) => (
                              <li
                                style={{ cursor: 'pointer' }}
                                key={site?.id}
                                onClick={() => {
                                  if (site.id != -1) {
                                    setLoading(true);
                                    const encryptedsiteid = encryptData(
                                      site.id,
                                    );
                                    const encryptedsitename = encryptData(
                                      site.name,
                                    );
                                    localStorage.setItem(
                                      'site_id',
                                      encryptedsiteid,
                                    );
                                    localStorage.setItem(
                                      'site_name',
                                      encryptedsitename,
                                    );
                                    navigate.push('/sitedashboard');
                                    setLoading(false);
                                  }
                                }}
                              >
                                <div className='flex items-center'>
                                  <span className='flex-grow'>
                                    {site?.name ? site.name : 'No Site found'}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </div>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className='xl:col-span-9 col-span-12'>
                <div className='grid grid-cols-12 gap-x-6'>
                  <div className='xl:col-span-12 col-span-12'>
                    <div className='box'>
                      <div className='box-body !p-0'>
                        <div className='md:flex px-4 py-6 items-center justify-between'>
                          <div>
                            <h6 className='font-semibold mb-0 text-[1rem]'>
                              Sites ({orgName})
                            </h6>
                          </div>
                        </div>
                        {SitesList && SitesList.length == 0 && (
                          <div className='col-md-12 w-100 mt-4 mb-4'>
                            <p className='text-center'>No Site Found</p>{' '}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='xl:col-span-12 col-span-12'>
                    <div
                      className='grid grid-cols-12 gap-x-6'
                      id='tasks-container'
                    >
                      {SitesList && SitesList.length > 0
                        ? SitesList.map((SingleSite) => (
                            <div
                              className='xl:col-span-6 col-span-12 task-card'
                              style={{ cursor: 'pointer' }}
                              key={SingleSite?.site?.id}
                              onClick={() => {
                                const encryptedsiteid = encryptData(
                                  SingleSite.site.id,
                                );
                                const encryptedsitename = encryptData(
                                  SingleSite.site.name,
                                );
                                const encryptedsiteOwnerName = encryptData(
                                  SingleSite.ownerNames,
                                );
                                localStorage.setItem(
                                  'site_id',
                                  encryptedsiteid,
                                );
                                localStorage.setItem(
                                  'site_name',
                                  encryptedsitename,
                                );
                                localStorage.setItem(
                                  'site_owner_name',
                                  encryptedsiteOwnerName,
                                );
                                navigate.push('/sitedashboard');
                              }}
                            >
                              <div className='box task-pending-card'>
                                <div className='box-body'>
                                  <div className='flex justify-between align-center flex-wrap gap-2'>
                                    <h1
                                      style={{
                                        fontSize: '1.1rem', // Adjust size as needed
                                        fontWeight: 'bold',
                                        marginBottom: '0.5rem', // Equivalent to mb-4
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Link
                                        aria-label='anchor'
                                        href='#!'
                                      ></Link>
                                      {SingleSite?.site
                                        ? SingleSite?.site?.name
                                        : ''}
                                    </h1>
                                    <div className='avatar avatar-xl avatar-rounded '>
                                      {' '}
                                      <span className='inline-flex items-center justify-center !w-[2.75rem] !h-[2.75rem] leading-[2.75rem] text-[0.85rem]  rounded-full text-success bg-success/10 font-semibold'>
                                        <InitialsComponent
                                          name={
                                            SingleSite?.site
                                              ? SingleSite?.site?.name
                                              : ''
                                          }
                                        />
                                      </span>
                                    </div>
                                  </div>
                                  <div className=''>
                                    <div>
                                      <ul className='list-group list-group-flush'>
                                        <li className='flex list-group-item fw-semibold'>
                                          <i className='bx bx-map align-middle me-2 text-muted'></i>
                                          <b>Address </b>
                                          <p className='ms-1 over-text text-muted fw-normal d-inline-block'>
                                            {SingleSite?.site
                                              ? SingleSite.site?.address1 + ','
                                              : ''}

                                            {SingleSite?.site
                                              ? SingleSite.site?.address2 + ','
                                              : ''}

                                            {SingleSite?.site
                                              ? SingleSite.site?.city + ','
                                              : ''}

                                            {SingleSite?.site
                                              ? SingleSite.state + ','
                                              : ''}

                                            {SingleSite?.site
                                              ? SingleSite.country
                                              : ''}
                                          </p>
                                        </li>
                                        <li className='list-group-item fw-semibold'>
                                          <i className='bx bx-briefcase align-middle me-2 text-muted'></i>
                                          <b>Owner</b>
                                          <span className='ms-1 text-muted fw-normal d-inline-block'>
                                            {SingleSite?.ownerNames}
                                          </span>
                                        </li>
                                        <li className='list-group-item fw-semibold'>
                                          <i className='bx bx-user align-middle me-2 text-muted'></i>
                                          <b>Number of users</b>
                                          <span className='ms-1 text-muted fw-normal d-inline-block'>
                                            {SingleSite?.users?.length}
                                          </span>
                                        </li>
                                        <li className='list-group-item fw-semibold'>
                                          <i className='bx bx-user align-middle me-2 text-muted'></i>
                                          <b>Type</b>
                                          <span className='ms-1 text-muted fw-normal d-inline-block'>
                                            {SingleSite?.type_name}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default Page;
