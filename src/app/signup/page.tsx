/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import React, { Fragment } from 'react';

import Footer from '@/shared/layout-components/footer/footer';

const LoginForm = () => {
  return (
    <>
      {/* {tokenVerify === true ? */}
      <Fragment>
        <div className='bg-theme'>
          <div className='authentication authentication-basic signin-new'>
            <div className='container'>
              <div className='flex justify-center   items-center h-90 text-defaultsize text-defaulttextcolor'>
                <div className='login-div'>
                  <div className='xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12'>
                    <div className='my-[2.5rem] flex justify-center'>
                      <Link href='/' onClick={() => window.location.reload()}>
                        <img
                          // src={`${
                          // process.env.NODE_ENV === 'production'
                          // ? basePath
                          // : ''
                          // }/assets/images/brand-logos/desktop-logo.png`}
                          alt='logo'
                          className='desktop-logo '
                        />
                        <img
                          // src={`${
                          //   process.env.NODE_ENV === 'production'
                          //     ? basePath
                          //     : ''
                          // }/assets/images/brand-logos/desktop-dark.png`}
                          alt='logo'
                          className='desktop-dark login-logo'
                        />
                        {/* <Image
                        src='/assets/images/brand-logos/desktop-logo.png'
                        alt='logo'
                        width={100}
                        height={100}
                        className='desktop-logo '
                      />
                      <Image
                        src='/assets/images/brand-logos/desktop-logo.png'
                        alt='logo'
                        width={100}
                        height={100}
                        className='desktop-dark login-logo'
                      /> */}
                      </Link>
                    </div>

                    <div className='box !p-[3rem]'>
                      <div
                        className='box-body !p-0'
                        role='tabpanel'
                        id='pills-with-brand-color-01'
                        aria-labelledby='pills-with-brand-color-item-1'
                      >
                        <p className='h5 font-semibold mb-2 text-center'>
                          Add Details
                        </p>

                        {/* <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">Welcome back Jhon !</p> */}
                        <div className='grid grid-cols-12 gap-y-4'>
                          <div className='xl:col-span-12 col-span-12 mb-2'>
                            <label
                              htmlFor='signin-password'
                              className='form-label text-default block'
                            >
                              Password
                              <span className='text-danger'>&nbsp;*</span>
                            </label>
                            <div className='input-group'>
                              <input
                                name='password'
                                type='password'
                                maxLength={16}
                                className='form-control form-control-lg !rounded-s-md'
                                id='signin-password'
                                placeholder='Password'
                              />
                              <button
                                aria-label='button'
                                className='ti-btn ti-btn-light !rounded-s-none !mb-0'
                                type='button'
                                id='button-addon2'
                              >
                                <i className='ri-eye-off-line'></i>
                              </button>
                            </div>
                          </div>
                          <div className='xl:col-span-12 col-span-12 mb-2'>
                            <label
                              htmlFor='signin-password'
                              className='form-label text-default block'
                            >
                              Re-enter Password
                              <span className='text-danger'>&nbsp;*</span>
                            </label>
                            <div className='input-group'>
                              <input
                                name='password'
                                type='password'
                                maxLength={16}
                                className='form-control form-control-lg !rounded-s-md'
                                id='signin-password'
                                placeholder='Password'
                              />
                              <button
                                aria-label='button'
                                className='ti-btn ti-btn-light !rounded-s-none !mb-0'
                                type='button'
                                id='button-addon2'
                              >
                                <i className='ri-eye-off-line'></i>
                              </button>
                            </div>
                          </div>

                          <div className='xl:col-span-12 col-span-12'>
                            <label
                              htmlFor='signin-email'
                              className='form-label text-default'
                            >
                              Given Name
                              <span className='text-danger'>&nbsp;*</span>
                            </label>
                            <input
                              type='text'
                              name='email'
                              className='form-control form-control-lg w-full !rounded-md'
                              id='email'
                              placeholder='Email'
                            />

                            {/* <input type="text" name="email" className="form-control form-control-lg w-full !rounded-md" id="email" onChange={changeHandler} value={email}/> */}
                          </div>
                          <div className='xl:col-span-12 col-span-12'>
                            <label
                              htmlFor='signin-email'
                              className='form-label text-default'
                            >
                              Surname
                              <span className='text-danger'>&nbsp;*</span>
                            </label>
                            <input
                              type='text'
                              name='email'
                              className='form-control form-control-lg w-full !rounded-md'
                              id='email'
                              placeholder='Email'
                            />
                          </div>

                          <div className='xl:col-span-12 col-span-12 mb-2'>
                            <div className='mt-2'>
                              <div className='form-check !ps-0'>
                                <input
                                  style={{ cursor: 'pointer' }}
                                  className='form-check-input check-1'
                                  type='checkbox'
                                  value=''
                                  id='defaultCheck1'
                                />
                                <label className='form-check-label text-[#8c9097] dark:text-white/50 font-normal'>
                                  This is a Business account
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='xl:col-span-12 col-span-12'>
                            <label
                              htmlFor='signin-email'
                              className='form-label text-default'
                            >
                              Organization Name
                              <span className='text-danger'>&nbsp;*</span>
                            </label>
                            <input
                              type='text'
                              name='email'
                              className='form-control form-control-lg w-full !rounded-md'
                              id='email'
                              placeholder='Email'
                            />
                          </div>
                          <div className='xl:col-span-12 col-span-12'>
                            <label
                              htmlFor='signin-email'
                              className='form-label text-default'
                            >
                              Site Name
                              <span className='text-danger'>&nbsp;*</span>
                            </label>
                            <input
                              type='text'
                              name='email'
                              className='form-control form-control-lg w-full !rounded-md'
                              id='email'
                              placeholder='Email'
                            />
                          </div>

                          <div className='xl:col-span-12 col-span-12'>
                            <label
                              htmlFor='signin-email'
                              className='form-label text-default'
                            >
                              City<span className='text-danger'>&nbsp;*</span>
                            </label>
                            <input
                              type='text'
                              name='email'
                              className='form-control form-control-lg w-full !rounded-md'
                              id='email'
                              placeholder='Email'
                            />
                          </div>

                          <div className='xl:col-span-12 col-span-12'>
                            <label
                              htmlFor='signin-email'
                              className='form-label text-default'
                            >
                              Postal Code
                              <span className='text-danger'>&nbsp;*</span>
                            </label>
                            <input
                              type='text'
                              name='email'
                              className='form-control form-control-lg w-full !rounded-md'
                              id='email'
                              placeholder='Email'
                            />
                          </div>

                          <div className='xl:col-span-12 col-span-12'>
                            <label
                              htmlFor='signin-email'
                              className='form-label text-default'
                            >
                              Country/Region
                              <span className='text-danger'>&nbsp;*</span>
                            </label>
                            <input
                              type='text'
                              name='email'
                              className='form-control form-control-lg w-full !rounded-md'
                              id='email'
                              placeholder='Email'
                            />
                          </div>

                          <div className='xl:col-span-12 col-span-12'>
                            <label
                              htmlFor='signin-email'
                              className='form-label text-default'
                            >
                              State/Province
                              <span className='text-danger'>&nbsp;*</span>
                            </label>
                            <input
                              type='text'
                              name='email'
                              className='form-control form-control-lg w-full !rounded-md'
                              id='email'
                              placeholder='Email'
                            />
                          </div>

                          <div className='xl:col-span-12 col-span-12 grid mt-2'>
                            <button className='ti-btn ti-btn-primary !bg-primary !text-white !font-medium'>
                              Sign In
                            </button>
                            {/* <Link onClick={(e)=>{handleSubmit(e)}} href="#!" className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium">Sign In</Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2'></div>
                </div>
              </div>
            </div>
            <div className='position-footer'>
              <Footer />
            </div>
          </div>
        </div>
      </Fragment>
      {/* : null}  */}
    </>
  );
};

export default LoginForm;
