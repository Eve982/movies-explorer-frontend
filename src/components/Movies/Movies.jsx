import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  onFindClick,
  filteredMovies,
  savedMovies,
  saveMovie,
  deleteMovie,
  shortMovies,
  isCheckBoxActive,
  handleCheckBoxActive,
}) {
  return (
    <main className="movies">
      <SearchForm
        parent="movies"
        onFindClick={onFindClick}
        isCheckBoxActive={isCheckBoxActive}
        handleCheckBoxActive={handleCheckBoxActive}
      ></SearchForm>
      <MoviesCardList
        filteredMovies={isCheckBoxActive ? shortMovies : filteredMovies}
        savedMovies={savedMovies}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
      ></MoviesCardList>
    </main>
  );
}

export default Movies;
