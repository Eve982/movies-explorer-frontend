import { NavLink } from "react-router-dom";
import "./NavigationPopup.css"
import "../NavMain/NavMain.css"
import "../NavAuth/NavAuth.css"
import iconAccount from "../../images/iconAccount.svg"

function NavigationPopup({onClose}) {
  const activeStyle = {
      borderBottom: '1px solid',
      paddingBottom: '7px',
  };

  return (
  <div className="navigation-popup">
    <div className="navigation-popup__cover"/>
    <div className="navigation-popup__container">
      <button className="navigation-popup__close-button" type="button" aria-label="Close-icon" onClick={onClose}/>
      <nav className="navigation-popup__links-container">
        <div className="navigation__films navigation__films_popup">
          <NavLink to="/" className="navigation-popup__homepage" style={({isActive}) => (isActive ? activeStyle : undefined)}>Главная</NavLink>
          <NavLink to="movies" className="navigation__movies navigation__movies_popup" style={({isActive}) => (isActive ? activeStyle : undefined)}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className="navigation__movies navigation__movies_popup" style={({isActive}) => (isActive ? activeStyle : undefined)} >Сохраненные фильмы</NavLink>
        </div>
        <NavLink to="/profile" className="navigation__account navigation__account_popup" style={({isActive}) => (isActive ? activeStyle : undefined)}>
          <p to="/profile" className="navigation__account-link navigation__account-link_popup">Аккаунт</p>
          <img className="navigation__account-icon " src={iconAccount} alt="Иконка аккаунта."/>
        </NavLink>
      </nav>
    </div>
  </div>
  )
}

export default NavigationPopup;
