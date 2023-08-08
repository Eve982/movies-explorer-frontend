import "../Movies/Movies";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  onFindClick,
  savedFilteredMovies,
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
        parent="savedMovies"
        onFindClick={onFindClick}
        isCheckBoxActive={isCheckBoxActive}
        handleCheckBoxActive={handleCheckBoxActive}
      />
      <MoviesCardList
        filteredMovies={isCheckBoxActive ? shortMovies : savedFilteredMovies}
        savedMovies={savedMovies}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        isCheckBoxActive={isCheckBoxActive}
        // likedMovies={savedMovies}
      />
    </main>
  );
}

export default SavedMovies;
