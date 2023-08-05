import "./Movies.css";
import { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies({
  filteredMovies,
  onFindClick,
  savedMovies,
  likeMovie,
  removeMovie,
  onShorts,
  shortsIsChecked,
  shortMovies,
  loggedIn,
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
        onShorts={onShorts}
        shortsIsChecked={shortsIsChecked}
      ></SearchForm>
      <MoviesCardList
        filteredMovies={shortsIsChecked ? shortMovies : filteredMovies}
        savedMovies={savedMovies}
        removeMovie={removeMovie}
        likeMovie={likeMovie}
      ></MoviesCardList>
    </main>
  );
}

export default Movies;
