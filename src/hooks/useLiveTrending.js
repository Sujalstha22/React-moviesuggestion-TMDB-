import { useEffect, useState } from "react";
import { trendingToday } from "../data/media";

// Attempts to pull genuinely live "trending today" data from TMDB when an API
// key is available (import.meta.env.VITE_TMDB_API_KEY). If no key is
// configured, or the request fails for any reason, the curated editorial
// fallback list is used instead so the section always renders reliably.

export function useLiveTrending() {
  const [items, setItems] = useState(trendingToday);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const key = import.meta.env?.VITE_TMDB_API_KEY;
    if (!key) return;

    let cancelled = false;

    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (cancelled || !Array.isArray(data?.results)) return;

        const mapped = data.results
          .filter((r) => r.poster_path)
          .slice(0, 8)
          .map((r) => ({
            id: r.id,
            title: r.title ?? r.name,
            type: r.media_type === "tv" ? "tv" : "movie",
            year:
              Number(
                (r.release_date ?? r.first_air_date ?? "0000").slice(0, 4),
              ) || 0,
            rating: r.vote_average ?? 0,
            overview: r.overview ?? "",
            genres: [],
            poster: `https://image.tmdb.org/t/p/w500${r.poster_path}`,
            backdrop: r.backdrop_path
              ? `https://image.tmdb.org/t/p/original${r.backdrop_path}`
              : undefined,
          }));

        if (mapped.length) {
          setItems(mapped);
          setIsLive(true);
        }
      })
      .catch(() => {
        // Silently keep curated fallback
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { items, isLive };
}
