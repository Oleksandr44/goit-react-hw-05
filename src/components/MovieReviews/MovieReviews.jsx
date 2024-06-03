import css from './MovieReviews.module.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../movies-api';
import toast from 'react-hot-toast';

export default function MovieReviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      setLoading(true);
      try {
      const fetchedReviews = await getMovieReviews(id);
        setReviews(fetchedReviews);
        } catch (error) {
        toast.error('Failed to fetch movie reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieReviews();
  }, [id]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

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

