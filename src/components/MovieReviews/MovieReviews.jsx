import css from './MovieReviews.module.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../movies-api';

export default function MovieReviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      const fetchedReviews = await getMovieReviews(id);
      setReviews(fetchedReviews);
    };

    fetchMovieReviews();
  }, [id]);
  
  if (!reviews.length) {
    return <div>We don’t have any reviews for this movie</div>;
  }

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index} className={css.review}>
          <h3>● Author: {review.author}</h3>
          <p className={css.text}>{review.content}</p>
        </div>
      ))}
    </div>
  );
}

