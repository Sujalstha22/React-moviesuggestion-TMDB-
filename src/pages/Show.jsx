import React, { useEffect, useState } from "react";
import { getShows } from "../services/api";
import Moviecard from "../Components/Moviecard";
import Showcard from "../Components/Showcard";

const Show = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularShows = async () => {
      try {
        const popularShows = await getShows();
        setShows(popularShows);
      } catch (error) {
        console.log(error);
        setError("Failed to load latest shows");
      } finally {
        setLoading(false);
      }
    };

    loadPopularShows();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-yellow-400 mb-10">
        Show Collection
      </h1>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {loading ? (
        <div className="text-center">Loading..</div>
      ) : shows.length > 0 ? (
        <div className="grid gap-x-1 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {shows.map((show) => (
            <Showcard movie={show} key={show.id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No shows found.</p>
      )}
    </div>
  );
};

export default Show;
