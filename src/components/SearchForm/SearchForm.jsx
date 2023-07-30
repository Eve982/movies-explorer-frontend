import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import find_icon from '../../images/find.svg';

function SearchForm() {
  return (
  <div className="search-form">
    <form className="search-form__container">
      <input className="search-form__input" placeholder="Фильм" required/>
      <button className="search-form__button">
        <img alt="Иконка поиска." src={find_icon}/>
      </button>
    </form>
    <FilterCheckbox></FilterCheckbox>
  </div>
  )
}

export default SearchForm;
