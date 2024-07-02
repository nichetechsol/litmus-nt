/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';

import { deleteDomains } from '@/supabase/org_details';

const OrgDashboard = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const staticUserData = {
        //   user_id: '1',
        //   role_id: '2',
        //   site_id: '1',
        //   email: 'parthr@nichetech.com',
        //   firstname: 'Parth',
        //   lastname: 'Roka',
        // };

        // const data1: any = {
        //   userName: 'shruti@nichetech.com',
        //   siteName: 'Nichetech Ahmedabad',
        //   orgName: 'Nichetech',
        //   token:
        //     'eyJhbGciOiJIUzI1NiIsImtpZCI6ImpmZVZXUEovY3RVdElDRTYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE5OTAwODgxLCJpYXQiOjE3MTk4OTcyODEsImlzcyI6Imh0dHBzOi8vZW1zaml1enRjaW5oYXBhdXJjcmwuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImQ2MTA4ODVmLWU2Y2YtNDdmZi04ODBhLTkxN2YzN2Q2Y2EzOSIsImVtYWlsIjoicGFydGhyQG5pY2hldGVjaC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxOTg5NzI3OX1dLCJzZXNzaW9uX2lkIjoiY2ExN2MxMDktZGJiNi00YjM1LWI2Y2EtNzkwZjE0YTMyZDdkIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.fqElYLq12BA1h6f77UC6bLV64o4IfRTpE5whkOa4dxo',
        // };

        const data: any = await deleteDomains(269, 201, 6);

        // const { data, error } = await supabase
        //   .from('site_users')
        //   .update({ role_id: 3 })
        //   .eq('id', 14)
        //   .select();
        if (data) {
          const data1: any = data;
          setResult(data1);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  return (
    <div>
      <h1>Organization Dashboard</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

export default OrgDashboard;
