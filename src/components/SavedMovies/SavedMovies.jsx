import "../Movies/Movies";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  isLoading,
  isFiltered,
  movies,
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
      />
      <MoviesCardList
        isLoading={isLoading}
        isFiltered={isFiltered}
        movies={movies}
        deleteMovie={deleteMovie}
        isCheckBoxActive={isCheckBoxActive}
      />
    </main>
  );
}

export default SavedMovies;
