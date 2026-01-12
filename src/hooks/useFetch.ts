import { useEffect, useState } from "react";
import { buildQueryString } from "../utils/queryString";

export type Params = {
  [key: string]: string | number | boolean;
};

export const useFetch = <T>(url: string, params?: Params) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchUrl = url + buildQueryString(params);
        const response = await fetch(fetchUrl);

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        setData(await response.json());
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, JSON.stringify(params)]);

  return { data, loading, error };
};
