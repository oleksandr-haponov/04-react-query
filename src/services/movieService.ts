import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

interface TMDBResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<TMDBResponse>(BASE_URL, {
    params: { query },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  return response.data.results;
}