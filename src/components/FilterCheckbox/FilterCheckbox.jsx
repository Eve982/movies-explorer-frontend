import "./FilterCheckbox.css";

function FilterCheckbox({ isCheckBoxActive, parent, handleCheckBoxActive }) {
  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        id="checkbox"
        checked={isCheckBoxActive}
        onChange={() => handleCheckBoxActive(parent, isCheckBoxActive)}
      />
      <label htmlFor="checkbox" className="filter-checkbox__label">
        Короткометражки
      </label>
    </div>
  );
}
export default FilterCheckbox;
