import { useEffect, useState } from "react";
import { fetchAnimeList } from "../api/kitsu";
import { Anime } from "../types/anime";
import { DEFAULT_LIMIT } from "../utils/pagination";

interface UseAnimeListOptions {
  page: number;
  search?: string;
  category?: string;
  sort?: string;
}

export const useAnimeList = ({
  page,
  search,
  category,
  sort
}: UseAnimeListOptions) => {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchAnimeList({ page, search, category, sort })
      .then((res) => {
        const list = res.data ?? [];

        setAnime((prev) => (page === 1 ? list : [...prev, ...list]));

        const total = res.meta.count;
        const loaded = page * DEFAULT_LIMIT;
        setHasMore(loaded < total);
      })
      .catch(() => setError("Failed to load anime list"))
      .finally(() => setLoading(false));
  }, [page, search, category, sort]);

  return { anime, loading, error, hasMore };
};
