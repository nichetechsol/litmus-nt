/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { Fragment } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import store from '@/shared/redux/store';

import Switcher from '../switcher/switcher';

const Authenticationlayout = ({ children }: any) => {
  return (
    <Fragment>
      <Provider store={store}>
        <HelmetProvider>
          <Helmet>
            <body className=''></body>
          </Helmet>
          {children}
          <Switcher />
        </HelmetProvider>
      </Provider>
    </Fragment>
  );
};

export default Authenticationlayout;
