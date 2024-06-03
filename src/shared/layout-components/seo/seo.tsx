import Head from 'next/head';
import React from 'react';

import favicon from '../../../../public/assets/images/brand-logos/fav-icon.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Seo = ({ title }: any) => {
  const i = `Ynex - ${title}`;

  return (
    <Head>
      <title>{i}</title>
      <link href={favicon.src} rel='icon'></link>
      <meta
        name='description'
        content='Ynex - Nextjs Admin &amp; Dashboard Template'
      />
      <meta name='author' content='Spruko Technologies Private Limited' />
      <meta
        name='keywords'
        content='nextjs admin template, nextjs template, admin, next js tailwind, nextjs, typescript, tailwind nextjs, nextjs typescript, template dashboard,tailwind css, admin dashboard template, tailwind dashboard, dashboard, tailwind'
      ></meta>
    </Head>
  );
};

export default Seo;
