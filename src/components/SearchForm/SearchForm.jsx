import { useEffect, useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  parent,
  onFindClick,
  // searchKey,
  // handleInputChange,
  isCheckBoxActive,
  handleCheckBoxActive,
}) {
  // Достает при монтировании страницы поисковый ключ из локального
  // хранилища в зависимости от родителя и устанавливает его в стейт.
  const [searchKey, setSearchKey] = useState("");
  useEffect(() => {
    const currentSearchKey = localStorage.getItem(
      parent === "movies" ? "moviesSearchKey" : "savedMoviesSearchKey",
    );
    if (currentSearchKey) {
      setSearchKey(currentSearchKey);
    }
  }, []);

  function handleInputChange(e) {
    const value = e.target.value;
    e.preventDefault();
    setSearchKey(value);
  }

  const [searchError, setSearchError] = useState(
    document.querySelector(".search-form__error"),
  );
  const [searchFormInput, setSearchFormInput] = useState(
    document.querySelector(".search-form__input"),
  );
  // console.log("searchFormInput: ", searchFormInput);

  function showError() {
    const searchFormInput = document.querySelector(".search-form__input");
    const showSearchError = document.querySelector(".search-form__error");

    if (searchFormInput.validity.valueMissing) {
      showSearchError.textContent = "Нужно ввести ключевое слово.";
    } else {
      showSearchError.textContent =
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.";
    }
    showSearchError.className = "search-form__error search-form__error_active";
  }

  function handleSubmit(e) {
    if (!searchFormInput.validity.valid) {
      // e.preventDefault();
      showError();
    }
    onFindClick(e, parent);
  }

  useEffect(() => {
    const searchFormInput = document.querySelector(".search-form__input");
    const showSearchError = document.querySelector(".search-form__error");
    setSearchFormInput(searchFormInput);
    setSearchError(searchError);
    showSearchError.className = "search-form__error";
    showSearchError.textContent = "";
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
          placeholder="Фильм"
          value={searchKey}
          onChange={handleInputChange}
          required
          name="searchFormInput"
        />
        <button className="search-form__button"></button>
      </form>
      <span className="search-form__error"></span>
      <FilterCheckbox
        isCheckBoxActive={isCheckBoxActive}
        parent={parent}
        handleCheckBoxActive={handleCheckBoxActive}
      ></FilterCheckbox>
    </div>
  );
}

export default SearchForm;
