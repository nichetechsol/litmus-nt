/* eslint-disable @next/next/no-img-element */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { redirect } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Pagination from 'react-js-pagination';
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { decryptData } from '@/helper/Encryption_Decryption';
import {
  emailSchema,
  nameSchema,
  nameSchema2,
  roleSchema,
} from '@/helper/ValidationHelper';
import { getActivitiesByOrgId } from '@/supabase/activity';
import {
  orgDashboardCounts,
  orgEntitlementList,
  orgUserList,
} from '@/supabase/dashboard';
import { getLocationOfSites } from '@/supabase/org_dashboard';
import { getUserRole } from '@/supabase/org_details';
import {
  addUserToOrganization,
  getOrgUserRole,
  modifyUserOfOrganization,
  removeUserFromOrganization,
} from '@/supabase/org_user';
import Loader from '@/utils/Loader/Loader';

interface OrgUser {
  id: any;
  firstname: any;
  lastname: any;
  email: React.ReactNode;
  role: React.ReactNode;
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
interface roles {
  id: string;
  name: string;
  created_at: any;
}
interface CountryCount {
  country: string;
  count: number;
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
const OrgDashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenVerify, setTokenVerify] = useState(false);

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
  // const [user_fname, setUser_fname] = useState("")
  // const [user_lname, setUserlname] = useState("")
  // const [user_role, setUserrole] = useState('');
  const [org_id, setorg_id] = useState<any>('');
  const [orgName, setorgName] = useState<any>('');
  // useEffect(() => {
  //   const userid: any = localStorage.getItem('user_id');
  //   // const userfname: any = localStorage.getItem("user_fname");
  //   // const userlname: any = localStorage.getItem("user_lname");
  //   // const userrole: any = localStorage.getItem('user_role');
  //   const org_id: any = localStorage.getItem('org_id');
  //   const orgName: any = localStorage.getItem('org_name');
  //   setuser_id(userid);
  //   // setUser_fname(userfname);
  //   // setUserlname(userlname);
  //   // setUserrole(userrole);
  //   setorg_id(org_id);
  //   if (!org_id) {
  //     swal('Please select organization', { icon: 'error' });
  //     redirect('/organization');
  //   }
  //   setorgName(orgName);
  // }, []);

  // const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    const decryptedUserId = decryptData(localStorage.getItem('user_id'));
    const decryptedOrgId = decryptData(localStorage.getItem('org_id'));
    const decryptedOrgName = decryptData(localStorage.getItem('org_name'));

    setuser_id(decryptedUserId);
    setorg_id(decryptedOrgId);
    setorgName(decryptedOrgName);

