import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import apiCatalog from './apiCatalog';

const useFetch = (method = "get", api, immediate = true, queryParams = undefined, Auth = true) => {
  const [loading, setLoading] = useState(false);
  const responseData = useRef({
    data: null,
    error: null,
  });


  const controller = new AbortController();
  const baseUrl = apiCatalog[api]?.baseUrl || 'https://la1.api.riotgames.com';
  const url = apiCatalog[api]?.url || '';

  const fetchData = useCallback(async (queryParams) => {
    setLoading(true)
    try {
      let tempUrl = url;
      queryParams && Object.keys(queryParams).forEach(key => {
        const placeholder = `:${key}`;
        if (tempUrl.includes(placeholder)) {
          tempUrl = tempUrl.replace(placeholder, queryParams[key]);
        }
      });
      const fullUrl = `${baseUrl}${tempUrl}`;
      const response = await axios({
        method,
        url: fullUrl,
        signal: controller.signal,
        ...(Auth && {
          headers: {
            "X-Riot-Token": import.meta.env.VITE_API_RIOT_KEY,
          },
        }),
      });
      responseData.current = {
        data: response.data,
        error: null
      };
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled', err.message);
      } else {
        responseData.current = {
          data: null,
          error: err
        };
      }
    } finally {
      setLoading(false);
    }
  }, [method, queryParams]);


  useEffect(() => {
    if (immediate) {
      const fetch = async () => {
        await fetchData(queryParams);
      };
      fetch();
    }

    return () => controller.abort();
  }, [fetchData, immediate, queryParams]);


  const execute = async (queryParams = undefined) => {
    await fetchData(queryParams);
  };

  return {
    data: responseData.current.data,
    loading,
    error: responseData.current.error,
    execute
  };
};

export default useFetch;
