import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveCache } from "../redux/cacheReducer";

const useGet = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cache } = useSelector((state) => state.cache);
  const dispatch = useDispatch();

  useEffect(() => {
    let here = true;
    setLoading(true);
    if (cache[url]) {
      setLoading(false);
      return setData(cache[url]);
    }

    axios
      .get(url)
      .then((res) => {
        if (!here) return;
        setData(res.data);
        dispatch(saveCache({url, cache:res.data}));
      })
      .catch((err) => {
        if (!here) return;
        setError(true);
      })
      .finally(() => {
        if (!here) return;
        setLoading(false);
      });
    return () => {
      here = false;
    };
  }, [url]);

  return { data, error, loading };
};

export default useGet;
