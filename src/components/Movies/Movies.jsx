import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  savedMovies,
  movies,
  saveMovie,
  deleteMovie,
  isCheckBoxActive,
  handleCheckBoxActive,
  onFindClick,
}) {
  return (
    <main className="movies">
      <SearchForm
        onFindClick={onFindClick}
        isCheckBoxActive={isCheckBoxActive}
        handleCheckBoxActive={handleCheckBoxActive}
      ></SearchForm>
      <MoviesCardList
        savedMovies={savedMovies}
        movies={movies}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        isCheckBoxActive={isCheckBoxActive}
      ></MoviesCardList>
    </main>
  );
}

export default Movies;
