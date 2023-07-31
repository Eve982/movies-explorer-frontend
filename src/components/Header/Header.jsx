import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import NavAuth from "../NavAuth/NavAuth";
import NavMain from "../NavMain/NavMain";
import { useState } from "react";
import NavigationPopup from "../NavigationPopup/NavigationPopup";

function Header({ loggedIn }) {
  const location = useLocation();
  const [menuIsOpened, setMenuIsOpened] = useState(false);

  function handleMenuClick() {
    setMenuIsOpened(!menuIsOpened);
  }

  return (
    <header
      className={location.pathname === "/" ? "header header_auth" : "header"}
    >
      <Link to="/">
        <img className="header__logo" src={logo} alt="логотип" />
      </Link>
      {loggedIn ? <NavMain /> : <NavAuth />}
      {!loggedIn || (
        <button
          className={
            menuIsOpened ? "header__burger-menu_active" : "header__burger-menu"
          }
          type="button"
          aria-label="Burger-menu"
          onClick={handleMenuClick}
        />
      )}
      {menuIsOpened && <NavigationPopup onClose={handleMenuClick} />}
    </header>
  );
}

export default Header;
