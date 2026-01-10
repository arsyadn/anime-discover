import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { removeFromWishlist } from "../api/wishlist";

export function useWishlist(userId: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    apiClient
      .get(`/users/${userId}/library-entries`, {
        params: {
          "filter[status]": "planned",
          include: "media",
        },
      })
      .then((res) => setData(res.data.included))
      .finally(() => setLoading(false));
  }, [userId]);

  const remove = async (entryId: string) => {
    setData((prev) => prev.filter((item) => item.id !== entryId));

    try {
      await removeFromWishlist(entryId);
    } catch (err) {
      console.error(err);
    }
  };

  return { data, loading, remove };
}
