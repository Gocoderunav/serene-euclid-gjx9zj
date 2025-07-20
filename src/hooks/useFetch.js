import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errFlag, setErrFlag] = useState(false);
  console.log("hey running..");
  const fetchTodos = async (url) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error is there ${res.status}`);
      const resJson = await res.json();
      setData(resJson);
    } catch (err) {
      setError(err.message);
      setErrFlag(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(url);
  }, [url]);
  return { data, loading, error, errFlag, fetchTodos };
}
