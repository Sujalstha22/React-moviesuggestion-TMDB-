import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import { MovieProvider } from "./Contexts/MovieContext";
import Movie from "./pages/Movie";
import Show from "./pages/Show";
import Footer from "./Components/Footer";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie" element={<Movie searchQuery={searchQuery} />} />
        <Route path="/show" element={<Show />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
