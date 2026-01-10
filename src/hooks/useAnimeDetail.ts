import { useEffect, useState } from "react";
import { fetchAnimeDetail } from "../api/kitsu";

export const useAnimeDetail = (id: string) => {
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchAnimeDetail(id)
      .then((res) => setAnime(res.data))
      .catch(() => setError("Failed to load anime detail"))
      .finally(() => setLoading(false));
  }, [id]);

  return { anime, loading, error };
};
