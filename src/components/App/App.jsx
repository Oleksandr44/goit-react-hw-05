import './App.css'
import { lazy, Suspense } from 'react';
import { Routes, Route, } from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));

export default function App() {

  return (
    <div className="container">
      <Toaster />
      <div className="navigation-container">
        <Navigation />
      </div>
      
      <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />}>
          <Route path="/movie/:id/cast" element={<MovieCast />} />
          <Route path="/movie/:id/reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
    </div>
  );
}



