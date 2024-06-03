'use client';
import { usePathname } from 'next/navigation';

import '@/styles/globals.scss';

// Import your layout components
// import ContentLayout from '@/shared/layout-components/layout/content-layout';

// export const metadata = {
//   title: 'My Next.js App', // Add your desired metadata here
// };

// Define interface for layout functions
interface LayoutComponent {
  (props: { children: React.ReactNode }): JSX.Element;
}

// Define layout mapping using an interface
const layouts: { [route: string]: LayoutComponent } = {
  // '/dashboard': ContentLayout,
  // '/organization': ContentLayout,
  // '/orgdashboard': ContentLayout,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locationPath = usePathname();

  // Determine the appropri  console.log(locationPath);ate layout based on the route
  const baseRoute = getBaseRoute(locationPath || '/auth');
  const Layout = layouts[baseRoute]; // Use ContentLayout as default

  return (
    <html lang='en'>
      <head>
        <title>Litmus</title>
        {/* Add additional meta tags as needed */}
      </head>
      <body>
        {Layout && <Layout>{children}</Layout>}{' '}
        {/* Conditionally render layout */}
      </body>
    </html>
  );
}

const getBaseRoute = (path: string) => {
  const parts = path.split('/');
  return `/${parts[1]}`;
};
