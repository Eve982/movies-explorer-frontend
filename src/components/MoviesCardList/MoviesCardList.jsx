import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
const movie = { movieId: Math.random(), nameRU: 'TestCard', duration: '1', image: 'https://pichold.ru/wp-content/uploads/2021/03/10976505-1.jpg'}
const fakeMovies = [movie, movie, movie, movie, movie, movie, movie, movie, movie, movie, movie, movie];

function MoviesCardList() {
  const [movies, setMovies] = useState(fakeMovies);
  const location = useLocation();

  return (
  <>
  <ul className="movies-card-list">
    {movies.map(movie => <MoviesCard
      key={movie.movieId}
      nameRU={movie.nameRU}
      duration={movie.duration}
      image={movie.image}
      />)}
  </ul>
  {location.pathname === "/movies" ? <button className='movies-card-list__button-more'>Еще</button> : ""}
  </>
  )
}

export default MoviesCardList;
