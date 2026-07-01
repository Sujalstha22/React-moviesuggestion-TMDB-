const API_KEY = "363f3d0149fbde7e7e7c7230f26b723b";
const BASE_URL = "https://api.themoviedb.org/3";

const request = async (endpoint, params = "") => {
  const separator = endpoint.includes("?") ? "&" : "?";

  const response = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}${params}`,
  );

  if (!response.ok) throw new Error("Failed to fetch.");

  return response.json();
};
export const getMoviesByGenre = (genre) =>
  request(`/discover/movie?with_genres=${genre}`);

export const getPopularMovies = async () => {
  const data = await request("/movie/popular");
  return data.results;
};
export const getTopRatedMovies = async () => {
  const data = await request("/movie/top_rated");
  return data.results;
};
export const getTrendingToday = async () => {
  const data = await request("/trending/movie/day");
  return data.results;
};
export const getPopularTV = async () => {
  const data = await request("/tv/popular");
  return data.results;
};
export const getTopRatedTV = async () => {
  const data = await request("/tv/top_rated");
  return data.results;
};

export const searchMovies = async (query) => {
  if (!query) return [];

  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
        query,
      )}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const data = await response.json();

    return (data.results || [])
      .filter((item) => item.poster_path)
      .map((item) => ({
        id: item.id,
        title: item.title || item.name,
        year: (item.release_date || item.first_air_date || "").slice(0, 4),
        type: item.media_type,
        poster: item.poster_path
          ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
          : "",
      }));
  } catch (err) {
    console.error("searchMovies error:", err);
    return [];
  }
};

export const CLASSIC_IDS = [
  238, // The Godfather
  278, // The Shawshank Redemption
  424, // Schindler's List
  240, // The Godfather Part II
  680, // Pulp Fiction
  13, // Forrest Gump
  155, // The Dark Knight
  122, // The Lord of the Rings: The Return of the King
  27205, // Inception
  497, // The Green Mile
];

export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return await response.json();
};
export const getTVDetails = async (id) => {
  return request(`/tv/${id}`);
};
export const getMovieGenres = async () => {
  return request("/genre/movie/list");
};
