const API_KEY = "363f3d0149fbde7e7e7c7230f26b723b";
const BASE_URL = "https://api.themoviedb.org/3";

const request = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);

  if (!response.ok) throw new Error("Failed to fetch.");

  return response.json();
};

export const getPopularMovies = async () => {
  const data = await request("/movie/popular");
  return data.results;
};
export const getTopRatedMovies = async () => {
  const data = await request("/movie/top_rated");
  return data.results;
};
export const getTrendingToday = async () => {
  const data = await request("/trending/all/day");
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
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );

  const data = await response.json();

  return data.results;
};
export const getMovieDetails = async (id) => {
  return request(`/movie/${id}`);
};
export const getTVDetails = async (id) => {
  return request(`/tv/${id}`);
};
export const getMovieGenres = async () => {
  return request("/genre/movie/list");
};
export const getMoviesByGenre = async (genre) => {
  return request(`/discover/movie&with_genres=${genre}`);
};
