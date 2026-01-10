import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  onLoadMore: () => void,
  hasMore: boolean,
  loading: boolean
) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const lockRef = useRef(false);

  useEffect(() => {
    if (!hasMore || loading) return;

    lockRef.current = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !lockRef.current) {
          lockRef.current = true;
          onLoadMore();
        }
      },
      { rootMargin: "200px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  return ref;
};
