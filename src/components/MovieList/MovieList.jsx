import css from './MovieList.module.css'
import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ movies }) {
  const location = useLocation();
  console.log(location);

  return (
    <div>
      <ul className={css.list}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`} state={location}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

//to={`${movie.id}`} відносний шлях
//to={`/movie/${movie.id}`} абсолютний шлях







