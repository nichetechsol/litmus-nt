import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.scss';

import AuthenticationLayout from '@/shared/layout-components/layout/authentication-layout';
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Pre-built components with awesome default',
};

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <AuthenticationLayout>{children}</AuthenticationLayout>;
}
