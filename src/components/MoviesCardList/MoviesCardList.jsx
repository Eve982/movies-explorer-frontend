import { useState, useEffect } from "react";
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
  const moviesToRender = isCheckBoxActive ? findShorts(movies) : movies;
  const [moviesCount, setMoviesCount] = useState(RENDERED_BASIC_CARDS);
  const [moreMovies, setMoreMovies] = useState(RENDERED_MORE_CARD);

  // const setInfo = () => {
  //   if (location.pathname === "/movies") {
  //     return isFiltered.moviesSearch ? "Ничего не найдено." : null;
  //   } else {
  //     return (!isLoading) && !isFiltered.savedMoviesSearch
  //       && "У Вас нет сохраненных фильмов."
  //       // : "Ничего не найдено.";?
  //   }
  // };

  const showMore = () => {
    if (moviesCount + moreMovies <= moviesToRender.length) {
      setMoviesCount(moviesCount + moreMovies);
    } else {
      setMoviesCount(moviesToRender.length);
    }
  };

  useEffect(() => {
    setMoviesCount(RENDERED_BASIC_CARDS);
    setMoreMovies(RENDERED_MORE_CARD());
    window.addEventListener("resize", setMoreMovies(RENDERED_MORE_CARD()));
    return () =>
      window.removeEventListener("resize", setMoreMovies(RENDERED_MORE_CARD()));
  }, [window.innerWidth]);

  return (
    <>
      {isLoading && <Preloader />}
      {!isFiltered && moviesToRender.length === 0 ? (
        <p className="movies-card-list__empty">Ничего не найдено.</p>
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
        <button className="movies-card-list__button-more" onClick={showMore}>
          Еще
        </button>
      )}
    </>
  );
}

export default MoviesCardList;
