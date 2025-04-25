import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import apiCatalog from './apiCatalog';

const useFetch = (
  endPoint,
  immediate = true, 
  params={
    method:'get',
    pathParams:{},
    queryParams:{},
  },
  Auth = true
) => {
  const [customParams,setCustomParams] = useState(params);
  const [loading, setLoading] = useState(false);
  const responseData = useRef({
    data: null,
    error: null,
  });

  const controller = new AbortController();
  const baseUrl = apiCatalog[endPoint]?.baseUrl || `https://:region.api.riotgames.com`;
  const url = apiCatalog[endPoint]?.url || '';

  const fetchData = useCallback(async (customParams) => {
    setLoading(true)
    try {
      const pathParams = customParams?.pathParams || null;
      const queryParams = customParams?.queryParams || null;
      const method = customParams?.method || 'get'
      
      let tempUrl = url;
      pathParams && Object.keys(pathParams).forEach(key => {
        const placeholder = `:${key}`;
        if (tempUrl.includes(placeholder)) {
          tempUrl = tempUrl.replace(placeholder, pathParams[key]);
        }
      });
      const fullUrl = `${pathParams?.region ? baseUrl.replace(":region",pathParams.region) : baseUrl}${tempUrl}`;
      const response = await axios({
        method : method,
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
      console.log(responseData.current)
      setLoading(false);
    }
  }, [customParams]);


  useEffect(() => {
    if (immediate) {
      const fetch = () => {
        fetchData(customParams);
      };
      fetch();
    }
    return () => controller.abort();
  }, []);


  const execute = async (
    params=undefined
  ) => {
    setCustomParams((prevState)=>{
        const newState = {
          ...prevState,
          ...(params?.method ? {method:params.method} : {}),
          ...(params?.pathParams ? {pathParams:params.pathParams} : {}),
          ...(params?.queryParams ? {queryParams:params.queryParams} : {})
      }
      return (newState);
    });
    const merged = {
      ...customParams,
      ...params,
      pathParams: {
        ...customParams.pathParams,
        ...params.pathParams
      },
      queryParams: {
        ...customParams.queryParams,
        ...params.queryParams
      }
    };

    await fetchData(merged);
  };

  return {
    data: responseData.current.data,
    loading,
    error: responseData.current.error,
    execute
  };
};

export default useFetch;
