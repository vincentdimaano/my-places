import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  //will not be reinitialized when this fx runs again thru rerenders
  //this will store data across rerender cycles
  const activeHttpRequests = useRef([]);

  //wrap with useCallback() so it never gets recreated/cause infinite loop
  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal //links this req to abort controller
        });

        const responseData = await response.json();

        //response.ok = response status 2xx only
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        return responseData;
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  //runs when a component mounts.
  //using a return fx inside the fx argument will make it a cleanup fx
  //before useEffect runs again or when the component unmounts
  //makes sure to never continue with a req that is on its way out 
  //if we switch away from the component that triggers the req
  useEffect(()=>{
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());    };
  },[]);

  return { isLoading, error, sendRequest };
};
