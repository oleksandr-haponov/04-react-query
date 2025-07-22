import type { Movie } from '../types/movie';

export interface TMDBResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}