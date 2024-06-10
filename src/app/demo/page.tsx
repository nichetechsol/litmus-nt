/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';

import { listLitmusProducts } from '@/supabase/products';

const OrgDashboard = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await listLitmusProducts(1);
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
