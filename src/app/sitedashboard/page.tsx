/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import moment from 'moment';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Pagination from 'react-js-pagination';
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { decryptData, encryptData } from '@/helper/Encryption_Decryption';
import {
  emailSchema,
  nameSchema,
  nameSchema2,
  roleSchema,
} from '@/helper/ValidationHelper';
import { getActivitiesBySiteID, logActivity } from '@/supabase/activity';
import { getUserRole } from '@/supabase/org_details';
import { downloadProduct, listLitmusProducts } from '@/supabase/products';
import { refreshToken } from '@/supabase/session';
import {
  addUserToSites,
  getSiteUserRole,
  modifyUserOfSites,
  removeUserFromSites,
} from '@/supabase/site_users';
import {
  allSitesOfUsers,
  entitlementSite,
  licenceData,
  sitesCounts,
} from '@/supabase/sitedashboard';
import { generateSignedUrl, listSolutions } from '@/supabase/solutions';
import Loader from '@/utils/Loader/Loader';

interface licenseData {
  id: number;
  type: number;
  created_at: string;
  created_by: number;
  expiry: string;
  licence_number: string;
  licence_type_name: string;
  site_id: number;
}
interface Products {
  data: {
    FileName: string;
    downloadLink: string;
    extensionIncluded: string;
    subfolder: string;
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
interface activitylogs {
  activity_date: string;
  activity_type: string;
  target_user_role: object;
  target_user_id: { email: string; firstname: string; lastname: string };
  org_id: { name: string };
  details: { filename: string };
  site_id: { name: string };
  user_id: { email: string; firstname: string; lastname: string };
}
const validationSchema = Yup.object().shape({
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema2,
  role: roleSchema,
});
const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenVerify, setTokenVerify] = useState(false);
  const navigate = useRouter();
  const [licence, setLicence] = useState<licenseData[] | null>(null);
  const [orgUserData, setOrgUserData] = useState<OrgUser[] | null>(null);
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
  const [activity_log, setActivity_log] = useState<activitylogs[] | null>(null);
  const [onlyToken, setOnlyToken] = useState('');
  useEffect(() => {
    const refresh = async () => {
      try {
        await refreshToken();
      } catch {
        //
      }
    };
    refresh();
  }, []);
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
  const [user_id, setuser_id] = useState<any>('');
  const [org_id, setorg_id] = useState<any>('');
  const [org_type_id, setOrg_type_id] = useState<any>('');
  const [site_id, setsite_id] = useState<any>('');
  const [site_name, setSite_name] = useState<any>('');
  const [site_owner_name, SetSite_owner_name] = useState<any>('');
  const [orgName, setorgName] = useState<any>('');
  const [userEmail, setUseremail] = useState<any>('');
  useEffect(() => {
    const userid = decryptData(localStorage.getItem('user_id'));
    const orgid = decryptData(localStorage.getItem('org_id'));
    const siteid = decryptData(localStorage.getItem('site_id'));
    const sitename = decryptData(localStorage.getItem('site_name'));
    const decrytedOrgTypeId = decryptData(localStorage.getItem('org_type_id'));
    const decryptedOrgName = decryptData(localStorage.getItem('org_name'));
    const siteownername = decryptData(localStorage.getItem('site_owner_name'));
    const decrypteduserEmail = decryptData(localStorage.getItem('user_email'));
    setOrg_type_id(decrytedOrgTypeId);
    setuser_id(userid);
    setorg_id(orgid);
    setsite_id(siteid);
    setSite_name(sitename);
    setorgName(decryptedOrgName);
    SetSite_owner_name(siteownername);
    setUseremail(decrypteduserEmail);
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
  const [productSiteCount, setProductSiteCount] = useState<number | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const start: any = (activePage2 - 1) * perPage2;
        const end: any = start + perPage2 - 1;
        if (site_id) {
          const data: any = await entitlementSite(site_id, start, end);

          if (data) {
            setEntitlementListData(data?.data);
            setTotalItemsCount2(data.totalCount);
          } else {
            //
          }
        }
      } catch (error: any) {
        //
      }
    };
    fetchData();
  }, [site_id, activePage2, perPage2]);
  const countData = async () => {
    try {
      if (site_id && org_id) {
        const data: any = await sitesCounts(site_id, org_id);
        setSiteCountData(data);
      }
    } catch (error: any) {
      //
    }
  };
  useEffect(() => {
    countData();
  }, [org_id, site_id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (site_id) {
          const data: any = await licenceData(site_id);
          setLicence(data.data);
        }
      } catch (error: any) {
        //
      }
    };
    fetchData();
  }, [site_id]);
  const fetchData8 = async () => {
    try {
      if (site_id) {
        const data: any = await getActivitiesBySiteID({
          siteID: site_id,
          start: 0,
          end: 10,
          limit: 11,
        });
        setActivity_log(data.activities);
      }
    } catch (error: any) {
      //
    }
  };
  useEffect(() => {
    fetchData8();
  }, [site_id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const data: any = await listSolutions();
        if (data) {
          setSolution(data.data);
        }
        // setLoading(false);
      } catch (error: any) {
        // setLoading(false);
        //
      }
    };
    fetchData();
  }, []);

  const fetchUserData = async () => {
    try {
      const start: any = (activePage - 1) * perPage;
      const end: any = start + perPage - 1;
      if (site_id) {
        const data: any = await allSitesOfUsers(site_id, search, start, end);
        setOrgUserData(data.data);
        setTotalItemsCount(data.totalCount);
      }
    } catch (error: any) {
      //
    }
  };
  const [userrole3, setuserrole3] = useState<any>('');
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const data: any = await getSiteUserRole(user_id, site_id);
        if (data) {
          setuserrole3(data.data.id);
        } else {
          //
        }
      } catch (error: any) {
        //
      }
    };
    fetchData2();
  }, [site_id, user_id]);

  useEffect(() => {
    fetchUserData();
  }, [site_id, activePage, search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (site_id) {
          setLoading(true);
          const result1: any = await listLitmusProducts(
            site_id,
            org_id,
            org_type_id,
          );
          if (result1) {
            setProducts(result1.data);
            setProductSiteCount(result1.data.length);
            setLoading(false);
          }
        }
      } catch (error: any) {
        setLoading(false);
        //
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
        const result1: any = await getUserRole();
        if (result1 && result1.data) {
          setRoles(result1.data);
        }
      } catch (error: any) {
        //
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
    nameSchema2
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
            email: email.toLowerCase(),
            firstname: firstName,
            lastname: lastName,
            role_id: role,
            org_id: org_id,
            user_id: user_id,
            token: onlyToken,
            userName: userEmail,
            siteName: site_name,
            orgName: orgName,
            site_id: site_id,
          };
          await refreshToken();
          result = await addUserToSites(userData);
          if (result.errorCode == 0) {
            toast.success(result.data, { autoClose: 3000 });
            const button = document.getElementById('close-modal-btn');
            if (button) {
              button.click();
            }
          } else {
            toast.error(result.data, { autoClose: 3000 });
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
              button.click();
            }
          } else {
            toast.error("Couldn't Update", { autoClose: 3000 });
            const button = document.getElementById('close-modal-btn');
            if (button) {
              button.click();
            }
          }
        }
        if (closeModalButtonRef.current) {
          closeModalButtonRef.current.click();
        }
        fetchUserData();
        countData();
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    } else {
      setLoading(false);
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
    setEmail(user.email ? user.email : '');
    setFirstName(user.firstname ? user.firstname : '');
    setLastName(user.lastname ? user.lastname : '');
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
          const response = await removeUserFromSites(id, site_id, user_id);
          if (response.errorCode === 0 && response.data) {
            if (id === user_id) {
              navigate.push('/sites');
            } else {
              swal(response.data, { icon: 'success' });
              fetchUserData();
            }
            setLoading(false);
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
  const handleDownload = async (
    fileName: string,
    folder: string,
    subfolder: string,
    flage: string,
  ) => {
    setLoading(true);
    let result: any = null;
    if (flage === 'P') {
      result = await downloadProduct(folder, subfolder, fileName);
    } else if (flage === 'S') {
      result = await generateSignedUrl(folder, subfolder, fileName);
    }
    if (result) {
      // Convert the response to a blob
      const blob = new Blob([result], { type: result.type });
      const url = window.URL.createObjectURL(blob);

      // Create a link element and simulate a click to download the file
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the object URL to free up memory
      window.URL.revokeObjectURL(url);
    }

    setLoading(false);
    const data = {
      org_id: org_id,
      site_id: site_id,
      user_id: user_id,
      activity_type: 'download_file',
      details: { filename: fileName },
    };
    const response = await logActivity(data);
    if (response) {
      fetchData8();
    }
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
                                    Number of Licenses
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
                                    {/* {siteCountData
                                      ? siteCountData.data.productCount
                                      : 0} */}
                                    {productSiteCount ? productSiteCount : 0}
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
                                      : 0}
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
                        siteCountData.data.sites_details[0].about_site
                          ? ''
                          : // <h5 className='text-[1.25rem] text-defaulttextcolor dark:text-defaulttextcolor/70 font-medium'>

                            // </h5>
                            ''}

                        <p className='text-[#8c9097] dark:text-white/50 text-[.875rem]'>
                          {siteCountData
                            ? siteCountData.data.sites_details[0].about_site
                            : null}
                          {siteCountData &&
                            siteCountData.data.sites_details[0].about_site ===
                              '' &&
                            'No Description'}
                        </p>
                      </div>
                      <div className='xl:col-span-12 col-span-12  mt-5 container !mx-auto !justify-center !items-center '>
                        <div className='box text-default shadow border dark:border-defaulttextcolor/10'>
                          <div className='box-body !p-0'>
                            <div className='sm:grid grid-cols-12'>
                              <div className='xl:col-span-3 xxl:col-span-3 lg:col-span-3 md:col-span-3 col-span-3 about-company-stats-border'>
                                <div className='text-center p-6 w-full h-full flex justify-center'>
                                  <span className='font-semibold me-2'>
                                    Owner:
                                  </span>
                                  <p className='text-[#8c9097] dark:text-white/50 text-[.875rem]'>
                                    {' '}
                                    {site_owner_name ? site_owner_name : '--'}
                                  </p>
                                </div>
                              </div>
                              <div className='xl:col-span-3 xxl:col-span-3 lg:col-span-3 md:col-span-3 col-span-3 about-company-stats-border'>
                                <div className='text-center p-6 w-full h-full flex justify-center'>
                                  <span className='font-semibold me-2'>
                                    Organization Name:
                                  </span>
                                  <p className='text-[#8c9097] dark:text-white/50 text-[.875rem]'>
                                    {' '}
                                    {orgName ? orgName : '--'}
                                  </p>
                                </div>
                              </div>
                              <div className='xl:col-span-3 xxl:col-span-3 lg:col-span-3 md:col-span-3 col-span-3'>
                                <div className='text-center p-6 w-full h-full flex justify-center'>
                                  <span className='font-semibold'>
                                    {siteCountData &&
                                    siteCountData.data.sites_details[0]
                                      .created_at
                                      ? 'Created: '
                                      : ''}
                                  </span>

                                  <p className='text-[#8c9097] dark:text-white/50 text-[.875rem]'>
                                    {' '}
                                    {siteCountData
                                      ? moment(
                                          siteCountData.data.sites_details[0]
                                            .created_at,
                                        ).format('MM/DD/YYYY HH:mm')
                                      : //  siteCountData.data.sites_details[0].created_at.split(
                                        //     'T',
                                        //   )[0]
                                        ''}
                                    {/* </span> */}
                                  </p>
                                </div>
                              </div>
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
                      <div className='box-title'>License</div>
                      <div className='grid border-b border-dashed'>
                        <button
                          onClick={() => {
                            navigate.push('/license');
                          }}
                          className='hs-dropdown-toggle py-2 ti-btn-sm  px-3 ti-btn  ti-btn-w-sm bg-primary text-white !font-medium w-full !mb-0'
                        >
                          <i className='ri-add-circle-line !text-[1rem]'></i>Add
                          License
                        </button>
                      </div>
                    </div>
                    <div className='box-body'>
                      <ul className='list-none crm-top-deals mb-0'>
                        {licence && licence.length > 0
                          ? licence.map((user, index) => (
                              <li className='mb-[0.9rem]' key={index}>
                                <div className='flex items-start flex-wrap'>
                                  <div className='me-2'>
                                    <span className='avatar avatar-rounded avatar-sm bg-primary p-1'>
                                      <i className='ri-profile-line text-[1rem]  text-white'></i>
                                    </span>
                                  </div>
                                  <div className='flex-grow'>
                                    <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                      {user.licence_number}
                                    </p>
                                    <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                      {/* {user.expiry.split('T')[0]} */}
                                      {user
                                        ? moment(user.expiry).format(
                                            'MM/DD/YYYY HH:mm',
                                          )
                                        : ''}
                                    </p>
                                  </div>
                                  <div className='font-semibold text-[0.9375rem] '>
                                    <h1>
                                      {' '}
                                      {moment().isAfter(user.expiry) ? (
                                        <span className='badge bg-danger text-white'>
                                          Expired
                                        </span>
                                      ) : moment(user.expiry).isBefore(
                                          moment().add(1, 'month'),
                                        ) ? (
                                        <span className='badge bg-warning text-white'>
                                          Soon to Expire
                                        </span>
                                      ) : (
                                        <span className='badge bg-primary text-white'>
                                          Active
                                        </span>
                                      )}
                                    </h1>
                                  </div>
                                </div>
                              </li>
                            ))
                          : null}
                        {licence && licence.length === 0 && (
                          <div className='col-md-12 w-100 mt-4'>
                            <p className='text-center'>No License Found</p>{' '}
                          </div>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='xxl:col-span-6 xl:col-span-6  col-span-12'>
                  <div className='box'>
                    <div className='box-header flex justify-between'>
                      <div className='box-title'>Products</div>
                      <div className='grid border-b border-dashed'>
                        <button
                          onClick={() => {
                            navigate.push('/products');
                          }}
                          className='hs-dropdown-toggle py-2 ti-btn-sm  px-3 ti-btn  ti-btn-w-sm bg-primary text-white !font-medium w-full !mb-0'
                        >
                          <i className='ri-add-circle-line !text-[1rem]'></i>Add
                          Product
                        </button>
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
                                    <span className='avatar avatar-rounded avatar-sm bg-primary p-1'>
                                      <i className='ri-folder-line text-[1rem]  text-white'></i>
                                    </span>
                                  </div>
                                  <div className='flex-grow ic-product-p'>
                                    <p
                                      className={`font-semibold mb-[1.4px]  text-[0.813rem] ${
                                        product.data.extensionIncluded === 'Y'
                                          ? ''
                                          : 'text-gray-500'
                                      }`}
                                    >
                                      {product.data.FileName}
                                    </p>
                                  </div>
                                  {product.data.extensionIncluded === 'Y' && (
                                    <div className='font-semibold text-[0.9375rem] '>
                                      <a
                                        onClick={() => {
                                          handleDownload(
                                            product.data.FileName,
                                            product.folder,
                                            product.data.subfolder,
                                            'P',
                                          );
                                        }}
                                        style={{ cursor: 'pointer' }}
                                        // href={product.data.downloadLink}
                                        className='text-[1rem]  !w-[1.9rem] rounded-sm !h-[1.9rem] !leading-[1.9rem]  inline-flex items-center justify-center bg-primary'
                                      >
                                        <i className='ri-download-line  text-[.8rem]  text-white'></i>
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </li>
                            ))
                          : null}
                        {(products && products.length === 0) ||
                          (products === null && (
                            <div className='col-md-12 w-100 mt-4'>
                              <p className='text-center'>No Product Found</p>{' '}
                            </div>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='xxl:col-span-6 xl:col-span-6 col-span-12'>
                  <div className='box'>
                    <div className='box-header flex justify-between'>
                      <div className='box-title'>List Of Entitlement</div>
                    </div>
                    <div className='box-body'>
                      <ul className='list-none crm-top-deals mb-0'>
                        {entitlementListData && entitlementListData.length > 0
                          ? entitlementListData.map((entitlement: any) => (
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
                          : null}
                        {entitlementListData &&
                          entitlementListData.length > 0 && (
                            <Pagination
                              activePage={activePage2}
                              itemsCountPerPage={perPage2}
                              totalItemsCount={totalItemsCount2}
                              pageRangeDisplayed={5}
                              onChange={(page: React.SetStateAction<number>) =>
                                setActivePage2(page)
                              }
                              itemClass='page-item pagination-custom'
                              linkClass={` ${
                                totalItemsCount2 && totalItemsCount2 > 10
                                  ? 'page-link'
                                  : 'page-link chnage'
                              }`}
                            />
                          )}
                        {entitlementListData &&
                          entitlementListData.length === 0 && (
                            <div className='col-md-12 w-100 mt-4'>
                              <p className='text-center'>
                                No Entitlements Found
                              </p>{' '}
                            </div>
                          )}
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
                        {solutions && solutions.length > 0
                          ? solutions.map((solution, index) => (
                              <li className='mb-[0.9rem]' key={index}>
                                <h5 className='box-title items-start'>
                                  {solution.folder}
                                </h5>
                                <div className='flex items-center'>
                                  <div className='me-2 ic-product'>
                                    <span className='avatar avatar-rounded avatar-sm bg-primary p-1'>
                                      <i className='ri-folder-line text-[1rem]  text-white'></i>
                                    </span>
                                  </div>
                                  <div className='flex-grow ic-product-p'>
                                    <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                      {solution.data.FileName}
                                    </p>
                                  </div>
                                  <div className='font-semibold text-[0.9375rem] '>
                                    <a
                                      onClick={() => {
                                        handleDownload(
                                          solution.data.FileName,
                                          solution.folder.split('/')[0],
                                          solution.folder.includes('/')
                                            ? solution.folder.split('/')[-1]
                                            : '',
                                          'S',
                                        );
                                      }}
                                      // href={solution.data.downloadLink}
                                      className='text-[1rem]  !w-[1.9rem] rounded-sm !h-[1.9rem] !leading-[1.9rem]  inline-flex items-center justify-center bg-primary'
                                    >
                                      <i className='ri-download-line  text-[.8rem]  text-white'></i>
                                    </a>
                                  </div>
                                </div>
                              </li>
                            ))
                          : null}
                        {solutions && solutions.length === 0 && (
                          <div className='col-md-12 w-100 mt-4'>
                            <p className='text-center'>No Solution Found</p>{' '}
                          </div>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='xxl:col-span-12 xl:col-span-12 col-span-12'>
                  <div className='box custom-card'>
                    <div className='box-header justify-between'>
                      <div className='box-title'>User Management</div>
                      <div className='flex  gap-2'>
                        <div>
                          <input
                            className='ti-form-control form-control-sm'
                            type='text'
                            placeholder='Search here'
                            aria-label='.form-control-sm example'
                            onChange={(e) => {
                              setsearch(e.target.value);
                            }}
                          />
                        </div>
                        <div className='grid border-b border-dashed dark:border-defaultborder/10'>
                          {' '}
                          {userrole3 === 1 || userrole3 === 2 ? (
                            <Link
                              style={{ cursor: 'pointer' }}
                              href=''
                              className='hs-dropdown-toggle py-2 ti-btn-sm  px-3 ti-btn  ti-btn-w-sm bg-primary text-white !font-medium w-full !mb-0'
                              data-hs-overlay='#todo-compose-user'
                              onClick={() => handleAddUser()}
                            >
                              <i className='ri-add-circle-line !text-[1rem]'></i>
                              Add User
                            </Link>
                          ) : (
                            <div> </div>
                          )}
                          <div
                            id='todo-compose-user'
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
                                        Email{' '}
                                        <span className='text-danger'>*</span>
                                      </label>
                                      <input
                                        type='text'
                                        className='form-control w-full'
                                        id='Email'
                                        disabled={!changeFlage}
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
                                        First Name{' '}
                                        {/* <span className='text-danger'>*</span> */}
                                      </label>
                                      <input
                                        type='text'
                                        className='form-control w-full'
                                        id='task-name'
                                        disabled={!changeFlage}
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
                                        Last Name{' '}
                                        {/* <span className='text-danger'>*</span> */}
                                      </label>
                                      <input
                                        type='text'
                                        className='form-control w-full'
                                        id='task-name'
                                        placeholder='Enter Last Name'
                                        disabled={!changeFlage}
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
                                        Role{' '}
                                        <span className='text-danger'>*</span>
                                      </label>
                                      <select
                                        className='form-select'
                                        onChange={handleRoleChange}
                                        value={role}
                                      >
                                        <option value='' hidden>
                                          Select a role
                                        </option>
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
                                    onClick={() => handleFiledClear()}
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
                              {userrole3 == '1' || userrole3 == '2' ? (
                                <th
                                  scope='col'
                                  className='!text-start !text-[0.85rem]'
                                >
                                  Action
                                </th>
                              ) : null}
                            </tr>
                          </thead>
                          <tbody>
                            {orgUserData && orgUserData.length > 0
                              ? orgUserData.map((user, index) => (
                                  <tr
                                    className='border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light'
                                    key={index}
                                  >
                                    <td>
                                      <div className='flex items-center font-semibold'>
                                        {`${
                                          user.firstname ? user.firstname : '-'
                                        } ${
                                          user.lastname ? user.lastname : '-'
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
                                    {userrole3 == '1' || userrole3 == '2' ? (
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
                                            <i className='ri-edit-line'></i>
                                          </Link>
                                          <div
                                            style={{ cursor: 'pointer' }}
                                            aria-label='anchor'
                                            onClick={() => {
                                              handleDelete(user.user_id);
                                            }}
                                            className='ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger'
                                          >
                                            <i className='ri-delete-bin-line'></i>
                                          </div>
                                        </div>
                                      </td>
                                    ) : null}
                                  </tr>
                                ))
                              : null}
                            {orgUserData && orgUserData.length > 0 && (
                              <tr>
                                <td colSpan={5}>
                                  <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={perPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={5} // Adjust as needed
                                    onChange={(
                                      page: React.SetStateAction<number>,
                                    ) => setActivePage(page)}
                                    itemClass='page-item'
                                    linkClass={` ${
                                      totalItemsCount && totalItemsCount > 10
                                        ? 'page-link'
                                        : 'page-link chnage'
                                    }`}
                                  />
                                </td>
                              </tr>
                            )}
                            {orgUserData && orgUserData.length === 0 && (
                              <tr>
                                <td colSpan={4}>
                                  <div className='col-md-12 w-100 mt-4'>
                                    <p className='text-center'>No User Found</p>{' '}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {activity_log && activity_log.length > 0 && (
                  <div className='xxl:col-span-12 xl:col-span-12 col-span-12'>
                    <div className='box overflow-hidden'>
                      <div className='box-header justify-between'>
                        <div className='box-title'>Activity Logs</div>
                        <div>
                          {activity_log.length >= 10 ? (
                            <button
                              onClick={() => {
                                const encryptedActvitylog =
                                  encryptData('/sitedashboard');
                                localStorage.setItem(
                                  'ActivityLogs',
                                  encryptedActvitylog,
                                );
                                // window.location.href = '/activitylogs';
                                navigate.push('/activitylogs');
                              }}
                              className='hs-dropdown-toggle py-2 ti-btn-sm  px-3 ti-btn  ti-btn-w-sm bg-primary text-white !font-medium w-full !mb-0'
                            >
                              {/* <i className='ri-add-circle-line !text-[1rem]'></i> */}
                              View All
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className='box-body !p-0'>
                        <div className='table-responsive'>
                          <table className='table table-hover whitespace-nowrap min-w-full'>
                            <tbody>
                              {activity_log && activity_log.length > 0 ? (
                                activity_log.map(
                                  (activity, index) =>
                                    (activity?.activity_type ===
                                      'create_site' ||
                                      activity?.activity_type === 'add_user' ||
                                      activity?.activity_type ===
                                        'remove_user' ||
                                      activity?.activity_type ===
                                        'add_licence' ||
                                      activity?.activity_type ===
                                        'download_file') && (
                                      <tr
                                        className='border hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10 border-defaultborder !border-x-0'
                                        key={index}
                                      >
                                        <th scope='col'>
                                          <div className='flex items-center'>
                                            <div>
                                              <p className='font-semibold mb-0 text-wrap'>
                                                {activity?.activity_type ===
                                                'create_site'
                                                  ? `${
                                                      activity?.user_id
                                                        ?.firstname &&
                                                      activity?.user_id.lastname
                                                        ? activity?.user_id
                                                            ?.firstname +
                                                          ' ' +
                                                          activity?.user_id
                                                            ?.lastname
                                                        : activity?.user_id
                                                            ?.email
                                                    } created a new site named ${activity
                                                      ?.site_id
                                                      .name} within the organization '${activity
                                                      ?.org_id.name}'`
                                                  : activity?.activity_type ===
                                                    'add_user'
                                                  ? `${
                                                      activity?.user_id
                                                        ?.firstname &&
                                                      activity?.user_id.lastname
                                                        ? activity?.user_id
                                                            ?.firstname +
                                                          ' ' +
                                                          activity?.user_id
                                                            ?.lastname
                                                        : activity?.user_id
                                                            ?.email
                                                    } added a new user named '${
                                                      activity?.target_user_id
                                                        ?.firstname &&
                                                      activity?.target_user_id
                                                        ?.lastname
                                                        ? activity
                                                            ?.target_user_id
                                                            ?.firstname +
                                                          ' ' +
                                                          activity
                                                            ?.target_user_id
                                                            ?.lastname
                                                        : activity
                                                            ?.target_user_id
                                                            ?.email
                                                    }' within the site '${activity
                                                      ?.site_id.name}'`
                                                  : activity?.activity_type ===
                                                    'remove_user'
                                                  ? `${
                                                      activity?.user_id
                                                        ?.firstname &&
                                                      activity?.user_id.lastname
                                                        ? activity?.user_id
                                                            ?.firstname +
                                                          ' ' +
                                                          activity?.user_id
                                                            ?.lastname
                                                        : activity?.user_id
                                                            ?.email
                                                    } removed a user named '${
                                                      activity?.target_user_id
                                                        ?.firstname &&
                                                      activity?.target_user_id
                                                        ?.lastname
                                                        ? activity
                                                            ?.target_user_id
                                                            ?.firstname +
                                                          ' ' +
                                                          activity
                                                            ?.target_user_id
                                                            ?.lastname
                                                        : activity
                                                            ?.target_user_id
                                                            ?.email
                                                    }' within the site '${activity
                                                      ?.site_id.name}'`
                                                  : activity?.activity_type ===
                                                    'add_licence'
                                                  ? `${
                                                      activity?.user_id
                                                        ?.firstname &&
                                                      activity?.user_id.lastname
                                                        ? activity?.user_id
                                                            ?.firstname +
                                                          ' ' +
                                                          activity?.user_id
                                                            ?.lastname
                                                        : activity?.user_id
                                                            .email
                                                    } added a new license within the organization ${activity
                                                      ?.org_id.name}`
                                                  : activity?.activity_type ===
                                                    'download_file'
                                                  ? `${
                                                      activity?.user_id
                                                        ?.firstname &&
                                                      activity?.user_id
                                                        ?.lastname
                                                        ? activity.user_id
                                                            ?.firstname +
                                                          ' ' +
                                                          activity?.user_id
                                                            ?.lastname
                                                        : activity?.user_id
                                                            ?.email
                                                    }  downloaded a file named '${activity
                                                      .details
                                                      ?.filename}' within the site '${activity
                                                      ?.site_id.name}'`
                                                  : ''}
                                              </p>
                                            </div>
                                          </div>
                                        </th>

                                        <td className='f-end'>
                                          {activity
                                            ? moment(
                                                activity.activity_date,
                                              ).format('MM/DD/YYYY HH:mm')
                                            : ''}
                                          {/* {activity.activity_date.split('T')[0]} */}
                                        </td>
                                      </tr>
                                    ),
                                )
                              ) : (
                                <>
                                  <div className='col-md-12 w-100 mt-4'>
                                    <p className='text-center'>No Log Found</p>{' '}
                                  </div>
                                  <></>
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
