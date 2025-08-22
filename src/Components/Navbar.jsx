import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react"; // import search icon

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900 px-6 py-4 sticky top-0 z-50 shadow-md">
      {/* Brand */}
      <div className="flex gap-7 text-yellow-400 text-xl font-bold transition-colors duration-300">
        <Link className="hover:text-white" to="/">
          Movie App
        </Link>
        <Link className="hover:text-white" to="/movie">
          Movies
        </Link>
        <Link className="hover:text-white" to="/show">
          Shows
        </Link>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center flex-1 mx-6 max-w-md"
      >
        <input
          type="text"
          placeholder="Search movies..."
          className="flex-grow px-2 py-1 rounded-l-lg text-white bg-transparent border border-white placeholder-gray-300 focus:outline-none focus:border-yellow-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black px-4 py-2 rounded-r-lg hover:bg-yellow-500 flex items-center justify-center"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/* Links */}
      <div className="space-x-6">
        <Link
          to="/favorites"
          className="text-white hover:text-yellow-400 transition-colors duration-300"
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
