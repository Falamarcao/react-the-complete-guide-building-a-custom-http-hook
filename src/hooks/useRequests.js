import { useState } from "react";

import useLoading from "./useLoading";

const useRequests = ({ url, init, transform }) => {
  const [state, setState] = useState([]);

  const [callback, isLoading, error] = useLoading(async (input) => {
    if (input && !init?.body) {
      init.body = JSON.stringify(input);
    }

    const response = await fetch(url, init);

    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const data = await response.json().then((json) => transform(json, input));

    setState(data);

    return data;
  });

  return [callback, isLoading, error, state, setState];
};

export default useRequests;
