import { useState, useCallback } from "react";
import styled from "styled-components";
import AnimeCard from "../components/AnimeCard";
import Navbar from "../components/Navbar";
import { useAnimeList } from "../hooks/useAnimeList";
import { useDebounce } from "../hooks/useDebounce";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { DEFAULT_LIMIT } from "../utils/pagination";

const Page = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 20px 80px;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 28px;
`;

export const Loading = styled.div`
  padding: 60px 0;
  text-align: center;
  opacity: 0.7;
`;

export default function AnimeList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { anime, loading, error, hasMore } = useAnimeList({
    page,
    search: debouncedSearch,
    category,
    sort
  });

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setPage((p) => p + 1);
  }, [loading, hasMore]);

  const enableInfiniteScroll = page > 1 && anime.length >= DEFAULT_LIMIT;
  const loadMoreRef = useInfiniteScroll(
    loadMore,
    hasMore,
    loading,
    enableInfiniteScroll
  );

  return (
    <>
      <Navbar
        isNoFilterIncluded={false}
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        category={category}
        onCategoryChange={(v) => {
          setCategory(v);
          setPage(1);
        }}
        sort={sort}
        onSortChange={(v) => {
          setSort(v);
          setPage(1);
        }}
      />

      <Page>
        <Grid>
          {anime.map((item) => (
            <AnimeCard key={item.id} anime={item} />
          ))}
        </Grid>

        {loading && <Loading>Loading...</Loading>}
        {error && <Loading>{error}</Loading>}

        <div ref={loadMoreRef} />
      </Page>
    </>
  );
}
