import '../styles/globals.scss';
import ContentLayout from '../shared/layout-components/layout/content-layout';
import Authenticationlayout from "../shared/layout-components/layout/authentication-layout";
import Landinglayout from '@/shared/layout-components/layout/landing-layout';
import { useEffect, useState } from 'react';  

const layouts:any = {

  Contentlayout: ContentLayout,
  Landinglayout: Landinglayout,
  Authenticationlayout: Authenticationlayout,

};
function MyApp({ Component, pageProps }:any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('sb-emsjiuztcinhapaurcrl-auth-token');
    setIsAuthenticated(!!token);
  }, []);
  
  const Layout = layouts[Component.layout] || ((pageProps: any) => <Component>{pageProps}</Component>);

  return (

    <Layout>
      <Component {...pageProps} />
    </Layout>
    
  )
}

export default MyApp;