import { useState } from "react";
import {Link, useLocation} from 'react-router-dom';
import "./Header.css";
import logo from "../../images/logo.svg";
import NavAuth from "../NavAuth/NavAuth";
import NavMain from "../NavMain/NavMain";
import NavigationPopup from '../NavigationPopup/NavigationPopup';

function Header() {
  const location = useLocation();
  const [menuIsOpened, setMenuIsOpened] = useState(false);

  function handleMenuClick() {
    setMenuIsOpened(!menuIsOpened);
  }

  return (
  <header className={location.pathname === '/' ? "header header_auth" : "header" }>
    <Link to='/'><img className="header__logo" src={logo} alt="Логотип."/></Link>
    {location.pathname === '/' ? <NavAuth/> : <NavMain/>}
    { location.pathname === '/' ? "" :  <button className={
      menuIsOpened ? 'header__burger-menu_active' : "header__burger-menu" }
      type="button"
      aria-label="Burger-menu"
      onClick = {handleMenuClick}
      />}
    {menuIsOpened && <NavigationPopup onClose={handleMenuClick}/>}
  </header>
  )
}

export default Header;
