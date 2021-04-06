import axios from 'axios';
import * as React from 'react';
import { useRouter } from 'next/router';

import { Activity } from '../types';
import MonthlyBreakdown from './MonthlyBreakdown';
import OverallProgress from './OverallProgress';

const currentYear = new Date().getFullYear();

const App = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  const router = useRouter();

  React.useEffect(() => {
    setLoading(true);
    
    if (!router.isReady) {
      return;
    }

    axios
      .get<Activity[]>('/api/strava', {
        params: {
          year: router.query.year ?? currentYear,
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
  }, [router]);

  if (error) {
    return <span data-testid="error">{error.message}</span>;
  }

  if (loading) {
    return <span data-testid="loading">Loading...</span>;
  }

  return (
    <>
      <MonthlyBreakdown data={data} />
      <OverallProgress data={data} />
    </>
  );
};

export default App;
