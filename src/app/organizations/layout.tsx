import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.scss';
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Pre-built components with awesome default',
};


export default function OrgLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  )
}