import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequests = useRef([]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach(abortController =>
        abortController.abort()
      );
    };
  }, []);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoadingVisibility(true);

      const abortController = new AbortController();
      activeHttpRequests.current.push(abortController);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: abortController.signal
        });

        const responseData = await response.json();
        activeHttpRequests.current = activeHttpRequests.current.filter(
          controller => controller !== abortController
        );
        if (!response.ok) throw new Error(responseData.message);

        setLoadingVisibility(false);
        return responseData;
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoadingVisibility(false);

        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { loadingVisibility, error, sendRequest, clearError };
};
