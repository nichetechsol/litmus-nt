/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { decryptData, encryptData } from '@/helper/Encryption_Decryption';
import InitialsComponent from '@/helper/NameHelper';
import {
  DomainSchema,
  MessageSchema,
  OrganizationNameSchema,
  TypeDropdownSchema,
} from '@/helper/ValidationHelper';
import Seo from '@/shared/layout-components/seo/seo';
import {
  addOrganization,
  fetchOrganizationAndSiteDetails,
  fetchOrganizationTypes,
  getUserRole,
  organizationSidebarList,
} from '@/supabase/org_details';
import { refreshToken } from '@/supabase/session';
import Loader from '@/utils/Loader/Loader';
const validationSchema = Yup.object().shape({
  organizationName: OrganizationNameSchema,
  domains: Yup.array()
    .of(DomainSchema)
    .min(1, 'Domain is required. Please enter a domain.'),
  selectedType: TypeDropdownSchema,
  message: MessageSchema,
});

interface OrganizationWithSiteCount {
  org_id: string;
  org_type_id: string;
  org_name: string;
  sites_count: number;
}

interface organizationSidebarList {
  id: unknown;
  created_at: string;
  description: string;
  name: string;
  type_id: number;
  status: string;
  updated_at: string;
}
interface SidebarOrgs {
  data: organizationSidebarList[];
}
interface Typeor {
  id: number;
  name: string;
  created_at: string;
}

