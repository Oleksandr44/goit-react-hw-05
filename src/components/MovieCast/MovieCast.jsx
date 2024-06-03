import css from './MovieCast.module.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits, buildImageUrl } from '../../movies-api';
import toast from 'react-hot-toast';  

const defaultImg = 'https://steamuserimages-a.akamaihd.net/ugc/1818901991519943758/83C3E979D84F09C27D8187CC1A528A35CE020AD2/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false';

export default function MovieCast() {
    const { id } = useParams();
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActorCredits = async () => {
          setLoading(true);
      try {
      const credits = await getMovieCredits(id);
          setActors(credits.cast);
          } catch (error) {
        toast.error('Failed to fetch actor credits.');
      } finally {
        setLoading(false);
      }
      
    };

    fetchActorCredits(); 
    },[id])
    
    if (loading) {
    return <div>Loading...</div>;
  }

    if (!actors.length) {
    return <div>We don’t have any actors for this movie</div>;
    }
    
    // Функція для створення повного URL зображення актора
    const getImageUrl = (profilePath) =>
    profilePath ? buildImageUrl("https://image.tmdb.org/t/p/","w500", profilePath) : defaultImg;


    return (
        <div>
            {actors.map((actor) => (
                <div key={actor.id} className={css.actor}>
                    <img src={getImageUrl(actor.profile_path)} alt={actor.name} className={css.img} />
                    <h3 className={css.title}>● {actor.name}</h3>
                    <p className={css.text}>Character: {actor.character}</p>
                </div>
            ))}
        </div>
    );
}

