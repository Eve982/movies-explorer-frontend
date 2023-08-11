import "../Movies/Movies";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  movies,
  deleteMovie,
  isCheckBoxActive,
  handleCheckBoxActive,
  onFindClick,
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
        movies={movies}
        deleteMovie={deleteMovie}
        isCheckBoxActive={isCheckBoxActive}
      />
    </main>
  );
}

export default SavedMovies;