const Page = () => {
  const [tokenVerify, setTokenVerify] = useState(false);
  const [onlyToken, setOnlyToken] = useState('');
  const navigate = useRouter();
  const [organizationName, setOrganizationName] = useState('');
  const [organizationNameError, setOrganizationNameError] = useState('');
  const [domains, setDomains] = useState<any[]>([]);
  const [domainInput, setDomainInput] = useState<string>('');

  const [domainError, setDomainError] = useState('');
  const [typeDropdown, setTypeDropdown] = useState<Typeor[] | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');
  const [typeDropdownError, setTypeDropdownError] = useState('');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const closeModalButtonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [user_id, setuser_id] = useState<any>('');
  const [user_role, setUserrole] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [add_orgUser, setadd_orgUser] = useState<any>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [searchTerm, setSearchTerm] = useState<any>();

  const [orgsWithSites, setOrgsWithSites] = useState<
    OrganizationWithSiteCount[] | null
  >(null);
  const [sidebarOrgs, setSidebarOrgs] = useState<SidebarOrgs | null>({
    data: [],
  });

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const tokens = localStorage.getItem('sb-emsjiuztcinhapaurcrl-auth-token');
      if (!tokens) {
        setTokenVerify(false);
        redirect('/');
      } else {
        setTokenVerify(true);
        const token = JSON.parse(tokens);
        setOnlyToken(token.access_token);
      }
    }
  }, []);
  useEffect(() => {
    const encryptedUserId = localStorage.getItem('user_id');
    const encryptedUserRole = localStorage.getItem('user_role');
    const encryptedemail = localStorage.getItem('user_email');
    const encryptedaddorg = localStorage.getItem('add_orgUser');

    const decryptedUserId = decryptData(encryptedUserId);
    const decryptedUserRole = decryptData(encryptedUserRole);
    const decryptemail = decryptData(encryptedemail);
    const decryptaddorg = decryptData(encryptedaddorg);

    if (decryptedUserId) {
      setuser_id(decryptedUserId);
    }
    if (decryptemail) {
      setEmail(decryptemail);
    }
    if (decryptedUserRole) {
      setUserrole(decryptedUserRole);
    }
    if (decryptaddorg) {
      setadd_orgUser(decryptaddorg);
    }
  }, []);

  //To re-open chipbox default domain open this comment and open all comments of setDomains([defaultDomain])
  // const getDefaultDomainFromEmail = () => {
  //   const email1 = localStorage.getItem('user_email');
  //   const decryptemail = decryptData(email1);

  //   if (decryptemail) {
  //     const domain = decryptemail.split('@')[1];
  //     return domain || '';
  //   }
  //   return '';
  // };
  // useEffect(() => {
  //   // Set the default domain on component mount
  //   const defaultDomain = getDefaultDomainFromEmail();
  //   if (defaultDomain) {
  //     setDomains([defaultDomain]);
  //   }
  // }, []);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        setLoading(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await getUserRole();

        if (data && data.data && data.data.length > 0) {
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].id == user_role) {
              setLoading(false);
            }
          }
        }
      } catch (error: unknown) {
        /* empty */
      }
    };

    fetchData2();
  }, [user_role]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data: any = await fetchOrganizationAndSiteDetails(user_id);

      if (data) {
        setOrgsWithSites(data);
      }
      setLoading(false);
    } catch (error: any) {
      toast.error('Error Fetching Data!!', { autoClose: 3000 });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  const fetchData1 = async () => {
    try {
      const result1: any = await organizationSidebarList(
        searchTerm ? searchTerm : null,
        user_id,
      );
      if (result1.errorCode === 0 && result1.data.length > 0) {
        setSidebarOrgs({ data: result1.data });
      } else if (result1.errorCode === 1) {
        setSidebarOrgs({ data: [] });
      } else {
        if (searchTerm) {
          setSidebarOrgs({
            data: [
              {
                id: -1,
                name: "We couldn't find any organizations",
                created_at: '',
                description: '',
                type_id: 0,
                status: '',
                updated_at: '',
              },
            ],
          });
        } else {
          setSidebarOrgs({ data: [] });
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

  const handleorganizationNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newOrganizationName = e.target.value.trimStart();
    setOrganizationName(newOrganizationName);

    OrganizationNameSchema.validate(newOrganizationName)
      .then(() => {
        setOrganizationNameError('');
      })
      .catch((err: Yup.ValidationError) => {
        setOrganizationNameError(err.message);
      });
  };
  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDomain = e.target.value.trimStart();
    // setDomain(newDomain);
    setDomainInput(newDomain);
    DomainSchema.validate(newDomain)
      .then(() => {
        setDomainError('');
      })
      .catch((err: Yup.ValidationError) => {
        setDomainError(err.message);
      });
  };
  const handleTypeDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newSelectedType = e.target.value;
    setSelectedType(e.target.value);

    TypeDropdownSchema.validate(newSelectedType)
      .then(() => {
        setTypeDropdownError('');
      })
      .catch((err: Yup.ValidationError) => {
        setTypeDropdownError(err.message);
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
  // const addDomain = async (domain: string) => {
  //   if (domains.includes(domain)) {
  //     setDomainError('Domain already added');
  //   } else {
  //     try {
  //       await DomainSchema.validate(domain);
  //       setDomains([...domains, domain]);
  //       setDomainInput('');
  //       setDomainError('');
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         setDomainError(error.message);
  //       } else {
  //         // Handle the case where the error might not be an instance of Error
  //         setDomainError('An unknown error occurred');
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrganizationTypes();

        if (data && data.data) {
          setTypeDropdown(data.data);
        }
      } catch (error: any) {
        toast.error('Error Fetching Type..', { autoClose: 3000 });
      }
    };

    fetchData();
  }, []);

  const validateForm = async () => {
    try {
      await validationSchema.validate(
        { organizationName, domains, selectedType, message },
        { abortEarly: false },
      );
      setOrganizationNameError('');
      setDomainError('');
      setTypeDropdownError('');
      setMessageError('');
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const organizationNameErrorMsg =
          err.inner.find((error) => error.path === 'organizationName')
            ?.message || '';
        const domainErrorMsg =
          err.inner.find((error) => error.path === 'domains')?.message || '';
        const typeDropdownErrorMsg =
          err.inner.find((error) => error.path === 'selectedType')?.message ||
          '';
        const messageErrorMsg =
          err.inner.find((error) => error.path === 'message')?.message || '';
        setOrganizationNameError(organizationNameErrorMsg);
        setDomainError(domainErrorMsg);
        setTypeDropdownError(typeDropdownErrorMsg);
        setMessageError(messageErrorMsg);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (domainInput) {
      setDomainError('Please press Enter');
    } else {
      const isValid = await validateForm();

      if (isValid) {
        const selectedTypeId =
          typeDropdown?.find((type) => type.name === selectedType)?.id ?? null;

        const data: any = {
          user_id: user_id,
          user_role: user_role,
          name: organizationName,
          description: message,
          type_id: selectedTypeId,
          status: 'Y',
          domain: domains,
          token: onlyToken,
          userName: email,
          type_name: selectedType,
        };
        try {
          setLoading(true);
          await refreshToken();
          const result = await addOrganization(data);

          if (result.data != null && result.errorCode == 0) {
            setLoading(false);
            toast.success('Successfully Added organization', {
              autoClose: 3000,
            });
          } else {
            setLoading(false);
            if (result.errorCode === 1) {
              swal(result.data, { icon: 'error' });
            }
          }
          if (closeModalButtonRef.current) {
            closeModalButtonRef.current.click();
          }

          setDomainInput('');
          setOrganizationName('');
          setSelectedType('');
          // const defaultDomain = getDefaultDomainFromEmail();
          // if (defaultDomain) {
          //   setDomains([defaultDomain]);
          // }
          setMessage('');
          setOrganizationNameError('');
          setDomainError('');
          setTypeDropdownError('');
          setMessageError('');
          fetchData();
          fetchData1();
          setDomainError('');
        } catch (error) {
          setLoading(false);
          toast.error('Error Adding Organization', { autoClose: 3000 });
        }
      }
    }
  };

  const addDomain = async () => {
    if (
      (domainError === '' || domainError === 'Please press Enter') &&
      domainInput.trim() !== ''
    ) {
      const domainsArray = domainInput.endsWith(',')
        ? domainInput
            .split(',')
            .map((domain) => domain.trim())
            .filter((domain) => domain !== '')
        : domainInput.split(',').map((domain) => domain.trim());
      const newDomains = [];
      let errorMessage = '';
      const seenDomains = new Set();

      for (const domain of domainsArray) {
        if (domains.includes(domain)) {
          errorMessage += `Domain ${domain} already added. `;
        } else if (seenDomains.has(domain)) {
          errorMessage += `Domain ${domain} repeated. `;
        } else {
          seenDomains.add(domain);
          try {
            await DomainSchema.validate(domain);
            newDomains.push(domain);
          } catch (error) {
            if (error instanceof Error) {
              errorMessage += `${error.message} for domain ${domain}. `;
            } else {
              errorMessage += `An unknown error occurred for domain ${domain}. `;
            }
          }
        }
      }
      if (errorMessage === '') {
        setDomains([...domains, ...newDomains]);
        setDomainInput('');
        setDomainError('');
      } else {
        setDomainError(errorMessage.trim());
      }
    } else {
      handleSubmit();
    }
  };
  const handleKeyPress = async (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await addDomain();
    }
  };
  const handleDomainPlus = async () => {
    DomainSchema.validate(domainInput)
      .then(async () => {
        setDomainError('');
        await addDomain();
      })
      .catch((err: Yup.ValidationError) => {
        setDomainError(err.message);
      });
  };
  //   const removeDomain = (domain: string) => {
  //     setDomains(domains.filter(d => d !== domain));
  //     // const updatedDomains = domains.filter(d => d !== domain);
  //     // setDomains(updatedDomains);
  //     // if (updatedDomains.length == 0) {
  //     //   setDomainError('Domain is required. Please enter a domain.');
  //     // } else {
  //     //   setDomainError('');
  //     // }
  // };

  const removeDomain = (index: number) => {
    const newdom = domains.filter((i, idx) => idx != index);
    if (newdom.length == 0) {
      setDomainError('Domain is required. Please enter a domain.');
    } else {
      setDomainError('');
    }
    setDomains(newdom);
  };
  useEffect(() => {
    /* */
  }, [domains]);

  return (
    <>
      {loading && <Loader />}
      {tokenVerify && (
        <>
          <ToastContainer />
          <Seo title='organization' />
          <div className='grid grid-cols-12 gap-6 mt-5'>
            <div className='xl:col-span-3 col-span-12'>
              <div className='box'>
                <div className='box-body !p-0'>
                  {add_orgUser === 'true' && (
                    <div className='p-4 grid border-b border-dashed dark:border-defaultborder/10'>
                      <Link
                        href=''
                        className='hs-dropdown-toggle py-2  px-3 ti-btn bg-primary text-white !font-medium w-full !mb-0'
                        data-hs-overlay='#todo-compose'
                        onClick={() => setModalOpen(true)}
                      >
                        <i className='ri-add-circle-line !text-[1rem]'></i>Add
                        Organization
                      </Link>
                      {modalOpen && modalOpen ? (
                        <div
                          id='todo-compose'
                          // className='hs-overlay hidden ti-modal open'
                          className='hs-overlay hidden ti-modal  [--overlay-backdrop:static]'
                        >
                          <div className='hs-overlay-open:mt-7  ti-modal-box mt-0 ease-out'>
                            <div className='ti-modal-content'>
                              <div className='ti-modal-header'>
                                <h6
                                  className='modal-title text-[1rem] font-semibold'
                                  id='mail-ComposeLabel'
                                >
                                  Add Organization
                                </h6>
                                <button
                                  type='button'
                                  className='hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor'
                                  data-hs-overlay='#todo-compose'
                                  ref={closeModalButtonRef}
                                  onClick={() => {
                                    setDomainInput('');
                                    setOrganizationName('');
                                    setSelectedType('');
                                    // const defaultDomain =
                                    //   getDefaultDomainFromEmail();
                                    // if (defaultDomain) {
                                    //   setDomains([defaultDomain]);
                                    // }
                                    setDomains([]);
                                    setMessage('');
                                    setOrganizationNameError('');
                                    setDomainError('');
                                    setTypeDropdownError('');
                                    setMessageError('');
                                    // fetchData();
                                    // fetchData1();
                                  }}
                                >
                                  <span className='sr-only'>Close</span>
                                  <i className='ri-close-line'></i>
                                </button>
                              </div>

                              <div className='ti-modal-body !overflow-visible px-4'>
                                <div className='grid grid-cols-12 gap-2'>
                                  <div className='xl:col-span-12 col-span-12'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Organization Name{' '}
                                      <span className='text-danger'>*</span>
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control w-full'
                                      id='task-name'
                                      placeholder='Enter Organization Name'
                                      onChange={handleorganizationNameChange}
                                      onKeyDown={handleKeyPress}
                                      value={organizationName}
                                      maxLength={256}
                                    />
                                    {organizationNameError && (
                                      <div className='text-danger'>
                                        {organizationNameError}
                                      </div>
                                    )}
                                  </div>
                                  <div className='xl:col-span-12 col-span-12'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Domains{' '}
                                      <span className='text-danger'>*</span>{' '}
                                      <small className='form-text text-muted'>
                                        (Separate Domain with a comma, and press
                                        enter to add them to your list)
                                      </small>
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control w-full'
                                      id='task-name'
                                      placeholder={`For eg: ${
                                        email.split('@')[1]
                                      }`}
                                      onChange={handleDomainChange}
                                      onKeyDown={handleKeyPress}
                                      value={domainInput}
                                      maxLength={255}
                                    />
                                    <button
                                      type='button'
                                      className='ti-btn bg-primary text-white ml-2'
                                      onClick={handleDomainPlus}
                                    >
                                      +
                                    </button>
                                    {domainError && (
                                      <div className='text-danger'>
                                        {domainError}
                                      </div>
                                    )}
                                  </div>
                                  {/* <div className='flex justify-between mt-4'> */}
                                  <div className='xl:col-span-12 col-span-12'>
                                    <div className='grid grid-cols-12 gap-2'>
                                      {domains &&
                                        domains.map((domain: any, index) => (
                                          // eslint-disable-next-line react/jsx-key
                                          <div
                                            key={index}
                                            className='xl:col-span-6 col-span-6 alert alert-solid-primary alert-dismissible fade show flex'
                                            role='alert'
                                            id='dismiss-alert2'
                                          >
                                            <div className='sm:flex-shrink-0 domain-name-div'>
                                              {domain}
                                            </div>
                                            <div className='ms-auto'>
                                              <div className='mx-1 my-1'>
                                                <button
                                                  type='button'
                                                  className='inline-flex bg-teal-50 rounded-sm text-teal-500 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-teal-50 focus:ring-teal-600'
                                                  // data-hs-remove-element='#dismiss-alert2'
                                                  onClick={() =>
                                                    removeDomain(index)
                                                  }
                                                  //   onClick={()=>{
                                                  //     domains.splice(index, 1);
                                                  //   setDomains(domains);
                                                  // }}
                                                >
                                                  <span className='sr-only'>
                                                    Dismiss
                                                  </span>
                                                  <svg
                                                    className='h-3 w-3'
                                                    width='16'
                                                    height='16'
                                                    viewBox='0 0 16 16'
                                                    fill='none'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    aria-hidden='true'
                                                  >
                                                    <path
                                                      d='M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z'
                                                      fill='currentColor'
                                                    ></path>
                                                  </svg>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      {/* <div className="alert alert-solid-primary alert-dismissible !ms-2 fade show flex" role="alert" id="dismiss-alert2"><div className="sm:flex-shrink-0"> A simple </div><div className="ms-auto"><div className="mx-1 my-1"><button type="button" className="inline-flex bg-teal-50 rounded-sm text-teal-500 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-teal-50 focus:ring-teal-600" data-hs-remove-element="#dismiss-alert2"><span className="sr-only">Dismiss</span><svg className="h-3 w-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor"></path></svg></button></div></div></div>
                                                             <div className="alert alert-solid-primary alert-dismissible !ms-2 fade show flex" role="alert" id="dismiss-alert2"><div className="sm:flex-shrink-0"> A simple </div><div className="ms-auto"><div className="mx-1 my-1"><button type="button" className="inline-flex bg-teal-50 rounded-sm text-teal-500 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-teal-50 focus:ring-teal-600" data-hs-remove-element="#dismiss-alert2"><span className="sr-only">Dismiss</span><svg className="h-3 w-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor"></path></svg></button></div></div></div> */}
                                    </div>
                                  </div>
                                  <div className='xl:col-span-12 col-span-12'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Type{' '}
                                      <span className='text-danger'>*</span>
                                    </label>
                                    <select
                                      className='form-select'
                                      value={selectedType}
                                      onChange={handleTypeDropdownChange}
                                    >
                                      <option value='' hidden>
                                        Select Type
                                      </option>
                                      {typeDropdown &&
                                        typeDropdown.map((type) => (
                                          <option
                                            key={type.id}
                                            value={type.name}
                                          >
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

                                  <div className='xl:col-span-12 col-span-12'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Description
                                    </label>
                                    <textarea
                                      className='form-control w-full'
                                      id='task-name'
                                      placeholder='Enter Description'
                                      onChange={handleMessageChange}
                                      onKeyDown={handleKeyPress}
                                      value={message}
                                      style={{ resize: 'none' }}
                                      maxLength={1000}
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
                                  onClick={() => {
                                    setDomainInput('');
                                    setOrganizationName('');
                                    setSelectedType('');
                                    // const defaultDomain =
                                    //   getDefaultDomainFromEmail();
                                    // if (defaultDomain) {
                                    //   setDomains([defaultDomain]);
                                    // }
                                    setDomains([]);
                                    setMessage('');
                                    setOrganizationNameError('');
                                    setDomainError('');
                                    setTypeDropdownError('');
                                    setMessageError('');
                                    // fetchData();
                                    // fetchData1();
                                  }}
                                >
                                  Cancel
                                </button>
                                <button
                                  type='button'
                                  className='ti-btn bg-primary text-white !font-medium'
                                  onClick={handleSubmit}
                                >
                                  Create
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                  <div className='p-4 border-b border-dashed dark:border-defaultborder/10'>
                    <div className='input-group' style={{ cursor: 'pointer' }}>
                      <input
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e?.target?.value)}
                        className='form-control w-full !rounded-md !bg-light border-0 !rounded-e-none'
                        placeholder='Search Organization'
                        aria-describedby='button-addon2'
                      />
                      <button
                        type='button'
                        aria-label='button'
                        className='ti-btn ti-btn-light !rounded-s-none !mb-0'
                        id='button-addon2'
                      >
                        <i className='ri-search-line text-[#8c9097] dark:text-white/50'></i>
                      </button>
                    </div>
                  </div>
                  <div className='p-4 task-navigation border-b border-dashed dark:border-defaultborder/10'>
                    <ul className='list-none task-main-nav mb-0'>
                      {/* <li className="!px-0 !pt-0">
                                        <span className="text-[.6875rem] text-[#8c9097] dark:text-white/50 opacity-[0.7] font-semibold"> Organization</span>
                                    </li> */}

                      {sidebarOrgs && (
                        <div>
                          {sidebarOrgs &&
                            sidebarOrgs.data.map((org) => (
                              <li
                                style={{
                                  cursor: org.id == -1 ? '' : 'pointer',
                                }}
                                key={org.id as number}
                                onClick={() => {
                                  if (org.id != -1) {
                                    setLoading(true);
                                    const encryptedOrgId = encryptData(
                                      org.id as string,
                                    );
                                    const encryptedOrgName = encryptData(
                                      org.name,
                                    );
                                    localStorage.setItem(
                                      'org_id',
                                      encryptedOrgId,
                                    );
                                    localStorage.setItem(
                                      'org_name',
                                      encryptedOrgName,
                                    );
                                    navigate.push('/orgdashboard');
                                    setLoading(false);
                                  }
                                }}
                                // onClick={() => {
                                //   localStorage.setItem(
                                //     'org_id',
                                //     org.id as string,
                                //   );
                                //   localStorage.setItem('org_name', org.name);
                                // }}
                              >
                                <div className='flex items-center'>
                                  {/* <span className="me-2 leading-none">
                                            <i className="ri-task-line align-middle text-[.875rem]"></i>
                                        </span> */}
                                  <span className='flex-grow'>{org?.name}</span>
                                  {/* <span className="badge bg-success/10 text-success rounded-full">167</span> */}
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
                            Organizations
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='xl:col-span-12 col-span-12'>
                  <div
                    className='grid grid-cols-12 gap-x-6'
                    id='tasks-container'
                  >
                    {orgsWithSites &&
                      orgsWithSites.map((org) => (
                        <div
                          className='xl:col-span-4 col-span-12 task-card'
                          key={org.org_id}
                          onClick={() => {
                            const encryptedOrgId = encryptData(org.org_id);
                            const encryptedOrgName = encryptData(org.org_name);
                            const encryptOrgTypeId = encryptData(
                              org.org_type_id,
                            );
                            localStorage.setItem('org_id', encryptedOrgId);
                            localStorage.setItem('org_name', encryptedOrgName);
                            localStorage.setItem(
                              'org_type_id',
                              encryptOrgTypeId,
                            );
                            navigate.push('/orgdashboard');
                          }}
                        >
                          <div style={{ cursor: 'pointer' }} className='box'>
                            <div className='box-body contact-action'>
                              <div className='flex items-start '>
                                <div className='flex flex-grow flex-wrap gap-2'>
                                  <div className='avatar avatar-xl avatar-rounded me-3'>
                                    <span className='inline-flex items-center justify-center !w-[2.75rem] !h-[2.75rem] leading-[2.75rem] text-[0.85rem]  rounded-full text-success bg-success/10 font-semibold'>
                                      {/* {SingleSite?.site?SingleSite?.site?.name[0].toUpperCase(): ""} */}
                                      {org.org_name ? (
                                        <InitialsComponent
                                          name={org.org_name}
                                        />
                                      ) : (
                                        ''
                                      )}
                                    </span>
                                    {/* <img src="../../../assets/images/faces/4.jpg" alt={org.org_name?org.org_name[0].toUpperCase(): ""} /> */}
                                    {/* <h4>
                                      {' '}
                                      <i className='ri-building-fill text-black'>dd</i>
                                    </h4> */}
                                  </div>
                                  <div>
                                    <h6 className=' mb-1 font-semibold text-[1rem] text-site-name'>
                                      {' '}
                                      {org?.org_name}{' '}
                                    </h6>
                                    <p className='mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate'>
                                      {org?.sites_count} sites
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    {/* <div className="xl:col-span-4 col-span-12 task-card">
                                        <div className="box">
                <div className="box-body contact-action">

                    <div className="flex items-start ">
                        <div className="flex flex-grow flex-wrap gap-2">
                            <div className="avatar avatar-xl avatar-rounded me-3">
                                <img src="../../../assets/images/faces/4.jpg" alt="" />
                            </div>
                            <div>
                                <h6 className=" mb-1 font-semibold text-[1rem]"> Melissa Jane </h6>
                                <p className="mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate">melissajane2134@gmail.com</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </div>

            <div className="xl:col-span-4 col-span-12 task-card">
                                        <div className="box">
                <div className="box-body contact-action">

                    <div className="flex items-start ">
                        <div className="flex flex-grow flex-wrap gap-2">
                            <div className="avatar avatar-xl avatar-rounded me-3">
                                <img src="../../../assets/images/faces/4.jpg" alt="" />
                            </div>
                            <div>
                                <h6 className=" mb-1 font-semibold text-[1rem]"> Melissa Jane </h6>
                                <p className="mb-1 text-[#8c9097] dark:text-white/50 contact-mail text-truncate">melissajane2134@gmail.com</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
