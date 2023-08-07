// import React, { useEffect } from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ handleCheckBoxActive, isCheckBoxActive }) {

  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        id="checkbox"
        checked={isCheckBoxActive}
        onChange={handleCheckBoxActive}
      />
      <label htmlFor="checkbox" className="filter-checkbox__label">
        Короткометражки
      </label>
    </div>
  );
}
export default FilterCheckbox;
