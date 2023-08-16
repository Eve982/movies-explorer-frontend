import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import logo from "../../images/logo.svg";
import "./Header.css";
import NavigationPopup from "../NavigationPopup/NavigationPopup";
import NavAuth from "../NavAuth/NavAuth";
import NavMain from "../NavMain/NavMain";

function Header() {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const [isBurgerOpened, setBurgerOpened] = useState(false);

  function handleBurgerClick() {
    setBurgerOpened(!isBurgerOpened);
  }

  return (
    <header
      className={location.pathname === "/" ? "header header_auth" : "header"}
    >
      <Link to="/">
        <img className="header__logo" src={logo} alt="логотип" />
      </Link>
      {currentUser.isLoggedIn ? <NavMain /> : <NavAuth />}
      {!currentUser.isLoggedIn || (
        <button
          className={
            isBurgerOpened
              ? "header__burger-menu_active"
              : "header__burger-menu"
          }
          type="button"
          aria-label="Burger-menu"
          onClick={handleBurgerClick}
        />
      )}
      {isBurgerOpened && <NavigationPopup onClose={handleBurgerClick} />}
    </header>
  );
}

export default Header;
