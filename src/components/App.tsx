import axios from 'axios';
import React, { useEffect, useState } from 'react';

import MonthlyBreakdown from './MonthlyBreakdown';
import OverallProgress from './OverallProgress';

const targetDistance = 500;

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    setLoading(true);

    const urlParams = new URLSearchParams(window.location.search);

    axios
      .get('/api/strava', {
        params: {
          year: urlParams.get('year') || new Date().getFullYear(),
        },
      })
      .then((response) => {
        setData(response.data);
        setError(undefined);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [setData, setLoading, setError]);

  if (error) {
    return <span data-testid="error">{error.message}</span>;
  }

  if (loading) {
    return <span data-testid="loading">Loading...</span>;
  }

  const chartProps = { data, targetDistance };

  return (
    <>
      <MonthlyBreakdown {...chartProps} title="Breakdown" />
      <OverallProgress {...chartProps} title="Progress" />
    </>
  );
};

export default App;
