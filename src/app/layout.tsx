'use client';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import '../styles/globals.scss';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import AuthenticationLayout from '@/shared/layout-components/layout/authentication-layout';
import ContentLayout from '@/shared/layout-components/layout/content-layout';
import LandingLayout from '@/shared/layout-components/layout/landing-layout';

import { Providers } from './providers';
// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
// export const metadata: Metadata = {
//   metadataBase: new URL(siteConfig.url),
//   title: {
//     default: siteConfig.title,
//     template: `%s | ${siteConfig.title}`,
//   },
//   description: siteConfig.description,
//   robots: { index: true, follow: true },
//   // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
//   // ! copy to /favicon folder
//   icons: {
//     icon: '/favicon/favicon.ico',
//     shortcut: '/favicon/favicon-16x16.png',
//     apple: '/favicon/apple-touch-icon.png',
//   },
//   manifest: `/favicon/site.webmanifest`,
//   openGraph: {
//     url: siteConfig.url,
//     title: siteConfig.title,
//     description: siteConfig.description,
//     siteName: siteConfig.title,
//     images: [`${siteConfig.url}/images/og.jpg`],
//     type: 'website',
//     locale: 'en_US',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: siteConfig.title,
//     description: siteConfig.description,
//     images: [`${siteConfig.url}/images/og.jpg`],
//     // creator: '@th_clarence',
//   },
//   // authors: [
//   //   {
//   //     name: 'Theodorus Clarence',
//   //     url: 'https://theodorusclarence.com',
//   //   },
//   // ],
// };
const getBaseRoute = (path: string) => {
  const parts = path.split('/');
  return `/${parts[1]}`;
};
// Define interface for layout functions
interface LayoutComponent {
  (props: { children: React.ReactNode }): JSX.Element;
}
// Define layout mapping using an interface
const layouts: { [route: string]: LayoutComponent } = {
  '/landing': LandingLayout,
  '/auth/*': AuthenticationLayout,
  // '/dashboard': ContentLayout,
  '/organization': ContentLayout,
  '/orgdashboard': ContentLayout,
  '/sites': ContentLayout,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locationPath = usePathname();

  // Determine the appropri  console.log(locationPath);ate layout based on the route
  const baseRoute = getBaseRoute(locationPath || '/auth');
  const Layout = layouts[baseRoute] || AuthenticationLayout; // Use ContentLayout as default
  return (
    <html lang='en'>
      <head>
        <title>Litmus</title>
        {/* Add additional meta tags as needed */}
      </head>
      <body>
        <Providers>
          {Layout && <Layout>{children}</Layout>}{' '}
          {/* Conditionally render layout */}
        </Providers>
      </body>
    </html>
  );
}
