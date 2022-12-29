import { useCallback, useState } from "react";

import useLoading from "./useLoading";

const useRequests = () => {
  const [state, setState] = useState([]);

  const [callback, isLoading, error] = useLoading(
    useCallback(async ({ url, init, transform }) => {
      let body = init?.body;
      if (init?.body instanceof Object) {
        init.body = JSON.stringify(init.body);
      }

      const response = await fetch(url, init);

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json().then((json) => transform(json, body));

      setState(data);

      return data;
    }, [])
  );

  return [callback, isLoading, error, state, setState];
};

export default useRequests;
