import { useState, useEffect } from "react";

import useLoading from "./useLoading";

const useGET = (url) => {
  const [state, setState] = useState([]);

  const [callback, isLoading, error] = useLoading(async () => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const data = await response.json().then((json) =>
      Object.keys(json || {}).map((key) => ({
        id: key,
        text: json[key].text,
      }))
    );
    setState(data);
  });

  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [callback, state, setState, isLoading, error];
};

export default useGET;
