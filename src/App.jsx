import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";

function App() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (query = "") => {
    setLoading(true);
    setError(""); // Reset any existing errors

    try {
      // Fixed: Backticks added around the URL strings
      const url = query
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch movies. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically load popular movies on page load
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(search);
  };

  return (
    <>
      <Header />

      <main>
        <h2>Find your next favorite movie</h2>

        <SearchBar
          search={search}
          setSearch={setSearch}
          onSubmit={handleSearch}
        />

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && <MovieList movies={movies} />}
      </main>
    </>
  );
}

export default App;