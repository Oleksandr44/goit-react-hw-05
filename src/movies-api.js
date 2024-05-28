import axios from 'axios';

//Файл конфігурації для API-запитів
const apiKey = '6198839cbe21861b5981d3604da41577';
const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTk4ODM5Y2JlMjE4NjFiNTk4MWQzNjA0ZGE0MTU3NyIsInN1YiI6IjY2NGYyYWFmODk0ZDRlMDdjNzA2NTRkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jCbrHTseQnFa6_N_dpZE_NE0IISjYuWSowVUR-TM_GQ';

const options = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

// Функція для отримання списку популярних фільмів
async function getTrendingMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
  }
}

//Функція для пошуку фільмів:
async function searchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
  }
}

// Функція для отримання деталей про фільм
async function getMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

//Базовий URL для зображень
async function getConfiguration() {
  const url = `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;

  try {
    const response = await axios.get(url, options);
    return response.data.images;
  } catch (error) {
    console.error('Error fetching configuration:', error);
  }
}

//Функція для побудови повного URL зображення:
function buildImageUrl(base_url, file_size, file_path) {
  return `${base_url}${file_size}${file_path}`;
}

// Функція для отримання інформації про акторський склад фільму
async function getMovieCredits(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
  }
}

// Функція для отримання оглядів фільму
async function getMovieReviews(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`;

  try {
    const response = await axios.get(url, options);
    const reviews = response.data.results.map(review => ({
      author: review.author,
      content: review.content,
    }));
    return reviews;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
  }
}

export {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getConfiguration,
  buildImageUrl,
  getMovieCredits,
  getMovieReviews,
};
