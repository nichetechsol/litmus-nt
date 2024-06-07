/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';

import supabase from '@/supabase/db';

const OrgDashboard = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('Litmus_Products')
          .list(); // replace 'folder-path' with the path inside your bucket

        if (error) {
          const error1: any = error;
          setResult(error1);
        } else {
          const data1: any = data;
          setResult(data1);
          // }else {
          //           setResult(data1);
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
