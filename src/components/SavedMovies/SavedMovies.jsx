import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState } from "react";

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
  const [searchKeySaved, setSearchKeySaved] = useState("");
  function handleInputChange(e) {
    const value = e.target.value;
    setSearchKeySaved(value);
  }

  return (
    <main className="movies">
      <SearchForm
        onFindClick={onFindClick}
        searchKeySaved={searchKeySaved}
        onInputChange={handleInputChange}
        handleCheckBoxActive={handleCheckBoxActive}
        isCheckBoxActive={isCheckBoxActive}
      />
      <MoviesCardList
        likedMovies={savedMovies}
        filteredMovies={isCheckBoxActive ? shortMovies : savedFilteredMovies}
        deleteMovie={deleteMovie}
        isCheckBoxActive={isCheckBoxActive}
        saveMovie={saveMovie}
        savedMovies={savedMovies}
      />
    </main>
  );
}

export default SavedMovies;
