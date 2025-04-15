import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import apiCatalog from './apiCatalog';

const useFetch = (method = "get", api, immediate = true, pathParams = undefined, queryParams = undefined, Auth = true) => {
  const [loading, setLoading] = useState(false);
  const responseData = useRef({
    data: null,
    error: null,
  });

  const controller = new AbortController();
  const baseUrl = apiCatalog[api]?.baseUrl || `https://:region.api.riotgames.com`;
  const url = apiCatalog[api]?.url || '';

  const fetchData = useCallback(async (pathParams,queryParams) => {
    setLoading(true)
    try {
      let tempUrl = url;
      pathParams && Object.keys(pathParams).forEach(key => {
        const placeholder = `:${key}`;
        if (tempUrl.includes(placeholder)) {
          tempUrl = tempUrl.replace(placeholder, pathParams[key]);
        }
      });
      const fullUrl = `${pathParams?.region ? baseUrl.replace(":region",pathParams.region) : baseUrl}${tempUrl}`;
      const response = await axios({
        method,
        url: fullUrl,
        signal: controller.signal,
        ...(Auth && {
          headers: {
            "X-Riot-Token": import.meta.env.VITE_API_RIOT_KEY,
          },
        }),
        ...(queryParams && { params: queryParams }),
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
  }, [method, pathParams]);


  useEffect(() => {
    if (immediate) {
      const fetch = async () => {
        await fetchData(pathParams,queryParams);
      };
      fetch();
    }

    return () => controller.abort();
  }, [immediate, pathParams,queryParams]);


  const execute = async (pathParams = undefined,queryParams=undefined) => {
    await fetchData(pathParams,queryParams);
  };

  return {
    data: responseData.current.data,
    loading,
    error: responseData.current.error,
    execute
  };
};

export default useFetch;
