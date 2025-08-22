import React, { useEffect, useState } from "react";
import { getPopularMovies } from "../services/api";
import Moviecard from "../Components/Moviecard";

const Movie = ({ searchQuery }) => {
  const [movies, setmovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const PopularMovies = await getPopularMovies();
        setmovies(PopularMovies);
      } catch (error) {
        console.log(error);
        setError("Failed to load movies....");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []); // run only once

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-yellow-400 mb-10">
        Movie Collection
      </h1>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {loading ? (
        <div className="text-center">Loading..</div>
      ) : filteredMovies.length > 0 ? (
        <div className="grid gap-x-1 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredMovies.map((movie) => (
            <Moviecard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No movies found.</p>
      )}
    </div>
  );
};

export default Movie;
