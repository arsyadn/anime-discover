import { apiClient } from "./client";

export async function addToWishlist(userId: string, animeId: string) {
  const res = await apiClient.post("/library-entries", {
    data: {
      type: "libraryEntries",
      attributes: {
        status: "planned",
      },
      relationships: {
        user: {
          data: { type: "users", id: userId },
        },
        media: {
          data: { type: "anime", id: animeId },
        },
      },
    },
  });

  return res.data;
}

export async function getWishlist(userId: string, animeId: string) {
  const res = await apiClient.get("/library-entries", {
    params: {
      "filter[userId]": userId,
      "filter[mediaId]": animeId,
    },
  });

  return res.data.data?.[0] ?? null;
}

export async function removeFromWishlist(entryId: string) {
  await apiClient.delete(`/library-entries/${entryId}`);
}
