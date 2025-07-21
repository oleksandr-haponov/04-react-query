import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
  };

  useEffect(() => {
    if (!debouncedQuery) return;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(false);
        setMovies([]);

        const results = await fetchMovies(debouncedQuery);

        if (results.length === 0) {
          toast.error('No movies found for your request.');
        }

        setMovies(results);
      } catch {
        setError(true);
        toast.error('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [debouncedQuery]);

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {error && <ErrorMessage />}

      {movies.length > 0 && !isLoading && !error && (
        <MovieGrid movies={movies} onSelect={handleMovieSelect} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      <Toaster position="top-right" />
    </div>
  );
}