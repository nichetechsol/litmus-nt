import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/colors.css';
import '@/styles/globals.scss';
import ContentLayout from '@/shared/layout-components/layout/content-layout';
import LandingLayout from '@/shared/layout-components/layout/landing-layout';
import AuthenticationLayout from '@/shared/layout-components/layout/authentication-layout';
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Pre-built components with awesome default',
};


export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (

    <ContentLayout>{children}</ContentLayout>
  )
}