import { apiClient } from "./client";
import { buildQuery } from "../utils/query";
import { getOffset, DEFAULT_LIMIT } from "../utils/pagination";

interface FetchAnimeListOptions {
  page: number;
  search?: string;
  category?: string;
  sort?: string;
}

export const fetchAnimeList = async (options: FetchAnimeListOptions) => {
  const query = buildQuery({
    "page[limit]": DEFAULT_LIMIT,
    "page[offset]": getOffset(options.page),
    ...(options.search && { "filter[text]": options.search }),
    ...(options.category && { "filter[categories]": options.category }),
    ...(options.sort && { sort: options.sort }),
  });

  const res = await apiClient.get(`/anime?${query}`);
  return res.data;
};

export const fetchAnimeDetail = async (id: string) => {
  const res = await apiClient.get(`/anime/${id}`);
  return res.data;
};

export const fetchCurrentUser = async () => {
  const res = await apiClient.get("/users?filter[self]=true");
  return res.data.data[0];
};
