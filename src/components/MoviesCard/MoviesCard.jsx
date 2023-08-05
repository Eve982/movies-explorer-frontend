import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { BEATFILM_URL } from "../../utils/constants";
import { useEffect, useState } from "react";

function MoviesCard({ movie, savedMovies, removeMovie, likeMovie }) {
  const imageUrlValue = movie.image.url;
  const imageUrl = imageUrlValue ? BEATFILM_URL + imageUrlValue : movie.image;

  function calculateHours(minutes) {
    const HH = Math.floor(minutes / 60);
    const MM = minutes % 60;
    return `${HH !== 0 ? `${HH}ч` : ""} ${MM}м`;
  }

  const [isSaved, setIsSaved] = useState(false);
  const [foundMovie, setFoundMovie] = useState(null);

  useEffect(() => {
    const found = savedMovies.find(
      (savedMovie) => savedMovie.movieId === movie.id,
    );
    setFoundMovie(found);
    setIsSaved(found);
  }, [movie.id, savedMovies]);

  function handleLike(e) {
    e.preventDefault();
    if (!isSaved) {
      console.log('like clicked');
      likeMovie(movie);
    } else {
      if (foundMovie && foundMovie._id) {
        removeMovie(foundMovie._id);
      }
    }
  }

  function handleRemove(e) {
    e.preventDefault();
    removeMovie(movie._id);
  }

  const location = useLocation();

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__name-section">
          <p className="movies-card__name">{movie.nameRU}</p>
          <span className="movies-card__duration">
            {calculateHours(movie.duration)}
          </span>
        </div>
        {location.pathname === "/saved-movies" ? (
          <button
            className="movies-card__remove"
            type="button"
            onClick={handleRemove}
          />
        ) : (
          <button
            className={`movies-card__like ${
              isSaved ? "movies-card__like_active" : ""
            }`}
            type="button"
            onClick={handleLike}
          />
        )}
      </div>
      <a
        className="movie__trailer-link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          src={imageUrl}
          alt={movie.nameRU}
        ></img>
      </a>
    </li>
  );
}

export default MoviesCard;
