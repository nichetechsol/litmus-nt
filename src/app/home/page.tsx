/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

const Welcome: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const storedEntraInfo = localStorage.getItem(
      'sb-emsjiuztcinhapaurcrl-auth-token',
    );
    if (storedEntraInfo) {
      const decryptedstoredEntraInfo = JSON.parse(storedEntraInfo);
      if (decryptedstoredEntraInfo) {
        setUserInfo(decryptedstoredEntraInfo.user.user_metadata.custom_claims);
      }
    }
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md text-center'>
        {userInfo ? (
          <>
            <h1 className='text-2xl font old mb-4'>
              Welcome, {userInfo.email}
            </h1>
            <p className='text-lg mb-6'>
              You are successfully logged in through Entra.
            </p>
            <a
              href='https://litmus.com'
              className='inline lock bg lue-500 text-white py-2 px-4 rounded hover:bg lue-600 transition mb-6'
            >
              Continue with Litmus
            </a>
            <table className='min-w-full bg-white'>
              <thead>
                <tr>
                  <th className='py-2 px-4 border   border-black'>Field</th>
                  <th className='py-2 px-4 border   border-black'>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='py-2 px-4 border   border-black'>City</td>
                  <td className='py-2 px-4 border  border-black'>
                    {userInfo.City}
                  </td>
                </tr>
                <tr>
                  <td className='py-2 px-4 border  border-black'>First Name</td>
                  <td className='py-2 px-4 border  border-black'>
                    {userInfo['First Name']}
                  </td>
                </tr>
                <tr>
                  <td className='py-2 px-4 border  border-black'>
                    I am a Litmus
                  </td>
                  <td className='py-2 px-4 border  border-black'>
                    {userInfo['I am a Litmus']}
                  </td>
                </tr>
                <tr>
                  <td className='py-2 px-4 border  border-black'>Last Name</td>
                  <td className='py-2 px-4 border  border-black'>
                    {userInfo['Last Name']}
                  </td>
                </tr>
                <tr>
                  <td className='py-2 px-4 border   border-black'>
                    Organization Name
                  </td>
                  <td className='py-2 px-4 border   border-black'>
                    {userInfo['Organization Name']}
                  </td>
                </tr>
                <tr>
                  <td className='py-2 px-4 border   border-black'>
                    Postal Code
                  </td>
                  <td className='py-2 px-4 border   border-black'>
                    {userInfo['Postal Code']}
                  </td>
                </tr>
                <tr>
                  <td className='py-2 px-4 border   border-black'>Site Name</td>
                  <td className='py-2 px-4 border   border-black'>
                    {userInfo['Site Name']}
                  </td>
                </tr>
                <tr>
                  <td className='py-2 px-4 border   border-black'>
                    State/Province
                  </td>
                  <td className='py-2 px-4 border   border-black'>
                    {userInfo['State/Province']}
                  </td>
                </tr>
                <tr>
                  <td className='py-2 px-4 border   border-black'>
                    Street Address
                  </td>
                  <td className='py-2 px-4 border   border-black'>
                    {userInfo['Street Address']}
                  </td>
                </tr>
                <tr>
                  <td className='py-2 px-4 border   border-black'>
                    This is a business Account
                  </td>
                  <td className='py-2 px-4 border   border-black'>
                    {userInfo['This is a business Account']}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Welcome;
