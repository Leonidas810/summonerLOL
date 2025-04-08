import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import apiCatalog from './apiCatalog';

const useFetch = (method = "get", api, immediate = true, queryParams=undefined) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const controller = new AbortController();
  let baseUrl = apiCatalog[api]?.baseUrl || 'https://la1.api.riotgames.com';
  let url = apiCatalog[api]?.url || '';

  const fetchData = useCallback(async (queryParams) => {
    setLoading(true);
    try {
      queryParams && Object.keys(queryParams).forEach(key => {
        const placeholder = `:${key}`;
        console.log(placeholder)
        if (url.includes(placeholder)) {
          url = url.replace(placeholder, queryParams[key]);
        }
      });
      const fullUrl = `${baseUrl}${url}`;

      const response = await axios({
        method,
        url: fullUrl,
        signal: controller.signal,
        headers: {
          "X-Riot-Token": import.meta.env.VITE_API_RIOT_KEY,
        },
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled', err.message);
      } else {
        setError(err);
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  }, [method,queryParams]);


  useEffect(() => {
    if (immediate) {
      fetchData(queryParams);
    }

    return () => controller.abort();
  }, [fetchData, immediate, queryParams]);

  const execute = (queryParams = undefined) => {
    fetchData(queryParams);
  };

  return { data, loading, error, execute };
};

export default useFetch;
