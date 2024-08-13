/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';

import { fetchProductData } from '@/supabase/products';

const OrgDashboard = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data1 = {
        org_id: 175,
        org_type_id: 1,
      };
      const data: any = await fetchProductData(data1);

      if (data) {
        setResult(data);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Organization Dashboard</h1>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      {error && <p>Error loading data: {error}</p>}
      {result && (
        <div>
          <h2>Entitlement Data</h2>
          {/* Adjust the structure based on the actual data shape */}
          <ul>
            {Object.keys(result).map((key) => (
              <li key={key}>
                <strong>{key}:</strong> {JSON.stringify(result[key], null, 2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrgDashboard;
