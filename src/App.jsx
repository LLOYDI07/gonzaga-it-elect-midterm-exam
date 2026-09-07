import { useEffect, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";

import {
  searchMovies,
  getPopularMovies,
  getMovieDetails,
} from "./api";

function App() {
  // Movies displayed on the page
  const [movies, setMovies] = useState([]);

  // Search input
  const [search, setSearch] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Error message
  const [error, setError] = useState("");

  // Selected movie
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Load popular movies when the website starts
  useEffect(() => {
    loadPopularMovies();
  }, []);

  // Get popular movies
  async function loadPopularMovies() {
    try {
      setLoading(true);
      setError("");

      const data = await getPopularMovies();

      setMovies(data.results);
    } catch (error) {
      console.error(error);
      setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  }

  // Search for movies
  async function handleSearch(event) {
    event.preventDefault();

    if (!search.trim()) {
      loadPopularMovies();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await searchMovies(search);

      setMovies(data.results);
    } catch (error) {
      console.error(error);
      setError("Failed to search for movies.");
    } finally {
      setLoading(false);
    }
  }

  // Open movie details
  async function handleMovieClick(movie) {
    try {
      setLoading(true);
      setError("");

      const details = await getMovieDetails(movie.id);

      setSelectedMovie(details);
    } catch (error) {
      console.error(error);
      setError("Failed to load movie details.");
    } finally {
      setLoading(false);
    }
  }

  // Close movie details
  function closeMovieDetails() {
    setSelectedMovie(null);
  }

  return (
    <>
      <Header />

      <main id="home">
        <section className="hero">
          <h2>Find Your Next Favorite Movie</h2>

          <p>
            Search thousands of movies using TMDB.
          </p>

          <SearchBar
            search={search}
            setSearch={setSearch}
            onSubmit={handleSearch}
          />
        </section>

        <section id="popular">
          <h2 className="section-title">
            {search
              ? `Search Results for "${search}"`
              : "Popular Movies"}
          </h2>

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading movies...</p>
            </div>
          )}

          {error && (
            <div className="error">
              ⚠️ {error}
            </div>
          )}

          {!loading && !error && (
            <MovieList
              movies={movies}
              onMovieClick={handleMovieClick}
            />
          )}
        </section>
      </main>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div
          className="modal-overlay"
          onClick={closeMovieDetails}
        >
          <div
            className="movie-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={closeMovieDetails}
            >
              ✕
            </button>

            <img
              src={
                selectedMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Poster"
              }
              alt={selectedMovie.title}
            />

            <div className="modal-info">
              <h2>{selectedMovie.title}</h2>

              <p className="rating">
                ⭐{" "}
                {selectedMovie.vote_average?.toFixed(1) || "N/A"}
              </p>

              <p>
                <strong>Release Date:</strong>{" "}
                {selectedMovie.release_date || "Unknown"}
              </p>

              <p>
                <strong>Runtime:</strong>{" "}
                {selectedMovie.runtime
                  ? `${selectedMovie.runtime} minutes`
                  : "Unknown"}
              </p>

              <p>
                <strong>Genres:</strong>{" "}
                {selectedMovie.genres
                  ?.map((genre) => genre.name)
                  .join(", ") || "Unknown"}
              </p>

              <h3>Overview</h3>

              <p>
                {selectedMovie.overview ||
                  "No overview available."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;