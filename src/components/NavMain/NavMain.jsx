import { NavLink } from "react-router-dom";
import "./NavMain.css";
import iconAccount from "../../images/iconAccount.svg";

function NavMain() {
  const activeStyle = {
      fontWeight: "500"
  };

  return (
  <nav className="navigation">
    <div className="navigation__films">
      <NavLink to="/movies" className="navigation__movies" style={({isActive}) => (isActive ? activeStyle : undefined)}>Фильмы</NavLink>
      <NavLink to="/saved-movies" className="navigation__saved-movies" style={({isActive}) => (isActive ? activeStyle : undefined)}>Сохраненные фильмы</NavLink>
    </div>
    <NavLink to="/profile" className="navigation__account">
      <p className="navigation__account-link">Аккаунт</p>
      <img className="navigation__account-icon" src={iconAccount} alt="Иконка аккаунта."></img>
    </NavLink>
  </nav>
  )
}

export default NavMain;
