import { useEffect, useState } from "react";

const useAsync = (callback, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await callback();
        if (active) setData(result);
      } catch (err) {
        if (active) setError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        if (active) setLoading(false);
      }
    };

    run();

    return () => {
      active = false;
    };
  }, deps);

  return { data, loading, error, setData };
};

export default useAsync;
