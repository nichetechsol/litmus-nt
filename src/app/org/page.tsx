/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';

import { allfiles } from '@/supabase/products';

const OrgDashboard = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const { data, error } = await supabase.storage
        //   .from('Litmus_Products')
        //   .list();

        // const { data, error } = await supabase.storage
        //   .from('Litmus_Products')
        //   .list('Litmus_Edge/LE_3-11-4', {
        //     limit: 100,
        //     offset: 0,
        //     sortBy: { column: 'name', order: 'asc' },
        //   });
        // if (error) {
        //   const error1: any = error;
        //   setResult(error1);
        // } else {
        const data = await allfiles();
        const data1: any = data;
        setResult(data1);
        // }else {
        //           setResult(data1);
        // }
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
