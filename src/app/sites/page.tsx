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
import {
  addSites,
  addSitesConfirm,
  requestSiteDeletion,
  updateSite,
} from '@/supabase/site_details_crud';
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
  user_role_id?: number | null;
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
    const decrypteduserEmail = decryptData(localStorage.getItem('user_email'));
    setuser_id(decryptedUserid);
    Setorg_id(decryptedOrgId);
    setorgName(decryptedOrgName);
    setUseremail(decrypteduserEmail);
    if (!decryptedOrgId) {
      document.body.classList.add('no-scroll');
      swal('Please select organization', { icon: 'error' }).then(() => {
        document.body.classList.remove('no-scroll');
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
          //
        }
      } catch (error: any) {
        //
      }
    };

    fetchData2();
  }, [user_id, org_id]);
  const [changeFlage, setChangeFlage] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [SitesList, setOSitesList] = useState<SiteDetailsWithUsers[] | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<any>();
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
  const [SelectedValueCounrty, SetSelectedValueCounrty] = useState<
    number | string
  >(''); // Default to 0 or any other valid number

  const [FetchdropDState, setFetchdropDState] = useState<State[] | null>(null);
  const [stateListError, setstateListError] = useState<string>('');
  const [SelectedValueState, setSelectedValueState] = useState<number | string>(
    '',
  );

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
      const data1 = await fetchSiteDetails(org_id, user_id);
      if (org_id) {
        if (data1) {
          setOSitesList(data1.data ? data1.data : []);

          setLoading(false);
        } else {
          setLoading(false);
          //
        }
      }
    } catch (error: any) {
      setLoading(false);
      //
    }
  };
  useEffect(() => {
    FetchSiteDetails();
  }, [org_id]);

  ///searching site
  const fetchData1 = async () => {
    try {
      const result1: any = await fetchSiteSidebarList(
        searchTerm ? searchTerm : null,
        org_id,
        user_id,
      );

      if (result1.errorCode === 0 && result1.data.length > 0) {
        setsidebarSite(result1.data);
      } else if (result1.errorCode === 1) {
        setsidebarSite([]);
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
      //
    }
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      // This code runs after the user has stopped typing for 300ms
      if (searchTerm !== undefined) {
        fetchData1();
      }
    }, 300); // 300ms delay

    // Cleanup function to clear the timeout if searchTerm changes before 300ms
    return () => {
      clearTimeout(handler);
    };
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
  /// for submit
  const handelclosemodel = () => {
    setAddSiteName('');
    setSelectedValueDropdown(undefined);
    setAddress1('');
    setAddress2('');
    SetSelectedValueCounrty('');

    setCountryListError('');
    setstateListError('');
    setCityError('');
    setMessageError('');

    setAddSiteNameError('');
    setTypeDropdownError('');
    setAddress1Error('');
    setAddress2Error('');

    setPincode('');

    setMessage('');
    settypeDropdown(null);
    setFetchdropDCounrty(null);
    setSelectedValueState('');
    setCity('');
    setPincodeError('');
    setMessageError('');
  };

  function handleCall() {
    const SiteTypesFetch = async () => {
      try {
        const data = await fetchSiteType();

        if (data && data.data) {
          settypeDropdown(data.data);
        } else {
          //
        }
      } catch (error: any) {
        //
      }
    };
    const AddSiteCounrtyDropDown = async () => {
      try {
        const data = await countryList();
        if (data && data) {
          setFetchdropDCounrty(data.data);
        } else {
          //
        }
      } catch (error: any) {
        //
      }
    };
    AddSiteCounrtyDropDown();
    SiteTypesFetch();
  }
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
        //
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
          //
        }
      } catch (error: any) {
        //
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
      });
  };

  // for country dropdown

  const handelchangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
  const [editsiteid, seteditsiteid] = useState();
  const handleSubmit = async () => {
    const isValid = await validateForm();

    if (isValid) {
      if (changeFlage) {
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
            handelclosemodel();
            FetchSiteDetails();
            fetchData1();
            toast.success(result.message, { autoClose: 3000 });
          } else if (result.errorCode == 2) {
            setLoading(false);
            if (closeModalButtonRef.current) {
              closeModalButtonRef.current.click();
            }
            handelclosemodel();
            document.body.classList.add('no-scroll');
            swal({
              title: result.message,
              text: 'You have exceeded the Entitlement limit. Do you want to proceed?',
              icon: 'warning',
              buttons: {
                cancel: {
                  text: 'No, cancel',
                  value: false,
                  visible: true,
                  className: '',
                  closeModal: true,
                },
                confirm: {
                  text: 'Yes, proceed!',
                  value: true,
                  visible: true,
                  className: '',
                  closeModal: true,
                },
              },
            }).then(async (willProceed) => {
              document.body.classList.remove('no-scroll');
              if (willProceed) {
                await refreshToken();
                setLoading(true);
                const result1 = await addSitesConfirm(result.data);
                if (result1.errorCode === 0) {
                  setLoading(false);
                  FetchSiteDetails();
                  fetchData1();
                  toast.success(result1.message, { autoClose: 3000 });
                } else {
                  setLoading(false);
                  toast.error(result1.message, { autoClose: 3000 });
                }
              } else {
                setLoading(false);
                toast.error(result.message, { autoClose: 3000 });
              }
            });
          } else {
            setLoading(false);
            if (closeModalButtonRef.current) {
              closeModalButtonRef.current.click();
            }
            handelclosemodel();
            toast.error(result.message, { autoClose: 3000 });
          }
        } catch (error) {
          setLoading(false);
        }
      }
      if (changeFlage == false) {
        const updatedata: any = {
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
          siteId: editsiteid,
        };
        try {
          setLoading(true);
          await refreshToken();
          const result = await updateSite(updatedata);

          if (result.errorCode == 0) {
            setLoading(false);
            if (closeModalButtonRef.current) {
              closeModalButtonRef.current.click();
            }
            handelclosemodel();
            FetchSiteDetails();
            fetchData1();
            toast.success(result.message, { autoClose: 3000 });
          } else {
            setLoading(false);
            if (closeModalButtonRef.current) {
              closeModalButtonRef.current.click();
            }
            handelclosemodel();
            toast.error(result.message, { autoClose: 3000 });
          }
        } catch (error) {
          setLoading(false);
        }
      }
    }
  };
  // for close model add and clear all values
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
  ///// for edit
  const handeledit = (SingleSite: any) => {
    setLoading(true);
    setChangeFlage(false);
    setAddSiteName(SingleSite.site.name);
    setSelectedValueDropdown(SingleSite?.site.type_id);
    setAddress1(SingleSite?.site?.address1);
    setAddress2(SingleSite?.site?.address2);
    SetSelectedValueCounrty(SingleSite?.site.country_id);
    setSelectedValueState(SingleSite?.site.state_id);
    setCity(SingleSite?.site?.city);
    setPincode(SingleSite?.site.pin_code);
    setMessage(SingleSite?.site.about_site);
    seteditsiteid(SingleSite?.site.id);
    // remaning descriptopn

    handleCall();
    setLoading(false);
  };
  const Addsite = () => {
    handleCall();
    handelclosemodel();
    // remaning descriptopn
    setChangeFlage(true);
  };
  const handelDelete = (SingleSite: any): any => {
    const showError = (message: string) => {
      document.body.classList.add('no-scroll');
      swal({
        title: 'Invalid input!',
        text: message,
        icon: 'error',
        buttons: false as unknown as (string | boolean)[],
      }).then(() => {
        document.body.classList.remove('no-scroll');
      });
    };

    // Function to show SweetAlert modal

    const showDeleteModal = () => {
      // document.body.style.overflow = 'hidden';
      // document.body.style.position = 'fixed';
      document.body.classList.add('no-scroll');
      swal({
        title: 'Are you sure?',
        text: `Please type DELETE/ ${SingleSite?.site.name} to confirm deletion`,
        content: {
          element: 'input',
          attributes: {
            placeholder: 'Type here',
            type: 'text',
            id: 'delete-input',
            // oninput: (e: Event) => {
            //   const target = e.target as HTMLInputElement;
            //   let value = target.value;

            //   // // Allow only alphabetic characters
            //   // value = value.replace(/[^a-zA-Z]/g, '');

            //   // Limit the length to 6 characters
            //   // if (value.length > 6) {
            //   //   value = value.substring(0, 6);
            //   // }

            //   // Convert to uppercase
            //   // value = value.toUpperCase();
            //   // target.value = value; // Update the input field with the transformed value
            // },
          },
        },
        icon: 'warning',
        buttons: {
          cancel: {
            text: 'Cancel',
            value: null,
            visible: true,
            className: '',
            closeModal: true,
          },
          confirm: {
            text: 'Delete Request',
            visible: true,
            className: '',
            closeModal: false, // Keep modal open for validation
          },
        },
      }).then((value) => {
        document.body.classList.remove('no-scroll');
        const inputElem = document.getElementById(
          'delete-input',
        ) as HTMLInputElement;
        const userInput = inputElem?.value;

        if (userInput === 'DELETE' || userInput == SingleSite?.site.name) {
          // Clear any existing error message
          const email = decryptData(localStorage.getItem('user_email'));
          const data = {
            userName: email,
            siteName: SingleSite?.site.name,
            orgName: orgName, // Ensure orgName is defined
            token: onlyToken, // Ensure onlyToken is defined
          };

          // Call your deletion API function
          setLoading(true); // Set loading state to true
          requestSiteDeletion(data)
            .then((response) => {
              setLoading(false); // Reset loading state
              if (response) {
                document.body.classList.add('no-scroll');
                swal({
                  title: 'Success!',
                  text: response.message,
                  icon: 'success',
                }).then(() => {
                  document.body.classList.remove('no-scroll');
                });
              } else {
                document.body.classList.add('no-scroll');
                swal({
                  title: 'Error!',
                  text: 'There was a problem deleting the site.',
                  icon: 'error',
                }).then(() => {
                  document.body.classList.remove('no-scroll');
                });
              }
            })
            .catch(() => {
              setLoading(false); // Reset loading state on error
              document.body.classList.add('no-scroll');
              swal({
                title: 'Error!',
                text: 'There was a problem deleting the site.',
                icon: 'error',
              }).then(() => {
                document.body.classList.remove('no-scroll');
              });
            });
        } else if (value === null) {
          // User pressed cancel, do nothing
        } else {
          // Invalid input, show error message and show modal again
          showError(
            `You need to type DELETE/${SingleSite?.site.name} to confirm`,
          );
          // toast.error(
          //   `You need to type DELETE/${SingleSite?.site.name} to confirm`,
          // );
          // showDeleteModal();
          setTimeout(() => {
            showDeleteModal(); // Show modal again
          }, 3000);
        }
      });
    };

    // Initial call to show the modal
    showDeleteModal();
  };
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
                          onClick={Addsite}
                          // onClick={() => handleCall()}
                        >
                          <i className='ri-add-circle-line !text-[1rem]'></i>Add
                          Site
                        </Link>
                        <div
                          id='todo-compose'
                          className='hs-overlay hidden ti-modal  [--overlay-backdrop:static]'
                        >
                          <div className='hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out lg:!max-w-4xl lg:w-full m-3 lg:!mx-auto'>
                            <div className='ti-modal-content'>
                              <div className='ti-modal-header'>
                                <h6
                                  className='modal-title text-[1rem] font-semibold'
                                  id='mail-ComposeLabel'
                                >
                                  {changeFlage === true
                                    ? 'Add Site'
                                    : 'Edit Site'}
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
                                      Site Name{' '}
                                      <span className='text-danger'>*</span>
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control '
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
                                  <div className='xl:col-span-6 col-span-6'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Type{' '}
                                      <span className='text-danger'>*</span>
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
                                      Address 1{' '}
                                      <span className='text-danger'>*</span>
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
                                      Country{' '}
                                      <span className='text-danger'>*</span>
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
                                      State{' '}
                                      <span className='text-danger'>*</span>
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
                                      City{' '}
                                      <span className='text-danger'>*</span>
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
                                      Zip Code{' '}
                                      <span className='text-danger'>*</span>
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
                                  {changeFlage === true
                                    ? 'Add Site'
                                    : 'Edit Site'}
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
                                // style={{ cursor: 'pointer' }}
                                style={{
                                  cursor: site.id == -1 ? '' : 'pointer',
                                }}
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
                                    {site?.name ? site.name : 'No site found'}
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
                            <p className='text-center'>No site found</p>{' '}
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
                              key={SingleSite?.site?.id}
                            >
                              <div className='box task-pending-card '>
                                {/* {SingleSite?.user_role_id === 1 ||
                                SingleSite?.user_role_id === 2 ? (
                                  // <div className='hs-dropdown ti-dropdown'>
                                  //   <Link
                                  //     aria-label='anchor'
                                  //     href='#!'
                                  //     className='flex items-center justify-center w-[1.75rem] h-[1.75rem]  !text-[0.8rem] !py-1 !px-2 rounded-sm bg-light border-light shadow-none !font-medium'
                                  //     aria-expanded='false'
                                  //     onClick={(e) => {
                                  //       e.preventDefault(); // Prevent default navigation action
                                  //       e.stopPropagation(); // Prevent click from bubbling up
                                  //     }}
                                  //   >
                                  //     <i className='fe fe-more-vertical text-[0.8rem]'></i>
                                  //   </Link>
                                  //   <ul className='hs-dropdown-menu ti-dropdown-menu hidden'>
                                  //     <li>
                                  //       <button
                                  //         className='ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block'
                                  //         data-bs-toggle='modal'
                                  //         data-hs-overlay='#todo-compose'
                                  //         onClick={(e) => {
                                  //           e.stopPropagation(); // Prevent card click
                                  //           handeledit(SingleSite); // Your function to handle the edit action
                                  //         }}
                                  //       >
                                  //         Edit
                                  //       </button>
                                  //     </li>
                                  //     <li>
                                  //       <button
                                  //         className='ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block'
                                  //         onClick={(e: any) => {
                                  //           e.stopPropagation(); // Prevent card click
                                  //           handelDelete(SingleSite); // Your function to handle the edit action
                                  //         }}
                                  //       >
                                  //         Delete
                                  //       </button>
                                  //     </li>
                                  //   </ul>
                                  // </div>
                                ) : (
                                  ''
                                )} */}

                                <div
                                  className='box-body'
                                  style={{ cursor: 'pointer' }}
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
                                  <div className='flex justify-between items-center flex-wrap gap-2'>
                                    <div className='flex'>
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
                                      <h1
                                        style={{
                                          fontSize: '1.1rem',
                                          fontWeight: 'bold',
                                          marginBottom: '0.5rem',
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
                                    </div>
                                    {SingleSite?.user_role_id === 1 ||
                                    SingleSite?.user_role_id === 2 ? (
                                      <div className='hs-dropdown ti-dropdown'>
                                        <Link
                                          aria-label='anchor'
                                          href='#!'
                                          className='flex items-center justify-center w-[1.75rem] h-[1.75rem]  !text-[0.8rem] !py-1 !px-2 rounded-sm bg-light border-light shadow-none !font-medium'
                                          aria-expanded='false'
                                          onClick={(e) => {
                                            e.preventDefault(); // Prevent default navigation action
                                            e.stopPropagation(); // Prevent click from bubbling up
                                          }}
                                        >
                                          <i className='ri-more-2-line text-[0.8rem]'></i>
                                        </Link>
                                        <ul className='hs-dropdown-menu ti-dropdown-menu hidden'>
                                          <li>
                                            <button
                                              className='ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block'
                                              // href='#!'
                                              style={{ cursor: 'pointer' }}
                                              aria-label='anchor'
                                              data-bs-target='#formmodal'
                                              data-bs-toggle='modal'
                                              data-bs-whatever='@fat'
                                              data-hs-overlay='#todo-compose'
                                              onClick={(e) => {
                                                e.stopPropagation(); // Prevent card click
                                                // setModalOpen(true);
                                                handeledit(SingleSite);
                                              }}
                                            >
                                              Edit
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              className='ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block'
                                              // href='#!'
                                              style={{ cursor: 'pointer' }}
                                              aria-label='anchor'
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handelDelete(SingleSite);
                                              }}
                                            >
                                              Delete Request
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                  <div className=''>
                                    <div>
                                      <ul className='list-group list-group-flush'>
                                        <li className='flex list-group-item fw-semibold'>
                                          <i className='bx bx-map align-middle me-2 text-muted'></i>
                                          <b>Address </b>
                                          <p className='ms-1 over-text text-muted fw-normal d-inline-block'>
                                            {SingleSite?.site && (
                                              <>
                                                {SingleSite?.site?.address1}
                                                {SingleSite?.site?.address2
                                                  ? `, ${SingleSite?.site?.address2}`
                                                  : ''}
                                                {`, ${SingleSite?.site?.city}`}
                                                {`, ${SingleSite?.state}`}
                                                {`, ${SingleSite?.country}`}
                                              </>
                                            )}
                                          </p>
                                        </li>
                                        <li className='list-group-item fw-semibold'>
                                          <i className='bx bx-briefcase align-middle me-2 text-muted'></i>
                                          <b>Owner</b>
                                          <span className='ms-1 text-muted fw-normal d-inline-block'>
                                            {/* {SingleSite?.ownerNames?.join(', ')} */}
                                            {SingleSite?.ownerNames?.length
                                              ? SingleSite.ownerNames.join(', ')
                                              : '--'}
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
                                      {/* {SingleSite?.user_role_id === 1 ||
                                      SingleSite?.user_role_id === 2 ? (
                                        <div className='flex justify-center mt-3'>
                                          <div
                                            style={{ cursor: 'pointer' }}
                                            aria-label='anchor'
                                            data-bs-target='#formmodal'
                                            data-bs-toggle='modal'
                                            data-bs-whatever='@fat'
                                            data-hs-overlay='#todo-compose'
                                            onClick={(e) => {
                                              e.stopPropagation(); // Prevent card click
                                              // setModalOpen(true);
                                              handeledit(SingleSite);
                                            }}
                                            className='ti-btn ti-btn-primary-full ti-btn-wave !gap-0  bg-success/10 text-success hover:bg-success hover:text-white hover:border-success'
                                          >
                                            <i className='ri-edit-line me-1'></i>{' '}
                                            Edit
                                          </div>
                                          <div
                                            style={{ cursor: 'pointer' }}
                                            aria-label='anchor'
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handelDelete(SingleSite);
                                            }}
                                            className='ti-btn ti-btn-danger-full ti-btn-wave !gap-0 !ms-2 bg-danger/10 text-white hover:bg-white hover:text-danger hover:border-danger'
                                          >
                                            <i className='ri-delete-bin-line me-1'></i>{' '}
                                            Delete
                                          </div>
                                        </div>
                                      ) : (
                                        ''
                                      )} */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* )) */}
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
