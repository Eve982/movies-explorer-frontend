import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import { findShorts } from "../../utils/filters";
import {
  RENDERED_BASIC_CARDS,
  RENDERED_MORE_CARD,
} from "../../utils/constants";

function MoviesCardList({
  isLoading,
  isFiltered,
  savedMovies,
  movies,
  saveMovie,
  deleteMovie,
  isCheckBoxActive,
}) {
  const location = useLocation();
  const moviesToRender = isCheckBoxActive ? findShorts(movies) : movies;
  const [moviesCount, setMoviesCount] = useState(RENDERED_BASIC_CARDS);
  const [moreMovies, setMoreMovies] = useState(RENDERED_MORE_CARD);

  const showMoreMovies = () => {
    if (moviesCount + moreMovies <= moviesToRender.length) {
      setMoviesCount(moviesCount + moreMovies);
    } else {
      setMoviesCount(moviesToRender.length);
    }
  };

  useEffect(() => {
    setMoviesCount(RENDERED_BASIC_CARDS());
    setMoreMovies(RENDERED_MORE_CARD());
  }, [movies]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setTimeout(() => {
        setMoreMovies(RENDERED_MORE_CARD());
      }, 1000);
    });
    return () =>
      window.removeEventListener("resize", setMoreMovies(RENDERED_MORE_CARD()));
  }, [window.innerWidth]);

  const setInfo = () => {
    if (moviesToRender.length === 0) {
      if (location.pathname === "/movies") {
        return isFiltered.movies ? "Ничего не найдено." : null;
      }
      if (location.pathname === "/saved-movies") {
        return isFiltered.savedMovies
          ? "Ничего не найдено."
          : "У Вас нет сохраненных фильмов.";
      }
      return null;
    }
    return null;
  };

  return (
    <>
      {isLoading && <Preloader />}
      {setInfo() !== null ? (
        <p className="movies-card-list__empty">{setInfo()}</p>
      ) : (
        <ul className="movies-card-list">
          {moviesToRender.slice(0, moviesCount).map((movie) => (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              savedMovies={savedMovies}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
            />
          ))}
        </ul>
      )}
      {moviesCount < moviesToRender.length && (
        <button
          className="movies-card-list__button-more"
          onClick={showMoreMovies}
        >
          Еще
        </button>
      )}
    </>
  );
}

export default MoviesCardList;
