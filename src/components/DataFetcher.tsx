import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface State {
  data: any[];
  loading: boolean;
  error: Error | null;
}

interface Props {
  children(props: State): JSX.Element;
}

const DataFetcher: React.FC<Props> = ({ children }) => {
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

  return children({ data, loading, error });
};

export default DataFetcher;
