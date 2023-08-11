import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { BEATFILM_URL } from "../../utils/constants";
import calculateHours from "../../utils/handlers";

function MoviesCard({
  movie,
  savedMovies,
  saveMovie,
  deleteMovie,
}) {
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  function getClassName() {
    return location.pathname === "/saved-movies"
      ? "movies-card__remove"
      : isLiked
      ? "movies-card__like movies-card__like_active"
      : "movies-card__like";
  }

  useEffect(() => {
    if (location.pathname === "/movies") {
      const isMovieSaved = savedMovies.some((m) => m.movieId === movie.id);
      setIsLiked(isMovieSaved);
    }
  }, []);

  const handleOnClick = () => {
    if (location.pathname === "/movies") {
      if (isLiked) {
        deleteMovie(movie.id);
        setIsLiked(false);
      } else {
        saveMovie(movie);
        setIsLiked(true);
      }
    } else {
      deleteMovie(movie.movieId);
    }
  };

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__name-section">
          <p className="movies-card__name">{movie.nameRU}</p>
          <span className="movies-card__duration">
            {calculateHours(movie.duration)}
          </span>
        </div>
        <button
          className={getClassName()}
          type="button"
          onClick={handleOnClick}
        />
      </div>
      <a
        className="movie__trailer-link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          src={movie.image.url ? BEATFILM_URL + movie.image.url : movie.image}
          alt={movie.nameRU}
        ></img>
      </a>
    </li>
  );
}

export default MoviesCard;
