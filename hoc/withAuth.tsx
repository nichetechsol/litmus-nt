import { useRouter } from 'next/router';
import { useEffect, useState, ComponentType } from 'react';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('sb-emsjiuztcinhapaurcrl-auth-token');
      if (!token) {
        router.replace('/');
        setIsLoading(false);
      } else {
        // Here you would typically make a request to your backend to validate the token
        // For simplicity, I'll assume the token is valid for this example
        setIsLoading(false);
      }
    }, [router]);

    if (isLoading) {
      // You can render a loading indicator while authentication is being checked
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;




// import { useRouter } from 'next/router';
// import { useEffect, ComponentType } from 'react';

// const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
//   const Wrapper: React.FC<P> = (props) => {
//     const router = useRouter();

//     useEffect(() => {
//       const token = localStorage.getItem('sb-emsjiuztcinhapaurcrl-auth-token');
//       if (!token) {
//         router.replace('/');
//       }
//     }, [router]);

//     return <WrappedComponent {...props} />;
//   };

//   return Wrapper;
// };

// export default withAuth;
