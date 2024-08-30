/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import axios from 'axios';
import { redirect } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';

import 'react-toastify/dist/ReactToastify.css';

import { decryptData } from '@/helper/Encryption_Decryption';
import {
  checkLimit,
  getSKUList,
  insertLicence,
  reqLicenseLimitMail,
} from '@/supabase/licence';
import Loader from '@/utils/Loader/Loader';

interface License {
  id: any;
  name: string;
  type: string;
  license_sku_name: string;
  requestButton: boolean;
  license_exceed_allowed_entitlement: number;
  license_number_entitlement: number;
  increase_by: number;
  license_limit_entitlement: number;
}

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenVerify, setTokenVerify] = useState(false);
  const [onlyToken, setOnlyToken] = useState('');
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
  const [org_id, setorg_id] = useState<any>('');
  const [user_id, setuser_id] = useState<any>('');
  const [site_id, setsite_id] = useState<any>('');
  const [org_name, setorg_name] = useState<any>('');
  const [user_email, setuser_email] = useState<any>('');
  const [site_name, setsite_name] = useState<any>('');
  const [site_type_id, settype_id] = useState<any>('');
  useEffect(() => {
    const orgid = decryptData(localStorage.getItem('org_id'));
    const orgname = decryptData(localStorage.getItem('org_name'));
    const sitename = decryptData(localStorage.getItem('site_name'));
    const sitetypeid = decryptData(localStorage.getItem('site_type_id'));
    const useremail = decryptData(localStorage.getItem('user_email'));
    const userid = decryptData(localStorage.getItem('user_id'));
    const siteid = decryptData(localStorage.getItem('site_id'));
    setorg_id(orgid);
    setorg_name(orgname);
    setsite_id(siteid);
    setuser_id(userid);
    setuser_email(useremail);
    setsite_name(sitename);
    settype_id(sitetypeid);
  }, []);
  const [selectedSku, setSelectedSku] = useState<string>('');
  const [selectedSkuClass, setSelectedSkuClass] = useState<0 | 1 | 2 | null>(
    null,
  );
  const [groupedLicenseData, setGroupedLicenseData] = useState<{
    [key: string]: License[];
  } | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (org_id) {
          const data: any = await getSKUList({ orgId: org_id });
          if (data) {
            const sortedData = data.data.sort((a: License, b: License) =>
              a.type.localeCompare(b.type),
            );
            const groupedData = sortedData.reduce(
              (acc: { [key: string]: License[] }, license: License) => {
                if (!acc[license.type]) {
                  acc[license.type] = [];
                }
                acc[license.type].push(license);
                return acc;
              },
              {},
            );
            setGroupedLicenseData(groupedData);
          }
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [org_id]);

  const handleSelectSku = async (licenseData: License, classx: 0 | 1 | 2) => {
    setLoading(true);
    if (licenseData.license_exceed_allowed_entitlement === null) {
      setSelectedSku(licenseData.license_sku_name);
      setSelectedSkuClass(classx);
      setLoading(false);
    } else {
      const objForCheckLimitApi = {
        orgId: org_id,
        license_limit_entitlement: licenseData.license_limit_entitlement,
        increase_by: licenseData.increase_by,
        license_number_entitlement: licenseData.license_number_entitlement,
        license_exceed_allowed_entitlement:
          licenseData.license_exceed_allowed_entitlement,
      };
      try {
        const result = await checkLimit(objForCheckLimitApi);
        if (result && result.errorCode === 0) {
          if (result.requestButton) {
            setLoading(false);
            swal({
              title:
                'Requesting this License will exceed your allowed Limit for requestable Licenses of this type.',
              text: 'If you continue Litmus will be notified and will reach out to you. Do you want to proceed?',
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
              if (willProceed) {
                setLoading(true);
                try {
                  const data = {
                    userName: user_email,
                    org_name: org_name,
                    site_name: site_name,
                    token: onlyToken,
                  };
                  const result = await reqLicenseLimitMail(data);
                  if (result.errorCode === 0) {
                    setSelectedSku(licenseData.license_sku_name);
                    setSelectedSkuClass(classx);
                    setLoading(false);

                    toast.success('License mail request sent!', {
                      autoClose: 3000,
                    });
                  } else {
                    setLoading(false);
                    toast.error(result.message, { autoClose: 3000 });
                  }
                } catch {
                  setLoading(false);
                }
              } else {
                setLoading(false);
                handleCancel();
              }
            });
          } else {
            setLoading(false);
            toast.warning('You cannot request this License.', {
              autoClose: 3000,
            });
          }
        } else {
          toast.error('Error checking License limit..', {
            autoClose: 3000,
          });
        }
      } catch (error: any) {
        toast.error(error, {
          autoClose: 3000,
        });
        setLoading(false);
      }
    }
  };
  const handleCancel = () => {
    setSelectedSku('');
    setSelectedSkuClass(null);
  };
  const handleAddLicense = async () => {
    setLoading(true);
    if (!selectedSku) {
      setLoading(false);
      toast.error('Please select a License Sku', { autoClose: 3000 });
      return;
    }

    // toast.warning(selectedSku, { autoClose: 3000 });
    const API_KEY = 'f11c9bf3-c56a-49cd-a9ae-480eeaa140b6';
    try {
      // setLoading(true);
      const headers = {
        Authorization: API_KEY,
        'Content-Type': 'application/json',
      };

      const body = {
        licenseName: selectedSku,
      };

      const response = await axios.post(
        'https://litmus.licensing-portal.staging.litmus.io/licensing-portal/license/key',
        body,
        { headers },
      );
      if (response) {
        const data = {
          licenseNumber: response,
          type: site_type_id,
          siteId: site_id,
          userId: user_id,
        };
        if (data) {
          try {
            const resultforinsertlicense = await insertLicence(data);
            if (resultforinsertlicense) {
              if (resultforinsertlicense.errorCode === 0) {
                // const resultforinsertlicense= await increaseValue(data);
              }
            }
          } catch {
            setLoading(false);
          }
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        toast.error(
          `Error: ${error.response?.data?.message || 'Something went wrong'}`,
          { autoClose: 3000 },
        );
      } else {
        toast.error('Unexpected error occurred', { autoClose: 3000 });
      }
    }
  };
  return (
    <>
      {loading && <Loader />}
      {tokenVerify && (
        <>
          <ToastContainer />
          <div className='grid grid-cols-12 gap-x-6 py-4 mt-[1rem]'>
            <div className='xl:col-span-12 col-span-12'>
              <h5 className='font-semibold text-center text-[1.25rem] !text-defaulttextcolor'>
                {' '}
                Select License{' '}
              </h5>
            </div>
          </div>

          <div className='grid grid-cols-12 gap-6'>
            <div className='xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-12 col-span-12'>
              <div
                className={`box overflow-hidden ${
                  selectedSkuClass === 0 ? 'border border-primary' : ''
                }`}
              >
                <div className='box-body !p-0'>
                  <div className='px-1 py-2 bg-primary'></div>
                  <div className='!p-6'>
                    <div className='flex justify-between items-center mb-4 ms-4'>
                      <div className='text-[1.52rem] font-semibold'>
                        Litmus Edge
                      </div>
                    </div>

                    {groupedLicenseData && groupedLicenseData['litmus_edge'] ? (
                      <ul className='list-none mb-0'>
                        {groupedLicenseData['litmus_edge'].map(
                          (licenseData, index) =>
                            licenseData && licenseData.requestButton ? (
                              <li
                                onChange={() => handleSelectSku(licenseData, 0)}
                                key={index}
                                className='flex items-center  pricing-li rounded-md p-4'
                              >
                                <span className='me-2'>
                                  <div
                                    className='form-check'
                                    style={{ display: 'flex' }}
                                  >
                                    <input
                                      className='form-check-input'
                                      type='radio'
                                      name='flexRadioDefault'
                                      // id="flexRadioDefault1"
                                      id={`flexRadioDefault-litmus_edge-${index}`}
                                      checked={
                                        selectedSku ===
                                        licenseData.license_sku_name
                                      }
                                    />
                                    <label
                                      className='form-check-label'
                                      htmlFor='flexRadioDefault1'
                                    >
                                      {licenseData.name}
                                    </label>
                                  </div>
                                </span>
                              </li>
                            ) : (
                              messageFnc(index, licenseData)
                            ),
                        )}
                      </ul>
                    ) : (
                      <div className='col-md-12 w-100 mt-12'>
                        <p className='text-center'>No Plan Found</p>{' '}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-12 col-span-12'>
              <div
                className={`box overflow-hidden ${
                  selectedSkuClass === 1 ? 'border border-primary' : ''
                }`}
              >
                <div className='box-body !p-0'>
                  <div className='px-1 py-2 bg-primary'></div>
                  <div className='!p-6'>
                    <div className='flex justify-between items-center mb-4 ms-4'>
                      <div className='text-[1.52rem] font-semibold'>
                        LitmusEdgeManager
                      </div>
                    </div>
                    {groupedLicenseData &&
                    groupedLicenseData['litmus_edge_manager'] ? (
                      <ul className='list-none mb-0'>
                        {groupedLicenseData['litmus_edge_manager'].map(
                          (licenseData, index) =>
                            licenseData && licenseData.requestButton ? (
                              <li
                                key={index}
                                className='flex items-center  pricing-li rounded-md p-4'
                              >
                                <span className='me-2'>
                                  <div
                                    className='form-check '
                                    style={{ display: 'flex' }}
                                  >
                                    <input
                                      className='form-check-input'
                                      type='radio'
                                      onChange={() =>
                                        handleSelectSku(licenseData, 1)
                                      }
                                      checked={
                                        selectedSku ===
                                        licenseData.license_sku_name
                                      }
                                      name='flexRadioDefault'
                                      // id="flexRadioDefault2"
                                      id={`flexRadioDefault-litmus_edge_manager-${index}`}
                                    />
                                    <label
                                      className='form-check-label'
                                      htmlFor='flexRadioDefault2'
                                    >
                                      {licenseData.name}
                                    </label>
                                  </div>
                                </span>
                              </li>
                            ) : (
                              messageFnc(index, licenseData)
                            ),
                        )}
                      </ul>
                    ) : (
                      <div className='col-md-12 w-100 mt-12'>
                        <p className='text-center'>No Plan Found</p>{' '}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-12 col-span-12'>
              <div
                className={`box overflow-hidden ${
                  selectedSkuClass === 2 ? 'border border-primary' : ''
                }`}
              >
                <div className='box-body !p-0'>
                  <div className='px-1 py-2 bg-primary'></div>
                  <div className='!p-6'>
                    <div className='flex justify-between items-center mb-4 ms-4'>
                      <div className='text-[1.52rem] font-semibold'>AddOns</div>
                    </div>
                    {groupedLicenseData && groupedLicenseData['addon'] ? (
                      <ul className='list-none mb-0'>
                        {groupedLicenseData['addon'].map(
                          (licenseData, index) =>
                            licenseData && licenseData.requestButton ? (
                              <li
                                key={index}
                                className='flex items-center  pricing-li rounded-md p-4'
                              >
                                <span className='me-2'>
                                  <div
                                    className='form-check '
                                    style={{ display: 'flex' }}
                                  >
                                    <input
                                      className='form-check-input'
                                      type='radio'
                                      onChange={() =>
                                        handleSelectSku(licenseData, 2)
                                      }
                                      checked={
                                        selectedSku ===
                                        licenseData.license_sku_name
                                      }
                                      name='flexRadioDefault'
                                      // id="flexRadioDefault2"
                                      id={`flexRadioDefault-addon-${index}`}
                                    />
                                    <label
                                      className='form-check-label'
                                      htmlFor='flexRadioDefault2'
                                    >
                                      {licenseData.name}
                                    </label>
                                  </div>
                                </span>
                              </li>
                            ) : (
                              messageFnc(index, licenseData)
                            ),
                        )}
                      </ul>
                    ) : (
                      <div className='col-md-12 w-100 mt-12'>
                        <p className='text-center'>No Plan Found</p>{' '}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1   py-4 mt-[1rem]'>
            <div className='flex justify-center '>
              <div className='ti-btn-list  space-x-2 rtl:space-x-reverse'>
                <button
                  className='ti-btn ti-btn-outline-dark ti-btn-wave'
                  type='button'
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className={`${
                    selectedSku === ''
                      ? 'ti-btn ti-btn bg-gray-500 !mb-2 ti-btn-wave'
                      : 'ti-btn ti-btn-primary-full !mb-2 ti-btn-wave'
                  }`}
                  type='button'
                  onClick={() => handleAddLicense()}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;

const messageFnc = (index: number, licenseData: License) => {
  return (
    <li key={index} className='relative group'>
      <div className='flex items-center mb-3'>
        <a
          className='text-[18px] !w-[1.9rem] rounded-sm !h-[1.9rem] !leading-[1.9rem] inline-flex items-center justify-center'
          style={{ cursor: 'pointer' }}
        >
          <i className='ri-information-line text-[1rem] text-black'></i>
        </a>
        <label
          className='form-check-label'
          htmlFor='flexRadioDefault1'
          style={{ cursor: 'pointer' }}
        >
          {licenseData.name}
        </label>
      </div>
      <div className='absolute hidden tool-custom1 group-hover:block bg-gray-400 text-black text-xs rounded p-2 z-10 bottom-full mb-2 max-w-xs break-words'>
        You have reached the limit of allowed licenses.
      </div>
    </li>
  );
};
