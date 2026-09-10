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
  
  // States for single movie details
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Fetch list of popular or searched movies
  const fetchMovies = async (query = "") => {
    setLoading(true);
    setError("");

    try {
      const url = query
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch movies. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch specific details for a single movie by ID
  const fetchMovieDetails = async (movieId) => {
    setDetailLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
      if (!response.ok) throw new Error("Failed to fetch details");

      const data = await response.json();
      setSelectedMovie(data);
    } catch (err) {
      console.error("Detail fetch error:", err);
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(search);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased pb-12">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            Find your next favorite movie
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Discover popular releases or search for any movie in TMDB.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-10">
          <SearchBar
            search={search}
            setSearch={setSearch}
            onSubmit={handleSearch}
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center my-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto my-6 p-4 bg-red-900/40 border border-red-500/50 rounded-xl text-center text-red-200">
            {error}
          </div>
        )}

        {!loading && !error && (
          <MovieList movies={movies} onSelectMovie={fetchMovieDetails} />
        )}

        {/* Selected Movie Details Modal */}
        {selectedMovie && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-800 rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl border border-slate-700 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedMovie(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-full w-8 h-8 flex items-center justify-center transition"
              >
                ✕
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                {selectedMovie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                    alt={selectedMovie.title}
                    className="w-full md:w-48 rounded-xl object-cover shadow-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {selectedMovie.title}
                  </h3>
                  {selectedMovie.tagline && (
                    <p className="text-indigo-400 italic text-sm mb-3">
                      "{selectedMovie.tagline}"
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-indigo-600/30 text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-500/30">
                      ⭐ {selectedMovie.vote_average?.toFixed(1)} / 10
                    </span>
                    <span className="bg-slate-700 text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">
                      ⏱ {selectedMovie.runtime} min
                    </span>
                    <span className="bg-slate-700 text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">
                      📅 {selectedMovie.release_date?.split("-")[0]}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {selectedMovie.overview}
                  </p>
                  {selectedMovie.genres && (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMovie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="text-xs bg-slate-700/60 text-slate-300 px-2.5 py-1 rounded-md"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;