/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';

import { modifyUserOfSites } from '@/supabase/site_users';

const OrgDashboard = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staticUserData = {
          user_id: '1',
          role_id: '3',
          site_id: '1',
          email: 'parthr@nichetech.com',
          firstname: 'Parth',
          lastname: 'Roka',
        };
        const data: any = await modifyUserOfSites(staticUserData);
        setResult(data);
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
