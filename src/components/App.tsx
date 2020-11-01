import axios from 'axios';
import { parse } from 'date-fns';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { TARGET_DISTANCE } from '../constants';
import { Activity } from '../types';
import MonthlyBreakdown from './MonthlyBreakdown';
import OverallProgress from './OverallProgress';

const YearSelect = styled.select`
  position: fixed;
  top: 0;
  right: 0;
`;

const App = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('year')) {
      setYear(Number(urlParams.get('year')));
    }
  }, [setYear]);

  useEffect(() => {
    setLoading(true);

    axios
      .get<Activity[]>('/api/strava', {
        params: {
          year,
        },
      })
      .then((response) => {
        const data = response.data.filter((activity) => {
          if (parse(activity.start_date).getFullYear() === year) {
            return true;
          }

          return false;
        });

        setData(data);
        setError(undefined);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [year, setData, setLoading, setError]);

  if (error) {
    return <span data-testid="error">{error.message}</span>;
  }

  if (loading) {
    return <span data-testid="loading">Loading...</span>;
  }

  const chartProps = { data, year, targetDistance: TARGET_DISTANCE };

  return (
    <>
      <YearSelect
        name="year"
        id="year"
        onChange={(event) => setYear(Number(event.target.value))}
        value={year}
      >
        <option>2020</option>
        <option>2019</option>
        <option>2018</option>
        <option>2017</option>
        <option>2016</option>
      </YearSelect>
      <MonthlyBreakdown {...chartProps} title="Breakdown" />
      <OverallProgress {...chartProps} title="Progress" />
    </>
  );
};

export default App;
