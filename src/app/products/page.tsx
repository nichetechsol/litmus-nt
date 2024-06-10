/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import React, { Fragment } from 'react';

const Page = () => {
  return (
    <>
      <div className='my-5'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='xl:col-span-3 col-span-12'>
            <div className='box custom-box overflow-hidden'>
              <div className='box-header !border-b-0'>
                <div className='box-title'>Folders</div>
              </div>
              <div className='box-body !p-0'>
                <ul className='list-group nft-list'>
                  <li className='list-group-item'>
                    <Link
                      aria-label='anchor'
                      href='#!'
                      className='stretched-link'
                    ></Link>
                    <div className='flex items-center gap-2'>
                      <div>
                        <span className='avatar avatar-rounded avatar-sm bg-light p-1'>
                          <img
                            src='../../../../assets/images/nft-images/34.png'
                            alt=''
                          />
                        </span>
                      </div>
                      <div className='text-[.875rem] font-semibold my-auto'>
                        Litmus_Edge
                      </div>
                    </div>
                  </li>
                  <li className='list-group-item'>
                    <Link
                      aria-label='anchor'
                      href='#!'
                      className='stretched-link'
                    ></Link>
                    <div className='flex items-center gap-2'>
                      <div>
                        <span className='avatar avatar-rounded avatar-sm bg-light p-1'>
                          <img
                            src='../../../../assets/images/nft-images/35.png'
                            alt=''
                          />
                        </span>
                      </div>
                      <div className='text-[.875rem] font-semibold my-auto'>
                        Litmus_Edge_Manager
                      </div>
                    </div>
                  </li>
                  <li className='list-group-item'>
                    <Link
                      aria-label='anchor'
                      href='#!'
                      className='stretched-link'
                    ></Link>
                    <div className='flex items-center gap-2'>
                      <div>
                        <span className='avatar avatar-rounded avatar-sm bg-light p-1'>
                          <img
                            src='../../../../assets/images/nft-images/36.png'
                            alt=''
                          />
                        </span>
                      </div>
                      <div className='text-[.875rem] font-semibold my-auto'>
                        Litmus_MQTT_Broker
                      </div>
                    </div>
                  </li>
                  <li className='list-group-item'>
                    <Link
                      aria-label='anchor'
                      href='#!'
                      className='stretched-link'
                    ></Link>
                    <div className='flex items-center gap-2'>
                      <div>
                        <span className='avatar avatar-rounded avatar-sm bg-light p-1'>
                          <img
                            src='../../../../assets/images/nft-images/39.png'
                            alt=''
                          />
                        </span>
                      </div>
                      <div className='text-[.875rem] font-semibold my-auto'>
                        Litmus_Edge_Manager
                      </div>
                    </div>
                  </li>
                  <li className='list-group-item'>
                    <Link
                      aria-label='anchor'
                      href='#!'
                      className='stretched-link'
                    ></Link>
                    <div className='flex items-center gap-2'>
                      <div>
                        <span className='avatar avatar-rounded avatar-sm bg-light p-1'>
                          <img
                            src='../../../../assets/images/nft-images/37.png'
                            alt=''
                          />
                        </span>
                      </div>
                      <div className='text-[.875rem] font-semibold my-auto'>
                        Litmus_MQTT_Broker
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='xl:col-span-9 col-span-12'>
            <div className='box custom-box'>
              <div className='box-header justify-between'>
                <div className='box-title'>Current</div>
                <div>
                  <button
                    type='button'
                    className='ti-btn ti-btn-primary-full btn-wave !me-3'
                  >
                    Current{' '}
                  </button>
                  <button
                    type='button'
                    className='ti-btn ti-btn-secondary-full btn-wave'
                  >
                    Archive
                  </button>
                </div>
              </div>
              <div className='box-body'>
                <ul className='list-none crm-top-deals mb-0'>
                  <li className='mb-[0.9rem] p-4 hover:bg-light border dark:border-defaultborder/10 rounded-md relative"'>
                    <div className='flex items-center flex-wrap'>
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
                          litmusedge-std_3.11.4-amd64.upd.md5
                        </p>
                        <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                          Size 16MB
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
                  <li className='mb-[0.9rem] p-4 hover:bg-light border dark:border-defaultborder/10 rounded-md relative"'>
                    <div className='flex items-center flex-wrap'>
                      <div className='me-2'>
                        <span className='inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-warning  bg-warning/10 font-semibold'>
                          EK
                        </span>
                      </div>
                      <div className='flex-grow'>
                        <p className='font-semibold mb-[1.4px]  text-[0.813rem]'>
                          litmusedge-std_3.11.4-amd64.upd.md5
                        </p>
                        <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                          Size 16MB
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
                  <li className='mb-[0.9rem] p-4 hover:bg-light border dark:border-defaultborder/10 rounded-md relative"'>
                    <div className='flex items-top flex-wrap '>
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
                          litmusedge-std_3.11.4-amd64.upd.md5
                        </p>
                        <p className='text-[#8c9097] dark:text-white/50 text-[0.75rem]'>
                          Size 16MB
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
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
