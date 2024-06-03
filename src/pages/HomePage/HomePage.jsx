import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      try {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        toast.error('Failed to fetch trending movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {loading ? <div>Loading...</div> : <MovieList movies={movies} />}
    </div>
  );
}






