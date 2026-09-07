const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Search movies
export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
}

// Get popular movies
export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }
  return response.json();
}

// Get one movie's details
export async function getMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return response.json();
}