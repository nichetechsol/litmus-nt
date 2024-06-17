/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import axios from 'axios';
import { redirect } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { decryptData } from '@/helper/Encryption_Decryption';
import { getSKUList } from '@/supabase/licence';
import Loader from '@/utils/Loader/Loader';

interface License {
  id: any;
  name: string;
  type: string;
  license_sku_name: string;
}

const Page = () => {
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
  const [org_id, setorg_id] = useState<any>('');
  useEffect(() => {
    const orgid = decryptData(localStorage.getItem('org_id'));
    setorg_id(orgid);
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
            const sortedData = data.sort((a: License, b: License) =>
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
      } catch (error: any) {
        setLoading(false);
        // console.error("Error fetching organization details:", error.message);
      }
    };
    fetchData();
  }, [org_id]);

  const handleSelectSku = (skuName: string, classx: 0 | 1 | 2) => {
    setSelectedSku(skuName);
    setSelectedSkuClass(classx);
  };
  const handleCancel = () => {
    setSelectedSku('');
    setSelectedSkuClass(null);
  };
  const handleAddLicense = async () => {
    if (!selectedSku) {
      toast.error('Please select a Licence Sku', { autoClose: 3000 });
      return;
    }
    const API_KEY =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtc2ppdXp0Y2luaGFwYXVyY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0ODc1MTUsImV4cCI6MjAzMDA2MzUxNX0.79_004dmDW8KA-wXxBD2EP3iwNUu_FhCvumdN4jiCWk';
    try {
      setLoading(true);
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
        //
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
          {/* <div className="grid grid-cols-12 gap-6">
      {groupedLicenseData && Object.keys(groupedLicenseData).map((type, index) => (
          <div key={index} className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-12 col-span-12">
            <div className="box overflow-hidden">
              <div className="box-body !p-0">
                <div className="px-1 py-2 bg-primary"></div>
                <div className="!p-6">
                  <div className="flex justify-between items-center mb-4 ms-4">
                    <div className="text-[1.52rem] font-semibold">{type}</div>
                  </div>
                  <ul className="list-none mb-0">
                    {groupedLicenseData[type].map((license, subIndex) => (
                      <li key={subIndex} className="flex items-center pricing-li rounded-md p-4">
                        <span className="me-2">
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id={`flexRadioDefault${index}-${subIndex}`} />
                            <label className="form-check-label" htmlFor={`flexRadioDefault${index}-${subIndex}`}>
                              {license.name}
                            </label>
                          </div>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
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

                    {groupedLicenseData &&
                      groupedLicenseData['litmus_edge'] && (
                        <ul className='list-none mb-0'>
                          {groupedLicenseData['litmus_edge'].map(
                            (licenseData, index) => (
                              <li
                                onChange={() =>
                                  handleSelectSku(
                                    licenseData.license_sku_name,
                                    0,
                                  )
                                }
                                key={index}
                                className='flex items-center  pricing-li rounded-md p-4'
                              >
                                <span className='me-2'>
                                  <div className='form-check '>
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
                            ),
                          )}
                        </ul>
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
                      groupedLicenseData['litmus_edge_manager'] && (
                        <ul className='list-none mb-0'>
                          {groupedLicenseData['litmus_edge_manager'].map(
                            (licenseData, index) => (
                              <li
                                key={index}
                                className='flex items-center  pricing-li rounded-md p-4'
                              >
                                <span className='me-2'>
                                  <div className='form-check '>
                                    <input
                                      className='form-check-input'
                                      type='radio'
                                      onChange={() =>
                                        handleSelectSku(
                                          licenseData.license_sku_name,
                                          1,
                                        )
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
                            ),
                          )}
                        </ul>
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
                    {groupedLicenseData && groupedLicenseData['addon'] && (
                      <ul className='list-none mb-0'>
                        {groupedLicenseData['addon'].map(
                          (licenseData, index) => (
                            <li
                              key={index}
                              className='flex items-center  pricing-li rounded-md p-4'
                            >
                              <span className='me-2'>
                                <div className='form-check '>
                                  <input
                                    className='form-check-input'
                                    type='radio'
                                    onChange={() =>
                                      handleSelectSku(
                                        licenseData.license_sku_name,
                                        2,
                                      )
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
                          ),
                        )}
                      </ul>
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
                  className='ti-btn ti-btn-primary-full !mb-2 ti-btn-wave'
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