    if (!decryptedOrgId) {
      swal('Please select organization', { icon: 'error' });
      redirect('/organization');
    }
  }, []);

  const [activePage, setActivePage] = useState(1);
  const [search, setsearch] = useState('');
  const [perPage] = useState(10); // Number of items per page
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const closeModalButtonRef = useRef<HTMLButtonElement>(null);

  const [orgData, setOrgData] = useState<{
    entitlementCount: number;
    errorCode: number;
    sitesDetailCount: number;
    userCount: number;
  } | null>(null);
  const [orgUserData, setOrgUserData] = useState<OrgUser[]>([]);
  const [entitlementListData, setEntitlementListData] = useState<
    Entitlement[] | null
  >(null);

  const [activePage2, setActivePage2] = useState(1);
  const [perPage2] = useState(10);
  const [totalItemsCount2, setTotalItemsCount2] = useState(0);
  const [locationOfSites, setLocationOfSites] = useState<CountryCount[]>([]);
  const [activity_log, setActivity_log] = useState<activitylogs[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        if (org_id) {
          const data: any = await orgDashboardCounts(org_id);
          // setLoading(false);
          if (data) {
            setOrgData(data.data);
          } else {
            // setLoading(false);
            // console.log("No organization details found.");
          }
        }
      } catch (error: any) {
        // console.error("Error fetching organization details:", error.message);
      }
    };

    fetchData();
  }, [org_id]);
  const fetchData7 = async () => {
    try {
      // setLoading(true);
      if (org_id) {
        const data: any = await getActivitiesByOrgId(org_id);
        // setLoading(false);
        if (data) {
          setActivity_log(data);
        } else {
          // setLoading(false);
          // console.log("No organization details found.");
        }
      }
    } catch (error: any) {
      // console.error("Error fetching organization details:", error.message);
    }
  };
  useEffect(() => {
    fetchData7();
  }, [org_id]);

  const fetchData2 = async () => {
    try {
      // setLoading(true);

      const start: any = (activePage - 1) * perPage; // Calculate start index
      const end: any = start + perPage - 1; // Calculate end index
      if (org_id) {
        const data: any = await orgUserList(org_id, start, end, search);

        if (data) {
          setOrgUserData(data.data.userList);
          setTotalItemsCount(data.data?.totalCount); // Set total items count for pagination
          // setLoading(false);
        } else {
          // setLoading(false);
          // console.log("No organization details found.");
        }
      }
    } catch (error: any) {
      // setLoading(false);
      // console.error("Error fetching organization details:", error.message);
    }
  };
  useEffect(() => {
    fetchData2();
  }, [search, org_id, activePage]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const start: any = (activePage2 - 1) * perPage2; // Calculate start index
        const end: any = start + perPage2 - 1; // Calculate end index
        if (org_id) {
          const data: any = await orgEntitlementList(org_id, start, end);

          if (data) {
            setEntitlementListData(data?.data?.entitlements);
            setTotalItemsCount2(data.data?.totalCount); // Set total items count for pagination
            setLoading(false);
          } else {
            setLoading(false);
            // console.log("No organization details found.");
          }
        }
      } catch (error: any) {
        setLoading(false);
        // console.error("Error fetching organization details:", error.message);
      }
    };

    fetchData();
  }, [org_id, activePage2, perPage2]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);

        if (org_id) {
          const sets = { org_id: org_id };
          const data: any = await getLocationOfSites(sets);

          if (data) {
            setLocationOfSites(data.data);
            // setLoading(false);
          } else {
            // setLoading(false);
            // console.log("No organization details found.");
          }
        }
      } catch (error: any) {
        // setLoading(false);
        // console.error("Error fetching organization details:", error.message);
      }
    };

    fetchData();
  }, [org_id]);
  const [changeFlage, setChangeFlage] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [role, setRole] = useState('');
  const [userNameId, setUserNameId] = useState('');
  const [roleError, setRoleError] = useState('');
  // const [loading, setLoading] = useState<boolean>(false);
  const [roles, setRoles] = useState<roles[] | null>(null);
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
  const handleEdit = (user: any) => {
    setChangeFlage(false);
    setUserNameId(user.id);
    setEmail(user.email);
    setFirstName(user.firstname);
    setLastName(user.lastname);
    setRole(user.role_id);
  };
  const handleFiledClear = () => {
    setEmailError('');
    setFirstNameError('');
    setLastNameError('');
    setRoleError('');
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
          const response = await removeUserFromOrganization(
            id,
            org_id,
            user_id,
          );

          if (response.errorCode === 0) {
            swal('Record deleted!', { icon: 'success' });
            fetchData2();
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
          const userData = {
            email: email,
            firstname: firstName,
            lastname: lastName,
            role_id: role,
            org_id: org_id,
          };
          result = await addUserToOrganization(userData);
          if (result.errorCode == 0) {
            toast.success(result.data, { autoClose: 3000 });
            const button = document.getElementById('close-modal-btn');
            if (button) {
              button.click(); // Directly trigger click event on button
            }
          } else {
            toast.error('User was not in Central V2', { autoClose: 3000 });
            const button = document.getElementById('close-modal-btn');
            if (button) {
              button.click(); // Directly trigger click event on button
            }
          }
        } else {
          const userData = {
            role_id: role,
            user_id: userNameId,
            org_id: org_id,
          };
          result = await modifyUserOfOrganization(userData);
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
        fetchData2();

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
  const [userrole2, setuserrole2] = useState();
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
  return (
    <>
      {loading && <Loader />}
      {tokenVerify && (
        <>
          <ToastContainer />
          <div className='md:flex block items-center justify-between my-[1.5rem] page-header-breadcrumb'>
            <div>
              <p className='font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 '>
                Dashboard ({orgName})
              </p>
            </div>
          </div>
          <div className='grid grid-cols-12 gap-x-6'>
            <div className='xxl:col-span-12 xl:col-span-12  col-span-12'>
              <div className='grid grid-cols-12 gap-x-6'>
                <div className='xxl:col-span-12  xl:col-span-12  col-span-12'>
                  <div className='grid grid-cols-12 gap-x-6'>
                    <div className='xxl:col-span-4 xl:col-span-4 col-span-12'>
                      <div className='box overflow-hidden'>
                        <div className='box-body'>
                          <div className='flex items-top justify-between'>
                            <div>
                              <span className='!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-primary'>
                                {/* <i className='ti ti-users text-[1rem] text-white'></i> */}
                                <i className='ri-wallet-2-line text-white'></i>
                              </span>
                            </div>
                            <div className='flex-grow ms-4'>
                              <div className='flex items-center justify-between flex-wrap'>
                                <div>
                                  <p className='text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0'>
                                    Number of Sites
                                  </p>
                                  <h4 className='font-semibold  text-[1.5rem] !mb-2 '>
                                    {orgData ? orgData.sitesDetailCount : 0}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='xxl:col-span-4 xl:col-span-4 col-span-12'>
                      <div className='box overflow-hidden'>
                        <div className='box-body'>
                          <div className='flex items-top justify-between'>
                            <div>
                              <span className='!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-secondary'>
                                {/* <i className='ti ti-wallet text-[1rem] text-white'></i> */}
                                <i className='ri-group-line text-white'></i>
                              </span>
                            </div>
                            <div className='flex-grow ms-4'>
                              <div className='flex items-center justify-between flex-wrap'>
                                <div>
                                  <p className='text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0'>
                                    Number of Users
                                  </p>
                                  <h4 className='font-semibold text-[1.5rem] !mb-2 '>
                                    {orgData ? orgData.userCount : 0}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='xxl:col-span-4 xl:col-span-4 col-span-12'>
                      <div className='box overflow-hidden'>
                        <div className='box-body'>
                          <div className='flex items-top justify-between'>
                            <div>
                              <span className='!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-success'>
                                {/* <i className='ti ti-wave-square text-[1rem] text-white'></i> */}
                                <i className='ri-pulse-line text-white'></i>
                              </span>
                            </div>
                            <div className='flex-grow ms-4'>
                              <div className='flex items-center justify-between flex-wrap'>
                                <div>
                                  <p className='text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0'>
                                    No. of Entitlements
                                  </p>
                                  <h4 className='font-semibold text-[1.5rem] !mb-2 '>
                                    {orgData ? orgData.entitlementCount : 0}
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

                <div className='xxl:col-span-6 xl:col-span-6 col-span-6'>
                  <div className='box'>
                    <div className='box-header flex justify-between'>
                      <div className='box-title'>List Of Entitlement</div>
                    </div>
                    <div className='box-body'>
                      <ul className='list-none crm-top-deals mb-0'>
                        {entitlementListData &&
                        entitlementListData.length > 0 ? (
                          entitlementListData.map((entitlement) => (
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
                            <p className='text-center'>No Entitlement Found</p>{' '}
                          </div>
                        )}
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
                              linkClass='page-link'
                            />
                          )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='xxl:col-span-6 xl:col-span-6  col-span-12'>
                  <div className='box'>
                    <div className='box-header justify-between'>
                      <div className='box-title'>Location Of Sites</div>
                      <div className='hs-dropdown ti-dropdown'></div>
                    </div>
                    <div className='box-body overflow-hidden'>
                      {/* <div className='leads-source-chart flex items-center justify-center'> */}
                      {/* <img src={imgMap} /> */}
                      <ul className='list-none crm-top-deals mb-0'>
                        {locationOfSites.map((item, index) => (
                          <li className='mb-[0.9rem]' key={index}>
                            <div className='flex items-start flex-wrap'>
                              <div className='flex-grow'>
                                <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                  {item.country}
                                </p>
                              </div>
                              <div className='font-semibold text-[0.9375rem] '>
                                {item.count}
                              </div>
                            </div>
                          </li>
                        ))}
                        {locationOfSites && locationOfSites.length == 0 && (
                          <>
                            <div className='col-md-12 w-100 mt-4'>
                              <p className='text-center'>No Location Found</p>{' '}
                            </div>
                            <></>
                          </>
                        )}
                      </ul>
                    </div>
                    {/* </div> */}
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
                        {/* <div className='hs-dropdown ti-dropdown'> */}
                        <div className=' grid border-b border-dashed dark:border-defaultborder/10'>
                          {' '}
                          {userrole2 === 1 || userrole2 === 2 ? (
                            <button
                              className='btn btn-primary btn-wave mb-3'
                              data-bs-target='#formmodal'
                              data-bs-toggle='modal'
                              data-bs-whatever='@fat'
                              type='button'
                              onClick={() => handleAddUser()}
                              ref={closeModalButtonRef}
                            >
                              <div
                                className='hs-dropdown-toggle py-2 ti-btn-sm  px-3 ti-btn  ti-btn-w-sm bg-primary text-white !font-medium w-full !mb-0'
                                data-hs-overlay='#todo-compose'
                              >
                                <i className='ri-add-circle-line !text-[1rem]'></i>
                                Add User
                              </div>
                            </button>
                          ) : (
                            <div> </div>
                          )}
                          <div
                            id='todo-compose'
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
                                    onClick={() => handleFiledClear()}
                                    data-hs-overlay='#todo-compose'
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
                                      )}{' '}
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
                                        htmlFor='Last Name'
                                        className='ti-form-label'
                                      >
                                        Last Name*
                                      </label>
                                      <input
                                        type='text'
                                        className='form-control w-full'
                                        id='Last Name'
                                        disabled={!changeFlage}
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
                                        <option value='' hidden>
                                          Select a Role
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
                                    id='close-modal-btn'
                                    className='hs-dropdown-toggle ti-btn  ti-btn-light align-middle'
                                    data-hs-overlay='#todo-compose'
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
                              {userrole2 === 1 || userrole2 === 2 ? (
                                <th
                                  scope='col'
                                  className='!text-start !text-[0.85rem]'
                                >
                                  Action
                                </th>
                              ) : (
                                <></>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {orgUserData && orgUserData.length > 0 ? (
                              orgUserData.map((user) => (
                                <tr
                                  className='border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light'
                                  key={Math.random()}
                                >
                                  <td>
                                    <div className='flex items-center font-semibold'>
                                      <span className='!me-2 inline-flex justify-center items-center'>
                                        {/* <img src={idx.src} alt="img"
                                    className="w-[1.75rem] h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full" /> */}
                                      </span>{' '}
                                      {`${
                                        user.firstname ? user.firstname : ''
                                      } ${
                                        user.lastname ? user.lastname : ''
                                      }`}{' '}
                                    </div>
                                  </td>

                                  <td>{user.email}</td>
                                  <td>
                                    <span className='!me-2 inline-flex justify-center items-center'>
                                      {user.role}
                                    </span>
                                  </td>
                                  {userrole2 === 1 || userrole2 === 2 ? (
                                    <td>
                                      <div className='flex flex-row items-center !gap-2 text-[0.9375rem]'>
                                        <div
                                          style={{ cursor: 'pointer' }}
                                          aria-label='anchor'
                                          data-bs-target='#formmodal'
                                          data-bs-toggle='modal'
                                          data-bs-whatever='@fat'
                                          data-hs-overlay='#todo-compose'
                                          onClick={() => {
                                            handleEdit(user);
                                          }}
                                          className='ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-success/10 text-success hover:bg-success hover:text-white hover:border-success'
                                        >
                                          <i className='ri-edit-line'></i>
                                        </div>

                                        <div
                                          style={{ cursor: 'pointer' }}
                                          aria-label='anchor'
                                          onClick={() => {
                                            handleDelete(user.id);
                                          }}
                                          className='ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger'
                                        >
                                          <i className='ri-delete-bin-line'></i>
                                        </div>
                                      </div>
                                    </td>
                                  ) : (
                                    <></>
                                  )}
                                </tr>
                              ))
                            ) : (
                              <tr className='bg-white border-0'>
                                {' '}
                                <td colSpan={5} className='border-0'>
                                  {' '}
                                  <div className='col-md-12 w-100 mt-4'>
                                    <p className='text-center'>No User Found</p>{' '}
                                  </div>
                                </td>
                              </tr>
                            )}
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
                                    linkClass='page-link'
                                  />
                                </td>
                              </tr>
                            )}
                            {/* <Pagination
                              activePage={activePage}
                              itemsCountPerPage={perPage}
                              totalItemsCount={totalItemsCount}
                              pageRangeDisplayed={5} // Adjust as needed
                              onChange={(page: React.SetStateAction<number>) =>
                                setActivePage(page)
                              }
                              itemClass='page-item'
                              linkClass='page-link'
                            /> */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='xxl:col-span-12 xl:col-span-12 col-span-12'>
                  <div className='box overflow-hidden'>
                    <div className='box-header justify-between'>
                      <div className='box-title'>Activity Logs</div>
                      {/* <div className="hs-dropdown ti-dropdown">
                                <Link href="#!" className="text-[0.75rem] px-2 font-normal text-[#8c9097] dark:text-white/50"
                                    aria-expanded="false">
                                    View All<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                                </Link>
                                <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        href="#!">Today</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        href="#!">This Week</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        href="#!">Last Week</Link></li>
                                </ul>
                            </div> */}
                    </div>
                    <div className='box-body !p-0'>
                      <div className='table-responsive'>
                        <table className='table table-hover whitespace-nowrap min-w-full'>
                          <tbody>
                            {activity_log && activity_log.length > 0 ? (
                              activity_log.map(
                                (activity, index) =>
                                  (activity?.activity_type === 'create_org' ||
                                    activity?.activity_type === 'add_user' ||
                                    activity?.activity_type === 'remove_user' ||
                                    activity?.activity_type ===
                                      'create_site') && (
                                    <tr
                                      className='border hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10 border-defaultborder !border-x-0'
                                      key={index}
                                    >
                                      <th scope='col'>
                                        <div className='flex items-center'>
                                          {/* <img src={idx.src} alt="" className="avatar avatar-md p-1 bg-light avatar-rounded me-2 !mb-0" /> */}
                                          <div>
                                            <p className='font-semibold mb-0'>
                                              {activity?.activity_type ===
                                              'create_org'
                                                ? `${
                                                    activity.user_id
                                                      .firstname &&
                                                    activity.user_id.lastname
                                                      ? activity.user_id
                                                          .firstname +
                                                        ' ' +
                                                        activity.user_id
                                                          .lastname
                                                      : activity.user_id.email
                                                  } created a new org. named '${
                                                    activity.org_id.name
                                                  }'`
                                                : activity?.activity_type ===
                                                  'add_user'
                                                ? `${
                                                    activity.user_id
                                                      .firstname &&
                                                    activity.user_id.lastname
                                                      ? activity.user_id
                                                          .firstname +
                                                        ' ' +
                                                        activity.user_id
                                                          .lastname
                                                      : activity.user_id.email
                                                  } added a new user named '${
                                                    activity.target_user_id
                                                      .firstname &&
                                                    activity.target_user_id
                                                      .lastname
                                                      ? activity.target_user_id
                                                          .firstname +
                                                        ' ' +
                                                        activity.target_user_id
                                                          .lastname
                                                      : activity.target_user_id
                                                          .email
                                                  }' within the organization ${
                                                    activity.org_id.name
                                                  }`
                                                : activity?.activity_type ===
                                                  'remove_user'
                                                ? `${
                                                    activity.user_id
                                                      .firstname &&
                                                    activity.user_id.lastname
                                                      ? activity.user_id
                                                          .firstname +
                                                        ' ' +
                                                        activity.user_id
                                                          .lastname
                                                      : activity.user_id.email
                                                  } removed a user named '${
                                                    activity.target_user_id
                                                      .firstname &&
                                                    activity.target_user_id
                                                      .lastname
                                                      ? activity.target_user_id
                                                          .firstname +
                                                        ' ' +
                                                        activity.target_user_id
                                                          .lastname
                                                      : activity.target_user_id
                                                          .email
                                                  }' within the organization ${
                                                    activity.org_id.name
                                                  }`
                                                : activity?.activity_type ===
                                                  'create_site'
                                                ? `${
                                                    activity.user_id
                                                      .firstname &&
                                                    activity.user_id.lastname
                                                      ? activity.user_id
                                                          .firstname +
                                                        ' ' +
                                                        activity.user_id
                                                          .lastname
                                                      : activity.user_id.email
                                                  } created a new site named ${
                                                    activity.site_id.name
                                                  } within the organization '${
                                                    activity.org_id.name
                                                  }'`
                                                : //   : activity?.activity_type ===
                                                  //   'download_file'
                                                  // ? `${
                                                  //     activity.user_id.firstname &&
                                                  //     activity.user_id.lastname
                                                  //       ? activity.user_id.firstname +
                                                  //         ' ' +
                                                  //         activity.user_id.lastname
                                                  //       : activity.user_id.email
                                                  //   }  downloaded a file named '${
                                                  //     activity.details.filename
                                                  //   }' within the site ${
                                                  //     activity.org_id.name
                                                  //   }`
                                                  ''}
                                            </p>
                                          </div>
                                        </div>
                                      </th>

                                      <td className='f-end'>
                                        {activity.activity_date.split('T')[0]}
                                      </td>
                                    </tr>
                                  ),
                              )
                            ) : (
                              <>
                                <tr>
                                  <div className='col-md-12 w-100 mt-4'>
                                    <p className='text-center'>No Log Found</p>{' '}
                                  </div>
                                </tr>
                              </>
                            )}
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

export default OrgDashboard;
