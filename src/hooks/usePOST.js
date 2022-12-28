import useLoading from "./useLoading";

const usePOST = (url) => {
  const [callback, isLoading, error] = useLoading(async (input) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ text: input }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const data = await response.json();
    return { id: data.name, text: input }; // firebase-specific => "name" contains generated id
  });

  return [callback, isLoading, error];
};

export default usePOST;
