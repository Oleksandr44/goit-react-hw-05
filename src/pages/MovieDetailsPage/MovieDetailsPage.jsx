import css from './MovieDetailsPage.module.css'
import { useState, useEffect, useRef } from 'react';
import { useParams, NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { getMovieDetails, getConfiguration, buildImageUrl } from '../../movies-api';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [baseImageUrl, setBaseImageUrl] = useState('');
  const location = useLocation();

  const backLinkRef = useRef(location.state ?? '/movies');
  console.log(location);
  // const navigate = useNavigate();
 
  
  useEffect(() => {
      const fetchMovieDetails = async () => {
      const movieDetails = await getMovieDetails(id);
      setMovie(movieDetails);
      };
      
      const fetchConfiguration = async () => {
      const config = await getConfiguration();
      setBaseImageUrl(config.secure_base_url);
      };
                 
      fetchMovieDetails();
      fetchConfiguration();      
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
    }
    
  const posterUrl = buildImageUrl(baseImageUrl, 'w500', movie.poster_path);
  
  // const handleGoBack = () => {
  //   if (location.state && location.state.from) {
  //     navigate(location.state.from);
  //   } else {
  //     navigate('/movies');
  //   }
  // };

    return (
      <div className={css.container}>
        <Link to={backLinkRef.current} className={css.linkAsButton}>← Go back</Link>
        {/* <button onClick={handleGoBack}>← Go back</button> */}
        <div className={css.card}>
          <div className={css.cardImg}><img src={posterUrl} alt={`${movie.title} poster`} className={css.img} /></div>
          <div className={css.cardInfo}>
            <h2 className={css.title}>{movie.title}</h2>
      <p className={css.text}>User Score:  {movie.popularity}</p> 
      <h3 className={css.subtitle}>Overview</h3>    
      <p className={css.text}>{movie.overview}</p>
      <h3 className={css.subtitle}>Genres</h3>
      <p className={css.text}>{movie.genres.map(({ name }) => (
          <span key={name}>{name} </span>
        ))}</p>
          </div>
      </div>
        <div className={css.addInfo}>
          <p className={css.text}>Additional information</p>
        <ul className={css.list}>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
        </ul>
        
          <Outlet />
        </div>     
        
      </div>
      
  );
}

