import "./FilterCheckbox.css";

function FilterCheckbox({ onShorts, shortsIsChecked }) {
  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        id="checkbox"
        checked={shortsIsChecked}
        onChange={onShorts}
      />
      <label htmlFor="checkbox" className="filter-checkbox__label">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
