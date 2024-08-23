/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
interface PlanOptions {
  availablePlans: string[];
  litmusUNS: boolean;
  apiProtalAcess: boolean;
}
import { redirect } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { decryptData } from '@/helper/Encryption_Decryption';
import { renderLicense } from '@/supabase/licence';
import Loader from '@/utils/Loader/Loader';

// For entailemts show

const Page = () => {
  const [user_id, setuser_id] = useState<any>('');
  const [org_id, setorg_id] = useState<any>('');
  const [orgName, setorgName] = useState<any>('');
  const [userEmail, setUseremail] = useState<any>('');
  const [PlaansAvilable, setPlaansAvilable] = useState<string[]>([]);
  const [litmusUnsPlan, setlitmusUnsPlan] = useState<boolean>(true);
  const [ApiPortalAcessPlan, seApiPortalAcessPlane] = useState<boolean>(true);
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
        const tokens = JSON.parse(token);
      }
    }
  }, []);
  useEffect(() => {
    const decryptedUserId = decryptData(localStorage.getItem('user_id'));
    const decryptedOrgId = decryptData(localStorage.getItem('org_id'));
    const decryptedOrgName = decryptData(localStorage.getItem('org_name'));
    const decrypteduserEmail = decryptData(localStorage.getItem('user_email'));

    setuser_id(decryptedUserId);
    setorg_id(decryptedOrgId);
    setorgName(decryptedOrgName);
    setUseremail(decrypteduserEmail);
  }, []);
  const Showentitlement = async () => {
    try {
      setLoading(true);
      if (org_id) {
        const data = await renderLicense(org_id);
        if (data.errorCode == 0) {
          setPlaansAvilable(data.data?.availablePlans);
          seApiPortalAcessPlane(data.data?.apiProtalAcess);
          setlitmusUnsPlan(data.data?.litmusUNS);
          setLoading(false);
          //   setTypeDropdown(data.data);
          // } else {
          //   toast.error(data.message, { autoClose: 3000 });
          // }
        }
      }
    } catch (error: any) {
      setLoading(false);
      toast.error('Error Fetching Type..', { autoClose: 3000 });
    }
  };

  useEffect(() => {
    Showentitlement();
  }, [org_id]);
  return (
    <>
      {loading && <Loader />}
      {tokenVerify && (
        <>
          <ToastContainer />

          <div className='md:flex block items-center justify-between my-[1.5rem] page-header-breadcrumb'>
            <div>
              <p className='font-semibold text-[1.125rem] p-new text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 '>
                Request Entitlements and Plans
              </p>
            </div>
          </div>

          <div className='grid grid-cols-12 gap-x-6'>
            <div className='xxl:col-span-12 xl:col-span-12  col-span-12'>
              <div className='grid grid-cols-12 gap-x-6'>
                <div className='xxl:col-span-12 xl:col-span-12 sm:col-span-12 col-span-12'>
                  <div className='box'>
                    <div className='box-header flex justify-between'>
                      <div className='box-title'>Plans</div>
                    </div>
                    <div className='box-body'>
                      {PlaansAvilable ? (
                        <ul className='list-none crm-top-deals mb-0'>
                          <div className='grid grid-cols-12 gap-x-6'>
                            {PlaansAvilable.includes('Foundation') && (
                              <div className='xxl:col-span-4 xl:col-span-4 sm:col-span-12 col-span-12'>
                                <div className='box inner-box'>
                                  <div className='box-header flex justify-between'>
                                    <div className='box-title'>Foundation</div>
                                  </div>
                                  <div className='box-body'>
                                    <ul className='list-none crm-top-deals mb-0'>
                                      <div className='box-con'>
                                        <p className='font-medium p-new text-wrap'>
                                          For teams that are looking to unlock
                                          their plant floor data.
                                        </p>

                                        <p className='font-semibold p-new text-wrap mt-3'>
                                          Starts at 21005/month
                                        </p>
                                      </div>

                                      <button className='hs-dropdown-toggle py-2 ti-btn-sm mt-3  px-3 ti-btn  ti-btn-w-sm bg-primary text-white !font-medium w-full !mb-0'>
                                        Request Quota
                                      </button>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )}
                            {PlaansAvilable.includes('Growth') && (
                              <div className='xxl:col-span-4 xl:col-span-4 sm:col-span-12 col-span-12'>
                                <div className='box inner-box'>
                                  <div className='box-header flex justify-between'>
                                    <div className='box-title'>Growth</div>
                                  </div>
                                  <div className='box-body'>
                                    <ul className='list-none crm-top-deals mb-0'>
                                      <div className='box-con'>
                                        <p className='font-medium p-new text-wrap'>
                                          For teams that are looking to do more
                                          with their data at enterprise scale.
                                        </p>

                                        <p className='font-semibold p-new text-wrap mt-3'>
                                          Starts at 21005/month
                                        </p>
                                      </div>

                                      <button className='hs-dropdown-toggle py-2 ti-btn-sm mt-3  px-3 ti-btn  ti-btn-w-sm bg-primary text-white !font-medium w-full !mb-0'>
                                        Request Quota
                                      </button>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )}
                            {PlaansAvilable.includes('Scale') && (
                              <div className='xxl:col-span-4 xl:col-span-4 sm:col-span-12 col-span-12'>
                                <div className='box inner-box'>
                                  <div className='box-header flex justify-between'>
                                    <div className='box-title'>Scale</div>
                                  </div>
                                  <div className='box-body'>
                                    <ul className='list-none crm-top-deals mb-0'>
                                      <div className='box-con'>
                                        <p className='font-medium p-new text-wrap'>
                                          For teams that are looking for
                                          advanced enterprise-scale management
                                          and features like digital twins.
                                        </p>
                                        {/* 
                                <p className='font-semibold p-new text-wrap mt-3'>
                                  Starts at 21005/month
                                </p> */}
                                      </div>

                                      <button className='hs-dropdown-toggle py-2 ti-btn-sm mt-3  px-3 ti-btn  ti-btn-w-sm bg-primary text-white !font-medium w-full !mb-0'>
                                        Request Quota
                                      </button>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </ul>
                      ) : (
                        <div></div>
                      )}
                      {PlaansAvilable.length == 0 ? (
                        <div>No plans found</div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>

                <div className='xxl:col-span-12 xl:col-span-12 sm:col-span-12 col-span-12'>
                  <div className='box'>
                    <>
                      <div className='box-header flex justify-between'>
                        <div className='box-title'>Entitlements </div>
                      </div>
                      <div className='box-body'>
                        {litmusUnsPlan === false ||
                        ApiPortalAcessPlan === false ? (
                          <ul className='list-none crm-top-deals mb-0'>
                            <div className='grid grid-cols-12 gap-x-6'>
                              <div className='xxl:col-span-4 xl:col-span-4 sm:col-span-12 col-span-12'>
                                {litmusUnsPlan == false ? (
                                  <div className='box inner-box'>
                                    <div className='box-header flex justify-between'>
                                      <div className='box-title'>
                                        Litmus UNS
                                      </div>
                                    </div>
                                    <div className='box-body'>
                                      <ul className='list-none crm-top-deals mb-0'>
                                        <div className='box-con'>
                                          <p className='font-medium p-new text-wrap'>
                                            The first ever UNS with an
                                            enterprise-grade MQTT broker at its
                                            core, easy-to-build multilevel data
                                            hierarchy and data enrichment
                                            features
                                          </p>
                                        </div>

                                        <button className='hs-dropdown-toggle py-2 ti-btn-sm mt-3  px-3 ti-btn  ti-btn-w-sm bg-primary text-white !font-medium w-full !mb-0'>
                                          Request
                                        </button>
                                      </ul>
                                    </div>
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                              </div>
                              <div className='xxl:col-span-4 xl:col-span-4 sm:col-span-12 col-span-12'>
                                {ApiPortalAcessPlan == false ? (
                                  <div className='box inner-box'>
                                    <div className='box-header flex justify-between'>
                                      <div className='box-title'>
                                        API Portal Access
                                      </div>
                                    </div>
                                    <div className='box-body'>
                                      <ul className='list-none crm-top-deals mb-0'>
                                        <div className='box-con'>
                                          <p className='font-medium p-new text-wrap'>
                                            The Litmus API Portal is granting
                                            you effortless access to Litmus Edge
                                            and Litmus Edge Manager APIs.
                                          </p>
                                        </div>

                                        <button className='hs-dropdown-toggle py-2 ti-btn-sm mt-3  px-3 ti-btn  ti-btn-w-sm bg-primary text-white !font-medium w-full !mb-0'>
                                          Request
                                        </button>
                                      </ul>
                                    </div>
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                              </div>
                            </div>
                          </ul>
                        ) : (
                          <div>No entitlements found</div>
                        )}
                      </div>
                    </>
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
//2066
