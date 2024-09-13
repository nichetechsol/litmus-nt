/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';

import { sitesCounts } from '@/supabase/sitedashboard';

const OrgDashboard = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // const data1 = {
      //   orgId: 175,
      //   license_limit_entitlement: 24,
      //   increase_by: 1000,
      //   license_number_entitlement: 29,
      //   license_exceed_allowed_entitlement: 18,
      // };
      const data: any = await sitesCounts(51, 175);

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
