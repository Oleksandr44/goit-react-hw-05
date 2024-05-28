import css from './MovieCast.module.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits, buildImageUrl } from '../../movies-api';  

export default function MovieCast() {
    const { id } = useParams();
    const [actors, setActors] = useState([]);

    useEffect(() => {
      const fetchActorCredits = async () => {
      const credits = await getMovieCredits(id);
      setActors(credits.cast);
    };

    fetchActorCredits(); 
    },[id])
    
    if (!actors.length) {
    return <div>We don’t have any actors for this movie</div>;
    }
    
    // Функція для створення повного URL зображення актора
    const getImageUrl = (profilePath) =>
      buildImageUrl("https://image.tmdb.org/t/p/","w500", profilePath);

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

