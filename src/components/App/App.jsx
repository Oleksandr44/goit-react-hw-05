import './App.css'
import { Routes, Route, } from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';

export default function App() {

  return (
    <div className="container">
      <Navigation />   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />}>
          <Route path="/movie/:id/cast" element={<MovieCast />} />
          <Route path="/movie/:id/reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
    </div>
  );
}



