import "./Movies.css";
import { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies({
  onFindClick,
  filteredMovies,
  savedMovies,
  saveMovie,
  deleteMovie,
  handleCheckBoxActive,
  isCheckBoxMoviesActive,
  shortMovies,
}) {
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const searchKey = localStorage.getItem("searchKey");
    if (searchKey) {
      setSearchKey(searchKey);
    }
  }, []);

  function handleInputChange(e) {
    const value = e.target.value;
    e.preventDefault();
    setSearchKey(value);
  }

  return (
    <main className="movies">
      <SearchForm
        onFindClick={onFindClick}
        searchKey={searchKey}
        handleInputChange={handleInputChange}
        handleCheckBoxActive={handleCheckBoxActive}
        isCheckBoxMoviesActive={isCheckBoxMoviesActive}
      ></SearchForm>
      <MoviesCardList
        filteredMovies={isCheckBoxMoviesActive ? shortMovies : filteredMovies}
        savedMovies={savedMovies}
        deleteMovie={deleteMovie}
        saveMovie={saveMovie}
      ></MoviesCardList>
    </main>
  );
}

export default Movies;
