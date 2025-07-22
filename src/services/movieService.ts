import axios from 'axios';
import type { Movie } from '../types/movie';
import type { TMDBResponse } from './movieService.types';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

export async function fetchMovies(
  query: string,
  page: number,
): Promise<{ movies: Movie[]; totalPages: number }> {
  const response = await axios.get<TMDBResponse>(BASE_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  return {
    movies: response.data.results,
    totalPages: response.data.total_pages,
  };
}