import { useState } from "react";

function useHttp() {
  const [error, setError] = useState({ isError: false, errorData: "" });

  const sendRequest = async (requestConfig) => {
    setError({ isError: false, errorData: "" });

    try {
      const res = await fetch(
        requestConfig.url + `${requestConfig.key ? requestConfig.key : ""}`,
        {
          method: requestConfig.method ? requestConfig.method : "GET",
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
          headers: requestConfig.headers ? requestConfig.headers : {},
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error.message);
      }
      return data;
    } catch (err) {
      setError({ isError: true, errorData: err.message });
    }
  };
  return {
    error: error,
    sendRequest: sendRequest,
    setError: setError,
  };
}

export default useHttp;
