import { useEffect, useState } from 'react';

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // options.fetcher(callback) ? await fetch
        const res = await fetch(url, options);
        const data = await res.json();
        // if res.staus === 401 || 403
        // Router.replace("/")
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };
    fetchData();
  }, []);

  return { data, error, isLoading };
};

export default useFetch;
