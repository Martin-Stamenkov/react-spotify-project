import { useState, useEffect } from "react";

export const useInfiniteScroll = (callback: () => void) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, [callback]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  function isScrolling() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
      return setIsFetching(true);
  }
  return [isFetching, setIsFetching] as const;
};
