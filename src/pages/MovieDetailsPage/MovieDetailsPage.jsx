import css from './MovieDetailsPage.module.css'
import { useState, useEffect, useRef } from 'react';
import { useParams, NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { getMovieDetails, getConfiguration, buildImageUrl } from '../../movies-api';
import toast from 'react-hot-toast';

const defaultImg = 'https://steamuserimages-a.akamaihd.net/ugc/1818901991519943758/83C3E979D84F09C27D8187CC1A528A35CE020AD2/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [baseImageUrl, setBaseImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
      const movieDetails = await getMovieDetails(id);
        setMovie(movieDetails);
      } catch (error) {
        toast.error('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
      };
      
    const fetchConfiguration = async () => {
        try {
      const config = await getConfiguration();
          setBaseImageUrl(config.secure_base_url);
          } catch (error) {
        toast.error('Failed to fetch configuration.');
      }
      };
                 
      fetchMovieDetails();
      fetchConfiguration();      
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Error loading movie details.</div>;
  }
    
  const posterUrl = movie.poster_path ? buildImageUrl(baseImageUrl, 'w500', movie.poster_path) : defaultImg;

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

