import { useEffect, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";

import {
  searchMovies,
  getPopularMovies,
} from "./api";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPopularMovies();
  }, []);

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
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Header />

      <main className="mx-auto max-w-7xl px-5 py-10">

        {/* Hero */}
        <section className="mb-12 rounded-3xl bg-gradient-to-br from-blue-900 via-slate-900 to-purple-950 px-6 py-16 text-center shadow-2xl md:px-12">

          <div className="mx-auto max-w-3xl">

            <span className="mb-4 inline-block rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
              🎬 Discover your next movie
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
              Find Your Next
              <span className="block text-blue-400">
                Favorite Movie
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300 md:text-lg">
              Search thousands of movies, discover new stories,
              and find something perfect to watch tonight.
            </p>

            <div className="mt-8">
              <SearchBar
                search={search}
                setSearch={setSearch}
                onSubmit={handleSearch}
              />
            </div>

          </div>
        </section>

        {/* Heading */}
        <div className="mb-6 flex items-end justify-between">

          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
              Explore
            </p>

            <h2 className="mt-1 text-3xl font-bold">
              {search ? `Results for "${search}"` : "Popular Movies"}
            </h2>
          </div>

          <span className="hidden text-sm text-slate-500 sm:block">
            {movies.length} movies
          </span>

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500"></div>

            <p className="mt-4 text-slate-400">
              Finding movies...
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-center text-red-300">
            {error}
          </div>
        )}

        {/* Movies */}
        {!loading && !error && (
          <MovieList movies={movies} />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-500">
        <p>
          🎬 Movie Finder
        </p>

        <p className="mt-2">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </footer>

    </div>
  );
}

export default App;