import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { BEATFILM_URL } from "../../utils/constants";
import calculateHours from "../../utils/handlers";

function MoviesCard({ movie, savedMovies, deleteMovie, saveMovie }) {
  const location = useLocation();
  const imageUrlValue = movie.image.url;
  const imageUrl = imageUrlValue ? BEATFILM_URL + imageUrlValue : movie.image;
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
      saveMovie(movie);
    } else {
      if (foundMovie && foundMovie._id) {
        deleteMovie(foundMovie);
      }
    }
  }

  function handleRemove(e) {
    e.preventDefault();
    deleteMovie(movie);
  }

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
            onClick={isSaved ? handleRemove : handleLike}
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
