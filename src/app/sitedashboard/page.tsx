/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import CryptoJS from 'crypto-js';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react';

import { licenceData, sitesCounts } from '@/supabase/sitedashboard';
import Loader from '@/utils/Loader/Loader';

import { Dealsstatistics } from '../../shared/data/dashboards/crmdata';
import { TopCompanies } from '../../shared/data/dashboards/jobsdata';

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
const Page = () => {
  const ENCRYPTION_KEY = 'pass123';
  const decryptData = (
    encryptedData: string | null,
  ): string | number | null => {
    if (!encryptedData) {
      return null;
    }
    try {
      const decryptedString = CryptoJS.AES.decrypt(
        encryptedData,
        ENCRYPTION_KEY,
      ).toString(CryptoJS.enc.Utf8);
      return !isNaN(Number(decryptedString))
        ? Number(decryptedString)
        : decryptedString;
    } catch (error) {
      return null;
    }
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenVerify, setTokenVerify] = useState(false);

  const [licence, setLicence] = useState<licenseData[] | null>(null);

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
  // const [user_id, setuser_id] = useState('');
  const [org_id, setorg_id] = useState<any>('');
  const [site_id, setsite_id] = useState<any>('');
  const [site_name, setSite_name] = useState<any>('');
  // useEffect(() => {
  //   // const userid: any = localStorage.getItem('user_id');
  //   const orgid: any = localStorage.getItem('org_id');
  //   const siteid: any = localStorage.getItem('site_id');
  //   const sitename: any = localStorage.getItem('site_name');
  //   // setuser_id(userid);
  //   setorg_id(orgid);
  //   setsite_id(siteid);
  //   setSite_name(sitename);
  // }, []);
  useEffect(() => {
    // const userid: any = localStorage.getItem('user_id');
    const orgid = decryptData(localStorage.getItem('org_id'));
    const siteid = decryptData(localStorage.getItem('site_id'));
    const sitename = decryptData(localStorage.getItem('site_name'));
    // setuser_id(userid);
    setorg_id(orgid);
    setsite_id(siteid);
    setSite_name(sitename);
  }, []);
  const [siteCountData, setSiteCountData] = useState<{
    data: { licencesCount: number; sandboxesCount: number; usersCount: number };
    errorCode: number;
    message: string;
  } | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (site_id && org_id) {
          const data: any = await sitesCounts(site_id, org_id);
          setSiteCountData(data);
          setLoading(false);
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
        setLoading(true);
        const data: any = await licenceData(site_id);
        setLicence(data.data);
        setLoading(false);
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
        // const data: any = await allSitesOfUsers(user_id, org_id);
        setLoading(false);
      } catch (error: any) {
        // console.error("Error fetching organization details:", error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const data: any = await sitesDetails(site_id);
        setLoading(false);
      } catch (error: any) {
        // console.error("Error fetching organization details:", error.message);
      }
    };
    fetchData();
  }, []);
  return (
    // <div>Page</div>
    <>
      {loading && <Loader />}
      {tokenVerify && (
        <>
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
                                    56
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
                                    Number of Sendbox
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
                      <div className='box-title'>Licence</div>
                    </div>
                    <div className='box-body'>
                      <div className='ms-6'>
                        <h5 className='text-[1.25rem] text-defaulttextcolor dark:text-defaulttextcolor/70 font-medium'>
                          High Standards in design !
                        </h5>
                        <p className='text-[#8c9097] dark:text-white/50 text-[.875rem]'>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Adipisci quos sint, officia vel ab perferendis,
                          dolores placeat dolor aliquam debitis eius, illum
                          ullam ratione blanditiis fugiat omnis beatae odio
                          vitae!
                        </p>
                        <p className='text-[#8c9097] dark:text-white/50 text-[.875rem]'>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Adipisci quos sint, officia vel ab perferendis,
                          dolores placeat dolor aliquam debitis eius, illum
                          ullam ratione blanditiis fugiat omnis beatae odio
                          vitae!
                        </p>
                      </div>
                      <div className='xl:col-span-12 col-span-12  mt-5 container !mx-auto !justify-center !items-center '>
                        <div className='box text-default shadow border dark:border-defaulttextcolor/10'>
                          <div className='box-body !p-0'>
                            <div className='sm:grid grid-cols-12'>
                              <div className='xl:col-span-3 xxl:col-span-3 lg:col-span-3 md:col-span-3 col-span-3 about-company-stats-border'>
                                <div className='text-center p-6 w-full h-full flex items-center justify-center'>
                                  <div>
                                    <span className='font-semibold'>
                                      Project owner
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
                              </div>
                              <div className='xl:col-span-3 xxl:col-span-3 lg:col-span-3 md:col-span-3 col-span-3 about-company-stats-border'>
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
                              </div>
                              <div className='xl:col-span-3 xxl:col-span-3 lg:col-span-3 md:col-span-3 col-span-3'>
                                <div className='text-center p-6 w-full h-full flex items-center justify-center'>
                                  <div>
                                    <span className='font-semibold'>
                                      Start Date
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
                              </div>
                              <div className='xl:col-span-3 xxl:col-span-3 lg:col-span-3 md:col-span-3 col-span-3'>
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
                      <div className='box-title'>Licence</div>
                      <div className='hs-dropdown ti-dropdown'>
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
                      </div>
                    </div>
                    <div className='box-body'>
                      <ul className='list-none crm-top-deals mb-0'>
                        {licence && licence.length > 0
                          ? licence.map((user, index) => (
                              <li className='mb-[0.9rem]' key={index}>
                                <div className='flex items-start flex-wrap'>
                                  <div className='me-2'>
                                    <span className=' inline-flex items-center justify-center'>
                                      <img
                                        src='../../../assets/images/faces/10.jpg'
                                        alt=''
                                        className='w-[1.75rem] h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full'
                                      />
                                    </span>
                                  </div>
                                  <div className='flex-grow'>
                                    <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                      {user.licence_number}
                                    </p>
                                    <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                      01/01/2024
                                    </p>
                                    <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                      2hr Ago
                                    </p>
                                  </div>
                                  <div className='font-semibold text-[0.9375rem] '>
                                    <h1>
                                      {' '}
                                      <span className='badge bg-primary text-white'>
                                        Active
                                      </span>
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
                      </div>
                    </div>
                    <div className='box-body'>
                      <ul className='list-none crm-top-deals mb-0'>
                        <li className='mb-[0.9rem]'>
                          <div className='flex items-start flex-wrap'>
                            <div className='me-2'>
                              <span className=' inline-flex items-center justify-center'>
                                <img
                                  src='../../../assets/images/faces/10.jpg'
                                  alt=''
                                  className='w-[1.75rem] h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full'
                                />
                              </span>
                            </div>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                Michael Jordan
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                01/01/2024
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                2hr Ago
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              <h1>
                                {' '}
                                <span className='badge bg-primary text-white'>
                                  Active
                                </span>
                              </h1>
                            </div>
                          </div>
                        </li>
                        <li className='mb-[0.9rem]'>
                          <div className='flex items-start flex-wrap'>
                            <div className='me-2'>
                              <span className='inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-warning  bg-warning/10 font-semibold'>
                                EK
                              </span>
                            </div>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                Emigo Kiaren
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                01/01/2024
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                2hr Ago
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              <h1>
                                {' '}
                                <span className='badge bg-danger text-white'>
                                  Expired
                                </span>
                              </h1>
                            </div>
                          </div>
                        </li>
                        <li className='mb-[0.9rem]'>
                          <div className='flex items-top flex-wrap'>
                            <div className='me-2'>
                              <span className='inline-flex items-center justify-center'>
                                <img
                                  src='../../../assets/images/faces/12.jpg'
                                  alt=''
                                  className='!w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full'
                                />
                              </span>
                            </div>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                Randy Origoan
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                01/01/2024
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                2hr Ago
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              <h1>
                                {' '}
                                <span className='badge bg-danger text-white'>
                                  Expired
                                </span>
                              </h1>
                            </div>
                          </div>
                        </li>
                        <li className='mb-[0.9rem]'>
                          <div className='flex items-top flex-wrap'>
                            <div className='me-2'>
                              <span className='inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-success bg-success/10 font-semibold'>
                                GP
                              </span>
                            </div>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                George Pieterson
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                george.pieterson@gmail.com
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                kiaraadvain214@gmail.com
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              <h1>
                                {' '}
                                <span className='badge bg-warning text-white'>
                                  Renew
                                </span>
                              </h1>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className='flex items-top flex-wrap'>
                            <div className='me-2'>
                              <span className='inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-primary bg-primary/10 font-semibold'>
                                KA
                              </span>
                            </div>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                Kiara Advain
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                kiaraadvain214@gmail.com
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                kiaraadvain214@gmail.com
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              {' '}
                              <h1>
                                {' '}
                                <span className='badge bg-danger text-white'>
                                  Expired
                                </span>
                              </h1>
                            </div>
                          </div>
                        </li>
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
                        <li className='mb-[0.9rem]'>
                          <div className='flex items-start flex-wrap'>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                Michael Jordan
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              $2,893
                            </div>
                          </div>
                        </li>
                        <li className='mb-[0.9rem]'>
                          <div className='flex items-start flex-wrap'>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                Emigo Kiaren
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              $4,289
                            </div>
                          </div>
                        </li>
                        <li className='mb-[0.9rem]'>
                          <div className='flex items-top flex-wrap'>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                Randy Origoan
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              $6,347
                            </div>
                          </div>
                        </li>
                        <li className='mb-[0.9rem]'>
                          <div className='flex items-top flex-wrap'>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                George Pieterson
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              $3,894
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className='flex items-top flex-wrap'>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                Kiara Advain
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              $2,679
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='xxl:col-span-6 xl:col-span-6  col-span-12'>
                  <div className='box'>
                    <div className='box-header flex justify-between'>
                      <div className='box-title'>Files</div>
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
                        <li className='mb-[0.9rem]'>
                          <div className='flex items-start flex-wrap'>
                            <div className='me-2'>
                              <span className=' inline-flex items-center justify-center'>
                                <img
                                  src='../../../assets/images/faces/10.jpg'
                                  alt=''
                                  className='w-[1.75rem] h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full'
                                />
                              </span>
                            </div>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                Michael Jordan
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                01/01/2024
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                2hr Ago
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              <button
                                type='button'
                                className='ti-btn ti-btn-primary-full label-ti-btn'
                              >
                                <i className='ri-download-line label-ti-btn-icon  me-2'></i>
                                Download
                              </button>
                            </div>
                          </div>
                        </li>
                        <li className='mb-[0.9rem]'>
                          <div className='flex items-start flex-wrap'>
                            <div className='me-2'>
                              <span className='inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-warning  bg-warning/10 font-semibold'>
                                EK
                              </span>
                            </div>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                Emigo Kiaren
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                01/01/2024
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                2hr Ago
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              <button
                                type='button'
                                className='ti-btn ti-btn-primary-full label-ti-btn'
                              >
                                <i className='ri-download-line label-ti-btn-icon  me-2'></i>
                                Download
                              </button>
                            </div>
                          </div>
                        </li>
                        <li className='mb-[0.9rem]'>
                          <div className='flex items-top flex-wrap'>
                            <div className='me-2'>
                              <span className='inline-flex items-center justify-center'>
                                <img
                                  src='../../../assets/images/faces/12.jpg'
                                  alt=''
                                  className='!w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full'
                                />
                              </span>
                            </div>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                Randy Origoan
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                01/01/2024
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                2hr Ago
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              <button
                                type='button'
                                className='ti-btn ti-btn-primary-full label-ti-btn'
                              >
                                <i className='ri-download-line label-ti-btn-icon  me-2'></i>
                                Download
                              </button>
                            </div>
                          </div>
                        </li>
                        <li className='mb-[0.9rem]'>
                          <div className='flex items-top flex-wrap'>
                            <div className='me-2'>
                              <span className='inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-success bg-success/10 font-semibold'>
                                GP
                              </span>
                            </div>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                George Pieterson
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                george.pieterson@gmail.com
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                kiaraadvain214@gmail.com
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              <button
                                type='button'
                                className='ti-btn ti-btn-primary-full label-ti-btn'
                              >
                                <i className='ri-download-line label-ti-btn-icon  me-2'></i>
                                Download
                              </button>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className='flex items-top flex-wrap'>
                            <div className='me-2'>
                              <span className='inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-primary bg-primary/10 font-semibold'>
                                KA
                              </span>
                            </div>
                            <div className='flex-grow'>
                              <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                                Kiara Advain
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                kiaraadvain214@gmail.com
                              </p>
                              <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                                kiaraadvain214@gmail.com
                              </p>
                            </div>
                            <div className='font-semibold text-[0.9375rem] '>
                              {' '}
                              <button
                                type='button'
                                className='ti-btn ti-btn-primary-full label-ti-btn'
                              >
                                <i className='ri-download-line label-ti-btn-icon  me-2'></i>
                                Download
                              </button>
                            </div>
                          </div>
                        </li>
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
                          />
                        </div>
                        <div className='hs-dropdown ti-dropdown'>
                          <Link
                            href=''
                            className='hs-dropdown-toggle py-2  px-3 ti-btn bg-primary text-white !font-medium w-full !mb-0'
                            data-hs-overlay='#todo-compose'
                          >
                            <i className='ri-add-circle-line !text-[1rem]'></i>
                            Add Organization
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
                                Organization
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
                            {Dealsstatistics.map((idx) => (
                              <tr
                                className='border border-inherit border-solid hover:bg-gray-100 dark:border-defaultborder/10 dark:hover:bg-light'
                                key={Math.random()}
                              >
                                <td>
                                  <div className='flex items-center font-semibold'>
                                    <span className='!me-2 inline-flex justify-center items-center'>
                                      <img
                                        src={idx.src}
                                        alt='img'
                                        className='w-[1.75rem] h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full'
                                      />
                                    </span>
                                    {idx.name}
                                  </div>
                                </td>

                                <td>{idx.mail}</td>
                                <td>
                                  <span
                                    className={`inline-flex text-${idx.color} !py-[0.15rem] !px-[0.45rem] rounded-sm !font-semibold !text-[0.75em] bg-${idx.color}/10`}
                                  >
                                    {idx.location}
                                  </span>
                                </td>

                                <td>
                                  <div className='flex flex-row items-center !gap-2 text-[0.9375rem]'>
                                    <Link
                                      aria-label='anchor'
                                      href=''
                                      className='ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-success/10 text-success hover:bg-success hover:text-white hover:border-success'
                                    >
                                      <i className='ri-user-follow-line'></i>
                                    </Link>
                                    <Link
                                      aria-label='anchor'
                                      href=''
                                      className='ti-btn ti-btn-icon ti-btn-wave !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-primary/10 text-primary hover:bg-primary hover:text-white hover:border-primary'
                                    >
                                      <i className='ri-user-unfollow-line'></i>
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className='box-footer'>
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
                    </div>
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
