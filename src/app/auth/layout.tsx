import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/colors.css';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Pre-built components with awesome default',
};
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
