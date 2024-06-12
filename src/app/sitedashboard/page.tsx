/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import moment from 'moment';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Pagination from 'react-js-pagination';
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { decryptData } from '@/helper/Encryption_Decryption';
import { emailSchema, nameSchema, roleSchema } from '@/helper/ValidationHelper';
import { getUserRole } from '@/supabase/org_details';
import { listLitmusProducts } from '@/supabase/products';
import {
  addUserToSites,
  modifyUserOfSites,
  removeUserFromSites,
} from '@/supabase/site_users';
import {
  allSitesOfUsers,
  entitlementSite,
  licenceData,
  sitesCounts,
} from '@/supabase/sitedashboard';
import listSolutions from '@/supabase/solutions';
import Loader from '@/utils/Loader/Loader';

import { TopCompanies } from '../../shared/data/dashboards/jobsdata';
interface licenseData {
  id: number;
  type: number;
  created_at: string;
  created_by: number;
  exipry: string;
  licence_number: string;
  licence_type_name: string;
  site_id: number;
}
interface Products {
  data: {
    FileName: string;
    downloadLink: string;
  };
  errorCode: number;
  folder: string;
}
interface Entitlement {
  id: number;
  entitlementName: string;
  entitlementValue: number;
  created_at: string;
  entitlement_name_id: number;
  entitlement_value_id: number;
  licence_tier_id: number;
  org_id: number;
  site_id: number;
  support_level_id: number;
}
interface OrgUser {
  id: any;
  firstname: any;
  lastname: any;
  email: React.ReactNode;
  role_name: React.ReactNode;
  user_id: any;
}
interface roles {
  id: string;
  name: string;
  created_at: any;
}
interface about_site {
  about_site: string;
  created_at: string;
}
const validationSchema = Yup.object().shape({
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  role: roleSchema,
});
const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenVerify, setTokenVerify] = useState(false);
  const [licence, setLicence] = useState<licenseData[] | null>(null);
  const [orgUserData, setOrgUserData] = useState<OrgUser[]>([]);
  const [changeFlage, setChangeFlage] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [role, setRole] = useState('');
  const [roleError, setRoleError] = useState('');
  const [userNameId, setUserNameId] = useState('');
  const [roles, setRoles] = useState<roles[] | null>(null);
  const closeModalButtonRef = useRef<HTMLButtonElement>(null);
  const [search, setsearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [perPage] = useState(10);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const [entitlementListData, setEntitlementListData] = useState<
    Entitlement[] | null
  >(null);
  const [totalItemsCount2, setTotalItemsCount2] = useState(0);
  const [activePage2, setActivePage2] = useState(1);
  const [perPage2] = useState(10);
  const [products, setProducts] = useState<Products[] | null>(null);
  const [solutions, setSolution] = useState<Products[] | null>(null);
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('sb-emsjiuztcinhapaurcrl-auth-token');
      if (!token) {
        setTokenVerify(false);
        redirect('/');
      } else {
        setTokenVerify(true);
      }
    }
  }, []);
  const [user_id, setuser_id] = useState<any>('');
  const [org_id, setorg_id] = useState<any>('');
  const [site_id, setsite_id] = useState<any>('');
  const [site_name, setSite_name] = useState<any>('');
  const [site_owner_name, SetSite_owner_name] = useState<any>('');
  useEffect(() => {
    const userid = decryptData(localStorage.getItem('user_id'));
    const orgid = decryptData(localStorage.getItem('org_id'));
    const siteid = decryptData(localStorage.getItem('site_id'));
    const sitename = decryptData(localStorage.getItem('site_name'));
    const siteownername = decryptData(localStorage.getItem('site_owner_name'));
    setuser_id(userid);
    setorg_id(orgid);
    setsite_id(siteid);
    setSite_name(sitename);
    SetSite_owner_name(siteownername);
  }, []);
  const [siteCountData, setSiteCountData] = useState<{
    data: {
      licencesCount: number;
      sandboxesCount: number;
      usersCount: number;
      productCount: number;
      sites_details: about_site[];
    };
    errorCode: number;
    message: string;
  } | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const start: any = (activePage2 - 1) * perPage2; // Calculate start index
        const end: any = start + perPage2 - 1;
        if (site_id) {
          setLoading(true);
          const data: any = await entitlementSite(site_id, start, end);
          if (data) {
            setEntitlementListData(data?.data);
            setTotalItemsCount2(data.totalCount); // Set total items count for pagination
            setLoading(false);
          } else {
            // console.log("No organization details found.");
          }
        }
      } catch (error: any) {
        // console.error("Error fetching organization details:", error.message);
      }
    };
    fetchData();
  }, [site_id, activePage2, perPage2]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        if (site_id && org_id) {
          const data: any = await sitesCounts(site_id, org_id);
          setSiteCountData(data);
          // setLoading(false);
        }
      } catch (error: any) {
        // console.error("Error fetching organization details:", error.message);
      }
    };
    fetchData();
  }, [org_id, site_id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const data: any = await licenceData(site_id);
        setLicence(data.data);
        // setLoading(false);
      } catch (error: any) {
        // console.error("Error fetching organization details:", error.message);
      }
    };
    fetchData();
  }, [site_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data: any = await listSolutions();
        if (data) {
          setSolution(data.data);
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        // console.error("Error fetching organization details:", error.message);
      }
    };
    fetchData();
  }, []);

  const fetchUserData = async () => {
    try {
      const start: any = (activePage - 1) * perPage; // Calculate start index
      const end: any = start + perPage - 1;
      if (site_id) {
        // setLoading(true);
        const data: any = await allSitesOfUsers(site_id, search, start, end);
        setOrgUserData(data.data);
        setTotalItemsCount(data.totalCount);
        // setLoading(false);
      }
    } catch (error: any) {
      // console.error("Error fetching organization details:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [site_id, activePage, search]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (site_id) {
          const result1: any = await listLitmusProducts(site_id); // Replace with your actual API call

          if (result1) {
            setProducts(result1.data);
            setLoading(false);
          }
        }
      } catch (error: any) {
        setLoading(false);
        // console.error("Error fetching roles:", error.message);
      }
    };

    fetchData();
  }, [site_id]);
  const handleFiledClear = () => {
    setEmailError('');
    setFirstNameError('');
    setLastNameError('');
    setRoleError('');
  };
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // setLoading(true);

        const result1: any = await getUserRole(); // Replace with your actual API call

        if (result1 && result1.data) {
          setRoles(result1.data);
          // setLoading(false);
        }
      } catch (error: any) {
        // setLoading(false);
        // console.error("Error fetching roles:", error.message);
      }
    };

    fetchRoles();
  }, []);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value.trim();
    setEmail(newEmail);

    emailSchema
      .validate(newEmail)
      .then(() => setEmailError(''))
      .catch((err: Yup.ValidationError) => setEmailError(err.message));
  };
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFirstName = e.target.value.trim().replace(/[^a-zA-Z]/g, '');
    setFirstName(newFirstName);

    nameSchema
      .validate(newFirstName)
      .then(() => setFirstNameError(''))
      .catch((err: Yup.ValidationError) => setFirstNameError(err.message));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLastName = e.target.value.trim().replace(/[^a-zA-Z]/g, '');
    setLastName(newLastName);

    nameSchema
      .validate(newLastName)
      .then(() => setLastNameError(''))
      .catch((err: Yup.ValidationError) => setLastNameError(err.message));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setRole(newRole);

    roleSchema
      .validate(newRole)
      .then(() => setRoleError(''))
      .catch((err: Yup.ValidationError) => setRoleError(err.message));
  };
  const validateForm = async () => {
    try {
      await validationSchema.validate(
        { email, firstName, lastName, role },
        { abortEarly: false },
      );
      setEmailError('');
      setFirstNameError('');
      setLastNameError('');
      setRoleError('');
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const emailErrorMsg =
          err.inner.find((error) => error.path === 'email')?.message || '';
        const firstNameErrorMsg =
          err.inner.find((error) => error.path === 'firstName')?.message || '';
        const lastNameErrorMsg =
          err.inner.find((error) => error.path === 'lastName')?.message || '';
        const roleErrorMsg =
          err.inner.find((error) => error.path === 'role')?.message || '';

        setEmailError(emailErrorMsg);
        setFirstNameError(firstNameErrorMsg);
        setLastNameError(lastNameErrorMsg);
        setRoleError(roleErrorMsg);
      }
      return false;
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    const isValid = await validateForm();
    if (isValid) {
      try {
        let result;
        if (changeFlage) {
          const userData: any = {
            email: email,
            firstname: firstName,
            lastname: lastName,
            role_id: role,
            org_id: org_id,
            user_id: user_id,
          };
          result = await addUserToSites(userData);
          if (result.errorCode == 0) {
            toast.success(result.data, { autoClose: 3000 });
            const button = document.getElementById('close-modal-btn');
            if (button) {
              button.click();
            }
          } else {
            toast.error('User was not in Central V2', { autoClose: 3000 });
            const button = document.getElementById('close-modal-btn');
            if (button) {
              button.click();
            }
          }
        } else {
          const userData: any = {
            email: email,
            firstname: firstName,
            lastname: lastName,
            role_id: role,
            user_id: userNameId,
            site_id: site_id,
          };
          result = await modifyUserOfSites(userData);
          if (result.errorCode == 0) {
            toast.success('Updated Successfully', { autoClose: 3000 });
            const button = document.getElementById('close-modal-btn');
            if (button) {
              button.click(); // Directly trigger click event on button
            }
          } else {
            toast.error("Couldn't Update", { autoClose: 3000 });
            const button = document.getElementById('close-modal-btn');
            if (button) {
              button.click(); // Directly trigger click event on button
            }
          }
        }

        if (closeModalButtonRef.current) {
          closeModalButtonRef.current.click();
        }
        fetchUserData();

        setLoading(false);
      } catch (error) {
        setLoading(false);
        // console.error("API call failed:", error);
        // setLoading(false);
      }
    } else {
      setLoading(false);
      // console.log('isValid', isValid);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  const handleEdit = (user: any) => {
    setChangeFlage(false);
    setUserNameId(user.user_id);
    setEmail(user.email);
    setFirstName(user.firstname);
    setLastName(user.lastname);
    setRole(user.role_id);
    setsite_id(user.site_id);
  };
  const handleAddUser = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setRole('');
    setChangeFlage(true);
  };
  const handleDelete = (id: any) => {
    swal({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    }).then(async (willDelete: any) => {
      if (willDelete) {
        try {
          setLoading(true);
          const response = await removeUserFromSites(id, site_id);
          if (response.errorCode === 0 && response.data) {
            swal(response.data, { icon: 'success' });
            fetchUserData();
            setLoading(false);
            // Optionally, update your state or refetch data here
          } else {
            swal('Error deleting record!', { icon: 'error' });
            setLoading(false);
          }
        } catch (error) {
          swal('Unexpected error occurred!', { icon: 'error' });
          setLoading(false);
        }
      }
    });
  };
  return (
    <>
      {loading && <Loader />}
      {tokenVerify && (
        <>
          <ToastContainer />
          <div className='md:flex block items-center justify-between my-[1.5rem] page-header-breadcrumb'>
            <div>
              <p className='font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 '>
                Site Dashboard({site_name})
              </p>
              {/* <p className="font-normal text-[#8c9097] dark:text-white/50 text-[0.813rem]">Track your sales activity, leads and deals here.</p> */}
            </div>
          </div>
          <div className='grid grid-cols-12 gap-x-6'>
            <div className='xxl:col-span-12 xl:col-span-12  col-span-12'>
              <div className='grid grid-cols-12 gap-x-6'>
                <div className='xxl:col-span-12  xl:col-span-12  col-span-12'>
                  <div className='grid grid-cols-12 gap-x-6'>
                    <div className='xxl:col-span-3 xl:col-span-3 col-span-12'>
                      <div className='box overflow-hidden'>
                        <div className='box-body'>
                          <div className='flex items-top justify-between'>
                            <div>
                              <span className='!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-primary'>
                                <i className='ri-group-line text-[1rem] text-white'></i>
                              </span>
                            </div>
                            <div className='flex-grow ms-4'>
                              <div className='flex items-center justify-between flex-wrap'>
                                <div>
                                  <p className='text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0'>
                                    Number of Users
                                  </p>
                                  <h4 className='font-semibold  text-[1.5rem] !mb-2 '>
                                    {siteCountData
                                      ? siteCountData.data.usersCount
                                      : 0}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='xxl:col-span-3 xl:col-span-3 col-span-12'>
                      <div className='box overflow-hidden'>
                        <div className='box-body'>
                          <div className='flex items-top justify-between'>
                            <div>
                              <span className='!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-primary'>
                                <i className='ri-profile-line text-[1rem] text-white'></i>
                              </span>
                            </div>
                            <div className='flex-grow ms-4'>
                              <div className='flex items-center justify-between flex-wrap'>
                                <div>
                                  <p className='text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0'>
                                    Number of Licences
                                  </p>
                                  <h4 className='font-semibold  text-[1.5rem] !mb-2 '>
                                    {siteCountData
                                      ? siteCountData.data.licencesCount
                                      : 0}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='xxl:col-span-3 xl:col-span-3 col-span-12'>
                      <div className='box overflow-hidden'>
                        <div className='box-body'>
                          <div className='flex items-top justify-between'>
                            <div>
                              <span className='!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-secondary'>
                                <i className='ri-product-hunt-line text-[1rem] text-white'></i>
                              </span>
                            </div>
                            <div className='flex-grow ms-4'>
                              <div className='flex items-center justify-between flex-wrap'>
                                <div>
                                  <p className='text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0'>
                                    Number of Products
                                  </p>
                                  <h4 className='font-semibold text-[1.5rem] !mb-2 '>
                                    {siteCountData
                                      ? siteCountData.data.productCount
                                      : 0}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='xxl:col-span-3 xl:col-span-3 col-span-12'>
                      <div className='box overflow-hidden'>
                        <div className='box-body'>
                          <div className='flex items-top justify-between'>
                            <div>
                              <span className='!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-success'>
                                <i className='ri-mail-send-line text-[1rem] text-white'></i>
                              </span>
                            </div>
                            <div className='flex-grow ms-4'>
                              <div className='flex items-center justify-between flex-wrap'>
                                <div>
                                  <p className='text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0'>
                                    Number of Sandbox
                                  </p>
                                  <h4 className='font-semibold text-[1.5rem] !mb-2 '>
                                    {siteCountData
                                      ? siteCountData.data.sandboxesCount
                                      : 12}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='xxl:col-span-12 xl:col-span-12  col-span-12'>
                  <div className='box'>
                    <div className='box-header flex justify-between'>
                      <div className='box-title'>About Site</div>
                    </div>
                    <div className='box-body'>
                      <div className='ms-6'>
                        {siteCountData &&
                        siteCountData.data.sites_details[0].about_site ? (
                          <h5 className='text-[1.25rem] text-defaulttextcolor dark:text-defaulttextcolor/70 font-medium'>
                            About Site
                          </h5>
                        ) : (
                          ''
                        )}

                        <p className='text-[#8c9097] dark:text-white/50 text-[.875rem]'>
                          {siteCountData
                            ? siteCountData.data.sites_details[0].about_site
                            : ''}
                        </p>
                        {/* <p className='text-[#8c9097] dark:text-white/50 text-[.875rem]'>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Adipisci quos sint, officia vel ab perferendis,
                          dolores placeat dolor aliquam debitis eius, illum
                          ullam ratione blanditiis fugiat omnis beatae odio
                          vitae!
                        </p> */}
                      </div>
                      <div className='xl:col-span-12 col-span-12  mt-5 container !mx-auto !justify-center !items-center '>
                        <div className='box text-default shadow border dark:border-defaulttextcolor/10'>
                          <div className='box-body !p-0'>
                            <div className='sm:grid grid-cols-12'>
                              <div className='xl:col-span-3 xxl:col-span-3 lg:col-span-3 md:col-span-3 col-span-3 about-company-stats-border'>
                                <div className='text-center p-6 w-full h-full flex items-center justify-center'>
                                  <span className='font-semibold me-2'>
                                    {site_owner_name ? 'Owner:' : ''}
                                  </span>
                                  <p className='text-[#8c9097] dark:text-white/50 text-[.875rem]'>
                                    {' '}
                                    {site_owner_name ? site_owner_name : ''}
                                  </p>
                                </div>
                              </div>
                              {/* <div className='xl:col-span-3 xxl:col-span-3 lg:col-span-3 md:col-span-3 col-span-3 about-company-stats-border'>
                                <div className='text-center p-6 w-full h-full flex items-center justify-center'>
                                  <div>
                                    <span className='font-semibold'>
                                      Budget
                                    </span>
                                    <p className='text-dark text-[2rem] mb-0'>
                                      <span
                                        className='count-up'
                                        data-count='21'
                                      >
                                        {' '}
                                        123
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div> */}
                              <div className='xl:col-span-3 xxl:col-span-3 lg:col-span-3 md:col-span-3 col-span-3'>
                                <div className='text-center p-6 w-full h-full flex items-center justify-center'>
                                  <span className='font-semibold'>
                                    {siteCountData &&
                                    siteCountData.data.sites_details[0]
                                      .created_at
                                      ? 'Created:'
                                      : ''}
                                  </span>
                                  {/* <p className='text-dark text-[2rem] mb-0'>
                                      <span
                                        className='count-up'
                                        data-count='21'
                                      > */}
                                  <p className='text-[#8c9097] dark:text-white/50 text-[.875rem]'>
                                    {' '}
                                    {siteCountData
                                      ? siteCountData.data.sites_details[0].created_at.split(
                                          'T',
                                        )[0]
                                      : ''}
                                    {/* </span> */}
                                  </p>
                                </div>
                              </div>
                              {/* <div className='xl:col-span-3 xxl:col-span-3 lg:col-span-3 md:col-span-3 col-span-3'>
                                <div className='text-center p-6 w-full h-full flex items-center justify-center'>
                                  <div>
                                    <span className='font-semibold'>
                                      End Date
                                    </span>
                                    <p className='text-dark text-[2rem] mb-0'>
                                      <span
                                        className='count-up'
                                        data-count='21'
                                      >
                                        {' '}
                                        123
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='xxl:col-span-6 xl:col-span-6  col-span-12'>
                  <div className='box'>
                    <div className='box-header flex justify-between'>
                      <div className='box-title'>Licence</div>
                      {/* <div className='hs-dropdown ti-dropdown'>
                        <Link
                          href=''
                          className='hs-dropdown-toggle py-2  px-3 ti-btn  ti-btn-w-sm bg-primary text-white !font-medium w-full !mb-0'
                          data-hs-overlay='#todo-compose'
                        >
                          <i className='ri-add-circle-line !text-[1rem]'></i>Add
                          License
                        </Link>
                        <div
                          id='todo-compose'
                          className='hs-overlay hidden ti-modal'
                        >
                          <div className='hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out'>
                            <div className='ti-modal-content'>
                              <div className='ti-modal-header'>
                                <h6
                                  className='modal-title text-[1rem] font-semibold'
                                  id='mail-ComposeLabel'
                                >
                                  Add User
                                </h6>
                                <button
                                  type='button'
                                  className='hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor'
                                  data-hs-overlay='#todo-compose'
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
                                      Email
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control w-full'
                                      id='task-name'
                                      placeholder='Task Name'
                                    />
                                  </div>

                                  <div className='xl:col-span-12 col-span-12'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      First Name
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control w-full'
                                      id='task-name'
                                      placeholder='Task Name'
                                    />
                                  </div>
                                  <div className='xl:col-span-12 col-span-12'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Last Name
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control w-full'
                                      id='task-name'
                                      placeholder='Task Name'
                                    />
                                  </div>

                                  <div className='xl:col-span-12 col-span-12'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Role
                                    </label>
                                    <select className='form-select'>
                                      <option>No options</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className='ti-modal-footer'>
                                <button
                                  type='button'
                                  className='hs-dropdown-toggle ti-btn  ti-btn-light align-middle'
                                  data-hs-overlay='#todo-compose'
                                >
                                  Cancel
                                </button>
                                <button
                                  type='button'
                                  className='ti-btn bg-primary text-white !font-medium'
                                >
                                  Add User
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <div className='box-body'>
                      <ul className='list-none crm-top-deals mb-0'>
                        {licence && licence.length > 0
                          ? licence.map((user, index) => (
                              <li className='mb-[0.9rem]' key={index}>
                                <div className='flex items-start flex-wrap'>
                                  <div className='me-2'>
                                    <span className='!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-primary'>
                                      <i className='ri-profile-line text-[1rem] text-white'></i>
                                    </span>
                                  </div>
                                  <div className='flex-grow'>
                                    <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                      {user.licence_number}
                                    </p>
                                    <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                      {user.exipry}
                                    </p>
                                  </div>
                                  <div className='font-semibold text-[0.9375rem] '>
                                    <h1>
                                      {' '}
                                      {moment().isAfter(user.exipry) ? (
                                        <span className='badge bg-danger text-white'>
                                          Expired
                                        </span>
                                      ) : (
                                        <span className='badge bg-primary text-white'>
                                          Active
                                        </span>
                                      )}
                                      {/* <span className='badge bg-primary text-white'>
                                        Active
                                      </span> */}
                                    </h1>
                                  </div>
                                </div>
                              </li>
                            ))
                          : null}

                        {/* <li className="mb-[0.9rem]">
                          <div className="flex items-start flex-wrap">
                            <div className="me-2">
                              <span
                                className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-warning  bg-warning/10 font-semibold">
                                EK
                              </span>
                            </div>
                            <div className="flex-grow">
                              <p className="font-semibold mb-[1.4px]  text-[0.813rem]">Emigo Kiaren</p>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">01/01/2024</p>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">2hr Ago</p>
                            </div>
                            <div className="font-semibold text-[0.9375rem] "><h1> <span className="badge bg-danger text-white">Expired</span></h1></div>
                          </div>
                        </li>
                        <li className="mb-[0.9rem]">
                          <div className="flex items-top flex-wrap">
                            <div className="me-2">
                              <span className="inline-flex items-center justify-center">
                                <img src="../../../assets/images/faces/12.jpg" alt=""
                                  className="!w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full" />
                              </span>
                            </div>
                            <div className="flex-grow">
                              <p className="font-semibold mb-[1.4px]  text-[0.813rem]">Randy Origoan
                              </p>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">01/01/2024</p>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">2hr Ago</p>
                            </div>
                            <div className="font-semibold text-[0.9375rem] ">
                              <h1> <span className="badge bg-danger text-white">Expired</span></h1>
                            </div>
                          </div>
                        </li>
                        <li className="mb-[0.9rem]">
                          <div className="flex items-top flex-wrap">
                            <div className="me-2">
                              <span
                                className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-success bg-success/10 font-semibold">
                                GP
                              </span>
                            </div>
                            <div className="flex-grow">
                              <p className="font-semibold mb-[1.4px]  text-[0.813rem]">George Pieterson
                              </p>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">george.pieterson@gmail.com</p>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">kiaraadvain214@gmail.com</p>
                            </div>
                            <div className="font-semibold text-[0.9375rem] "><h1> <span className="badge bg-warning text-white">Renew</span></h1></div>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-top flex-wrap">
                            <div className="me-2">
                              <span
                                className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-primary bg-primary/10 font-semibold">
                                KA
                              </span>
                            </div>
                            <div className="flex-grow">
                              <p className="font-semibold mb-[1.4px]  text-[0.813rem]">Kiara Advain</p>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">kiaraadvain214@gmail.com</p>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">kiaraadvain214@gmail.com</p>
                            </div>
                            <div className="font-semibold text-[0.9375rem] ">   <h1> <span className="badge bg-danger text-white">Expired</span></h1></div>
                          </div>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='xxl:col-span-6 xl:col-span-6  col-span-12'>
                  <div className='box'>
                    <div className='box-header flex justify-between'>
                      <div className='box-title'>Products</div>
                      <div className='hs-dropdown ti-dropdown'>
                        <Link
                          href=''
                          className='hs-dropdown-toggle py-2  px-3 ti-btn  ti-btn-w-sm bg-primary text-white !font-medium w-full !mb-0'
                          data-hs-overlay='#todo-compose'
                        >
                          <i className='ri-add-circle-line !text-[1rem]'></i>Add
                          Product
                        </Link>
                        {/* <div
                          id='todo-compose'
                          className='hs-overlay hidden ti-modal'
                        >
                          <div className='hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out'>
                            <div className='ti-modal-content'>
                              <div className='ti-modal-header'>
                                <h6
                                  className='modal-title text-[1rem] font-semibold'
                                  id='mail-ComposeLabel'
                                >
                                  Add User
                                </h6>
                                <button
                                  type='button'
                                  className='hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor'
                                  data-hs-overlay='#todo-compose'
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
                                      Email
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control w-full'
                                      id='task-name'
                                      placeholder='Task Name'
                                    />
                                  </div>

                                  <div className='xl:col-span-12 col-span-12'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      First Name
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control w-full'
                                      id='task-name'
                                      placeholder='Task Name'
                                    />
                                  </div>
                                  <div className='xl:col-span-12 col-span-12'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Last Name
                                    </label>
                                    <input
                                      type='text'
                                      className='form-control w-full'
                                      id='task-name'
                                      placeholder='Task Name'
                                    />
                                  </div>

                                  <div className='xl:col-span-12 col-span-12'>
                                    <label
                                      htmlFor='task-name'
                                      className='ti-form-label'
                                    >
                                      Role
                                    </label>
                                    <select className='form-select'>
                                      <option>No options</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className='ti-modal-footer'>
                                <button
                                  type='button'
                                  className='hs-dropdown-toggle ti-btn  ti-btn-light align-middle'
                                  data-hs-overlay='#todo-compose'
                                >
                                  Cancel
                                </button>
                                <button
                                  type='button'
                                  className='ti-btn bg-primary text-white !font-medium'
                                >
                                  Add User
                                </button>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className='box-body'>
                      <ul className='list-none crm-top-deals mb-0'>
                        {products && products.length > 0
                          ? products.map((product, index) => (
                              <li className='mb-[0.9rem]' key={index}>
                                <h5 className='box-title'>{product.folder}</h5>
                                <div className='flex items-center flex-wrap'>
                                  <div className='me-2 ic-product'>
                                    <span className='text-[1rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-primary'>
                                      <i className='ri-folder-line text-[1rem]  text-white'></i>
                                    </span>
                                  </div>
                                  <div className='flex-grow ic-product-p'>
                                    <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                      {product.data.FileName}
                                    </p>
                                  </div>
                                  <div className='font-semibold text-[0.9375rem] '>
                                    <a
                                      href={product.data.downloadLink}
                                      className='text-[1rem]  !w-[1.9rem] rounded-sm !h-[1.9rem] !leading-[1.9rem]  inline-flex items-center justify-center bg-primary'
                                    >
                                      <i className='ri-download-2-line  text-[.8rem]  text-white'></i>
                                    </a>
                                  </div>
                                </div>
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='xxl:col-span-6 xl:col-span-6 col-span-6'>
                  <div className='box'>
                    <div className='box-header flex justify-between'>
                      <div className='box-title'>List Of Entitlement</div>
                      <div className='hs-dropdown ti-dropdown'>
                        <Link
                          aria-label='anchor'
                          href=''
                          className='flex items-center justify-center w-[1.75rem] h-[1.75rem]  !text-[0.8rem] !py-1 !px-2 rounded-sm bg-light border-light shadow-none !font-medium'
                          aria-expanded='false'
                        >
                          <i className='fe fe-more-vertical text-[0.8rem]'></i>
                        </Link>
                        <ul className='hs-dropdown-menu ti-dropdown-menu hidden'>
                          <li>
                            <Link
                              className='ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block'
                              href=''
                            >
                              Week
                            </Link>
                          </li>
                          <li>
                            <Link
                              className='ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block'
                              href=''
                            >
                              Month
                            </Link>
                          </li>
                          <li>
                            <Link
                              className='ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block'
                              href=''
                            >
                              Year
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='box-body'>
                      <ul className='list-none crm-top-deals mb-0'>
                        {entitlementListData &&
                        entitlementListData.length > 0 ? (
                          entitlementListData.map((entitlement: any) => (
                            <li className='mb-[0.9rem]' key={entitlement.id}>
                              <div className='flex items-start flex-wrap'>
                                <div className='flex-grow'>
                                  <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                    {entitlement.entitlementName}
                                  </p>
                                </div>
                                <div className='font-semibold text-[0.9375rem] '>
                                  {entitlement.entitlementValue}
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <div className='col-md-12 w-100 mt-4'>
                            <p className='text-center'>No Data Found</p>{' '}
                          </div>
                        )}
                        <Pagination
                          activePage={activePage2}
                          itemsCountPerPage={perPage2}
                          totalItemsCount={totalItemsCount2}
                          pageRangeDisplayed={5}
                          onChange={(page: React.SetStateAction<number>) =>
                            setActivePage2(page)
                          }
                          itemClass='page-item pagination-custom'
                          linkClass='page-link'
                        />
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='xxl:col-span-6 xl:col-span-6  col-span-12'>
                  <div className='box'>
                    <div className='box-header flex justify-between'>
                      <div className='box-title'>Solutions</div>
                    </div>
                    <div className='box-body'>
                      <ul className='list-none crm-top-deals mb-0'>
                        {/* {solutions && solutions.length > 0
                          ? solutions.map((solution, index) => (
                              <li className='mb-[0.9rem]' key={index}>
                                  <div className='flex items-start flex-wrap'>
                                  <div className='me-2 ic-product'>
                                    <span className=' inline-flex items-center justify-center'>
                                      <i className='ri-file-text-line'></i>
                                    </span>
                                  </div>
                                  <div className='flex-grow ic-product-p'>
                                    <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                      {solution.folder}
                                    </p>
                                    <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                      {solution.data.FileName}
                                    </p>
                                  </div>
                                  <div className='font-semibold text-[0.9375rem] '>
                                    <button
                                      type='button'
                                      className='ti-btn ti-btn-primary-full label-ti-btn'
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <i className='ri-download-line label-ti-btn-icon  me-2'></i>
                                      <a
                                        href={solution.data.downloadLink}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                      >
                                        Download
                                      </a>
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))
                          : null} */}
                        {solutions && solutions.length > 0
                          ? solutions.map((solution, index) => (
                              <li className='mb-[0.9rem]' key={index}>
                                <div className='flex items-center flex-wrap'>
                                  <div className='me-2 ic-product'>
                                    <span className='text-[1rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-primary'>
                                      <i className='ri-folder-line text-[1rem]  text-white'></i>
                                    </span>
                                  </div>
                                  <div className='flex-grow ic-product-p'>
                                    <h5 className='box-title items-start'>
                                      {solution.folder}
                                    </h5>
                                    <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                      {solution.data.FileName}
                                    </p>
                                  </div>
                                  <div className='font-semibold text-[0.9375rem] '>
                                    <a
                                      href={solution.data.downloadLink}
                                      className='text-[1rem]  !w-[1.9rem] rounded-sm !h-[1.9rem] !leading-[1.9rem]  inline-flex items-center justify-center bg-primary'
                                    >
                                      <i className='ri-download-line  text-[.8rem]  text-white'></i>
                                    </a>
                                  </div>
                                </div>
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='xxl:col-span-12 xl:col-span-12 col-span-12'>
                  <div className='box custom-card'>
                    <div className='box-header justify-between'>
                      <div className='box-title'>User Management</div>
                      <div className='flex flex-wrap gap-2'>
                        <div>
                          <input
                            className='ti-form-control form-control-sm'
                            type='text'
                            placeholder='Search Here'
                            aria-label='.form-control-sm example'
                            onChange={(e) => {
                              setsearch(e.target.value);
                            }}
                          />
                        </div>
                        <div className='hs-dropdown ti-dropdown'>
                          <Link
                            style={{ cursor: 'pointer' }}
                            href=''
                            className='hs-dropdown-toggle py-2  px-3 ti-btn bg-primary text-white !font-medium w-full !mb-0'
                            data-hs-overlay='#todo-compose-user'
                            onClick={() => handleAddUser()}
                          >
                            <i className='ri-add-circle-line !text-[1rem]'></i>
                            Add User
                          </Link>
                          <div
                            id='todo-compose-user'
                            // className='hs-overlay hidden ti-modal'
                            className='hs-overlay hidden ti-modal  [--overlay-backdrop:static]'
                          >
                            <div className='hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out'>
                              <div className='ti-modal-content'>
                                <div className='ti-modal-header'>
                                  <h6
                                    className='modal-title text-[1rem] font-semibold'
                                    id='mail-ComposeLabel'
                                  >
                                    {changeFlage === true
                                      ? 'Add User'
                                      : 'Edit User'}
                                  </h6>
                                  <button
                                    type='button'
                                    className='hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor'
                                    data-hs-overlay='#todo-compose-user'
                                    onClick={() => handleFiledClear()}
                                    ref={closeModalButtonRef}
                                  >
                                    <span className='sr-only'>Close</span>
                                    <i className='ri-close-line'></i>
                                  </button>
                                </div>
                                <div className='ti-modal-body !overflow-visible px-4'>
                                  <div className='grid grid-cols-12 gap-2'>
                                    <div className='xl:col-span-12 col-span-12'>
                                      <label
                                        htmlFor='Email'
                                        className='ti-form-label'
                                      >
                                        Email*
                                      </label>
                                      <input
                                        type='text'
                                        className='form-control w-full'
                                        id='Email'
                                        placeholder='Enter Email'
                                        onChange={handleEmailChange}
                                        onKeyDown={handleKeyPress}
                                        maxLength={320}
                                        value={email}
                                      />
                                      {emailError && (
                                        <div className='text-danger'>
                                          {emailError}
                                        </div>
                                      )}
                                    </div>

                                    <div className='xl:col-span-12 col-span-12'>
                                      <label
                                        htmlFor='task-name'
                                        className='ti-form-label'
                                      >
                                        First Name*
                                      </label>
                                      <input
                                        type='text'
                                        className='form-control w-full'
                                        id='task-name'
                                        placeholder='Enter First Name'
                                        onChange={handleFirstNameChange}
                                        onKeyDown={handleKeyPress}
                                        maxLength={255}
                                        value={firstName}
                                      />
                                      {firstNameError && (
                                        <div className='text-danger'>
                                          {firstNameError}
                                        </div>
                                      )}
                                    </div>
                                    <div className='xl:col-span-12 col-span-12'>
                                      <label
                                        htmlFor='task-name'
                                        className='ti-form-label'
                                      >
                                        Last Name*
                                      </label>
                                      <input
                                        type='text'
                                        className='form-control w-full'
                                        id='task-name'
                                        placeholder='Enter Last Name'
                                        onChange={handleLastNameChange}
                                        onKeyDown={handleKeyPress}
                                        maxLength={255}
                                        value={lastName}
                                      />
                                      {lastNameError && (
                                        <div className='text-danger'>
                                          {lastNameError}
                                        </div>
                                      )}
                                    </div>

                                    <div className='xl:col-span-12 col-span-12'>
                                      <label
                                        htmlFor='task-name'
                                        className='ti-form-label'
                                      >
                                        Role*
                                      </label>
                                      <select
                                        className='form-select'
                                        onChange={handleRoleChange}
                                        value={role}
                                      >
                                        <option value=''>Select a role</option>
                                        {roles &&
                                          roles.map((role) => (
                                            <option
                                              key={role.id}
                                              value={role.id}
                                            >
                                              {role.name}
                                            </option>
                                          ))}
                                      </select>
                                      {roleError && (
                                        <div className='text-danger'>
                                          {roleError}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className='ti-modal-footer'>
                                  <button
                                    type='button'
                                    className='hs-dropdown-toggle ti-btn  ti-btn-light align-middle'
                                    data-hs-overlay='#todo-compose-user'
                                    ref={closeModalButtonRef}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type='button'
                                    className='ti-btn bg-primary text-white !font-medium'
                                    onClick={() => handleSubmit()}
                                  >
                                    {changeFlage === true
                                      ? 'Add User'
                                      : 'Edit User'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='box-body'>
                      <div className='overflow-x-auto'>
                        <table className='table min-w-full whitespace-nowrap table-hover border table-bordered'>
                          <thead>
                            <tr className='border border-inherit border-solid dark:border-defaultborder/10'>
                              <th
                                scope='col'
                                className='!text-start !text-[0.85rem] min-w-[200px]'
                              >
                                Name
                              </th>

                              <th
                                scope='col'
                                className='!text-start !text-[0.85rem]'
                              >
                                Mail
                              </th>
                              <th
                                scope='col'
                                className='!text-start !text-[0.85rem]'
                              >
                                {' '}
                                Role
                              </th>

                              <th
                                scope='col'
                                className='!text-start !text-[0.85rem]'
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {Dealsstatistics.map((idx) => ( */}
                            {orgUserData && orgUserData.length > 0
                              ? orgUserData.map((user, index) => (
                                  <tr
                                    className='border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light'
                                    key={index}
                                  >
                                    <td>
                                      <div className='flex items-center font-semibold'>
                                        {/* <span className='!me-2 inline-flex justify-center items-center'>
                                        <img
                                          src={user.src}
                                          alt='img'
                                          className='w-[1.75rem] h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full'
                                        />
                                      </span> */}
                                        {`${
                                          user.firstname ? user.firstname : ''
                                        } ${
                                          user.lastname ? user.lastname : ''
                                        }`}{' '}
                                      </div>
                                    </td>

                                    <td>{user.email}</td>
                                    <td>
                                      <span
                                      // className={`inline-flex text-${user.color} !py-[0.15rem] !px-[0.45rem] rounded-sm !font-semibold !text-[0.75em] bg-${user.color}/10`}
                                      >
                                        {user.role_name}
                                      </span>
                                    </td>

                                    <td>
                                      <div className='flex flex-row items-center !gap-2 text-[0.9375rem]'>
                                        <Link
                                          aria-label='anchor'
                                          href=''
                                          style={{ cursor: 'pointer' }}
                                          data-hs-overlay='#todo-compose-user'
                                          onClick={() => {
                                            handleEdit(user);
                                          }}
                                          className='ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-success/10 text-success hover:bg-success hover:text-white hover:border-success'
                                        >
                                          <i className='ri-user-follow-line'></i>
                                        </Link>
                                        {/* <Link
                                        aria-label='anchor'
                                        href=''
                                        
                                        className='ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-primary/10 text-primary hover:bg-primary hover:text-white hover:border-primary'
                                      >
                                        <i className='ri-user-unfollow-line'></i>
                                      </Link> */}
                                        <div
                                          style={{ cursor: 'pointer' }}
                                          aria-label='anchor'
                                          onClick={() => {
                                            handleDelete(user.user_id);
                                          }}
                                          className='ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-primary/10 text-primary hover:bg-primary hover:text-white hover:border-primary'
                                        >
                                          <i className='ri-delete-bin-line'></i>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              : null}
                            <Pagination
                              activePage={activePage}
                              itemsCountPerPage={perPage}
                              totalItemsCount={totalItemsCount}
                              pageRangeDisplayed={5} // Adjust as needed
                              onChange={(page: React.SetStateAction<number>) =>
                                setActivePage(page)
                              }
                              itemClass='page-item'
                              linkClass='page-link'
                            />
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* <div className='box-footer'>
                      <div className='sm:flex items-center'>
                        <div className='text-defaulttextcolor dark:text-defaulttextcolor/70'>
                          Showing 5 Entries{' '}
                          <i className='bi bi-arrow-right ms-2 font-semibold'></i>
                        </div>
                        <div className='ms-auto'>
                          <nav
                            aria-label='Page navigation'
                            className='pagination-style-4'
                          >
                            <ul className='ti-pagination mb-0'>
                              <li className='page-item disabled'>
                                <Link className='page-link' href=''>
                                  Prev
                                </Link>
                              </li>
                              <li className='page-item'>
                                <Link className='page-link active' href=''>
                                  1
                                </Link>
                              </li>
                              <li className='page-item'>
                                <Link className='page-link' href=''>
                                  2
                                </Link>
                              </li>
                              <li className='page-item'>
                                <Link
                                  className='page-link !text-primary'
                                  href=''
                                >
                                  next
                                </Link>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className='xxl:col-span-12 xl:col-span-12 col-span-12'>
                  <div className='box overflow-hidden'>
                    <div className='box-header justify-between'>
                      <div className='box-title'>Activity Logs</div>
                      <div className='hs-dropdown ti-dropdown'>
                        <Link
                          href=''
                          className='text-[0.75rem] px-2 font-normal text-[#8c9097] dark:text-white/50'
                          aria-expanded='false'
                        >
                          View All
                          <i className='ri-arrow-down-s-line align-middle ms-1 inline-block'></i>
                        </Link>
                        <ul
                          className='hs-dropdown-menu ti-dropdown-menu hidden'
                          role='menu'
                        >
                          <li>
                            <Link
                              className='ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block'
                              href=''
                            >
                              Today
                            </Link>
                          </li>
                          <li>
                            <Link
                              className='ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block'
                              href=''
                            >
                              This Week
                            </Link>
                          </li>
                          <li>
                            <Link
                              className='ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block'
                              href=''
                            >
                              Last Week
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='box-body !p-0'>
                      <div className='table-responsive'>
                        <table className='table table-hover whitespace-nowrap min-w-full'>
                          <tbody>
                            {TopCompanies.map((idx) => (
                              <tr
                                className='border hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10 border-defaultborder !border-x-0'
                                key={Math.random()}
                              >
                                <th scope='col'>
                                  <div className='flex items-center'>
                                    <img
                                      src={idx.src}
                                      alt=''
                                      className='avatar avatar-md p-1 bg-light avatar-rounded me-2 !mb-0'
                                    />
                                    <div>
                                      <p className='font-semibold mb-0'>
                                        Sarah Thompson updated the support
                                        entitlements for 'ABC Corporation,'
                                        increasing the number of hosted
                                        sandboxes allowed to be deployed from 5
                                        to 10.
                                      </p>
                                    </div>
                                  </div>
                                </th>

                                <td className='f-end'>{idx.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
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
