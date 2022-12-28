import { useCallback, useState } from "react";

const useLoading = (fnc) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callback = useCallback(
    (...args) => {
      setIsLoading(true);
      setError(null);
      let output;

      try {
        output = fnc(...args);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
      return output;
    },
    [fnc]
  );

  return [callback, isLoading, error];
};

export default useLoading;
