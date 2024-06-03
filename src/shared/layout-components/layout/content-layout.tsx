/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import store from '@/shared/redux/store';

// import Backtotop from '../backtotop/backtotop'
// import Footer from '../footer/footer';
// import Header from '../header/header';
// import Sidebar from '../sidebar/sidebar';
import Switcher from '../switcher/switcher';

const ContentLayout = ({ children }: any) => {
  const [lateLoad, setlateLoad] = useState(false);
  const Add = () => {
    document.querySelector('body')?.classList.remove('error-1');
    document.querySelector('body')?.classList.remove('landing-body');
  };

  useEffect(() => {
    Add();
    setlateLoad(true);
  }, []);

  useEffect(() => {
    import('preline');
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <div style={{ display: `${lateLoad ? 'block' : 'none'}` }}>
          <Switcher />
          {/* <div className='page'>
        <Header/>
        <Sidebar/>
        <div className='content'>
          <div className='main-content'>
            {children}
          </div>
        </div>
        <Footer/>
      </div>
      <Backtotop /> */}
        </div>
      </Provider>
    </Fragment>
  );
};

export default ContentLayout;
