import { useState } from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

export interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleFormAction = async (formData: FormData) => {
    const trimmedQuery = formData.get('query')?.toString().trim();

    if (!trimmedQuery) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(trimmedQuery);
    setQuery('');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={styles.form} action={handleFormAction} method="post">
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}