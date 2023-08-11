import { useEffect, useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  parent,
  onFindClick,
  isCheckBoxActive,
  handleCheckBoxActive,
}) {
  const [searchKey, setSearchKey] = useState("");
  const [searchError, setSearchError] = useState("");
  useEffect(() => {
    // При рефреше страницы обновляем стейты из локального хранилища.
    const currentSearchKey = localStorage.getItem(
      parent === "movies" ? "moviesSearchKey" : "savedMoviesSearchKey",
    );
    if (currentSearchKey) {
      setSearchKey(currentSearchKey);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = e.target.searchFormInput.value;
    const searchFormInput = e.target.searchFormInput;
    if (!searchFormInput.validity.valid) {
      showError(e);
    } else {
      onFindClick(inputValue, parent);
      if(parent === "movies") {
        localStorage.setItem("moviesSearchKey", searchKey);
      }
    }
  }

  function showError(e) {
    const searchFormInput = e.target.elements.searchFormInput;
    if (searchFormInput.validity.valueMissing) {
      setSearchError("Нужно ввести ключевое слово.");
    } else {
      setSearchError(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.",
      );
    }
  }

  function handleInputChange(e) {
    setSearchKey(e.target.value);
    setSearchError("");
  }

  useEffect(() => {
    setSearchError("");
  }, []);

  return (
    <div className="search-form">
      <form
        className="search-form__container"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          className="search-form__input"
          name="searchFormInput"
          placeholder="Введите название фильма..."
          value={searchKey}
          onChange={handleInputChange}
          required
        />
        <button className="search-form__button"></button>
      </form>
      <span className="search-form__error">{searchError}</span>
      <FilterCheckbox
        isCheckBoxActive={isCheckBoxActive}
        parent={parent}
        handleCheckBoxActive={handleCheckBoxActive}
      ></FilterCheckbox>
    </div>
  );
}

export default SearchForm;
