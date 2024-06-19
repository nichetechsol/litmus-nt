/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { Fragment, useEffect, useState } from 'react';
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const [token, setToken] = useState<any>('');
  useEffect(() => {
    const tokens = localStorage.getItem('sb-emsjiuztcinhapaurcrl-auth-token');
    setToken(tokens);
  }, []);
  const footerClass = !token
    ? 'footer mt-auto xl:ps-[0rem] font-normal font-inter bg-white text-defaultsize leading-normal text-[0.813] shadow-[0_0_0.4rem_rgba(0,0,0,0.1)] dark:bg-bodybg py-4 text-center'
    : 'footer mt-auto xl:ps-[15rem] font-normal font-inter bg-white text-defaultsize leading-normal text-[0.813] shadow-[0_0_0.4rem_rgba(0,0,0,0.1)] dark:bg-bodybg py-4 text-center';
  return (
    <Fragment>
      <footer className={footerClass}>
        {/* <footer className='footer mt-auto xl:ps-[15rem]  font-normal font-inter bg-white text-defaultsize leading-normal text-[0.813] shadow-[0_0_0.4rem_rgba(0,0,0,0.1)] dark:bg-bodybg py-4 text-center'> */}
        <div className='container'>
          <span className='text-gray dark:text-defaulttextcolor/50'>
            {' '}
            Copyright © <span id='year'>{year} </span>All rights reserved{' '}
          </span>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
