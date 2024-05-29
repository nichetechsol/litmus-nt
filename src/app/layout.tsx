// import '../app/styles/globals.scss';
// import ContentLayout from '../shared/layout-components/layout/content-layout';
// import Authenticationlayout from "../shared/layout-components/layout/authentication-layout";
// import Landinglayout from '@/shared/layout-components/layout/landing-layout';


//   import './styles/style.css';
// import React from 'react';

// export const metadata = {
//   title: 'My Next.js App',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }
"use client"
import {usePathname, useRouter } from 'next/navigation';
import Head from 'next/head';
import '../app/styles/globals.scss';
// Import your layout components
import ContentLayout from '@/shared/layout-components/layout/content-layout';
import AuthenticationLayout from '@/shared/layout-components/layout/authentication-layout';
import LandingLayout from '@/shared/layout-components/layout/landing-layout';
import { Providers } from './providers'

// export const metadata = {
//   title: 'My Next.js App', // Add your desired metadata here
// };

const layouts = {
  '/landing': LandingLayout, // Define the layout mapping for your landing route
  '/auth/*': AuthenticationLayout, // Apply authentication layout for all routes under /auth
  '/dashboard': ContentLayout, // Use ContentLayout for all other routes (default)
};

export default function RootLayout({ children }) {
  const router = useRouter();
  const locationPath = usePathname();
            console.log(locationPath);
            console.log(layouts[locationPath]);
  // Determine the appropri  console.log(locationPath);ate layout based on the route
  const baseRoute = getBaseRoute(locationPath);
  console.log(baseRoute);
  const Layout = layouts[baseRoute] || AuthenticationLayout; // Use ContentLayout as default

  return (
    <html lang="en">
      <head>
        <title>"My App"</title>
        {/* Add additional meta tags as needed */}
      </head>
      <body>
      <Providers>
      {Layout && <Layout>{children}</Layout>} {/* Conditionally render layout */}
        </Providers>
       
      </body>
    
    </html>
  );
}

const getBaseRoute = (path) => {
  const parts = path.split('/');
  return `/${parts[1]}`;
};