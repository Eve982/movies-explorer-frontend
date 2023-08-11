import { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { findShorts } from "../../utils/filters";
import {
  RENDERED_BASIC_CARDS,
  RENDERED_MORE_CARD,
} from "../../utils/constants";

function MoviesCardList({
  savedMovies,
  movies,
  saveMovie,
  deleteMovie,
  isCheckBoxActive,
}) {
  const moviesToRender = isCheckBoxActive ? findShorts(movies) : movies;
  const [moviesCount, setMoviesCount] = useState(RENDERED_BASIC_CARDS);
  console.log('moviesCount: ', moviesCount);
  const [moreMovies, setMoreMovies] = useState(RENDERED_MORE_CARD);

  const showMore = () => {
    if (moviesCount + moreMovies <= moviesToRender.length) {
      setMoviesCount(moviesCount + moreMovies);
    } else {
      setMoviesCount(moviesToRender.length);
    }
  };

  const updateMoreItems = () => {
    setMoreMovies(RENDERED_MORE_CARD());
  };

  useEffect(() => {
    updateMoreItems();
    window.addEventListener("resize", updateMoreItems);
    return () => window.removeEventListener("resize", updateMoreItems);
  }, [window.innerWidth]);

  return (
    <>
      {/* isLoading && <Preloader /> */}
      {moviesToRender.length === 0 ? (
        <p className="movies-card-list__empty">
          Ничего не найдено :( <br /> не представляете как мы грустим &#x1F494;
        </p>
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
