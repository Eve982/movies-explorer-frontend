import "./NavAuth.css";
import { Link } from "react-router-dom";

function NavAuth() {
  return (
    <nav className="nav-auth">
      <Link className="nav-auth__signup" to="/signup">
        Регистрация
      </Link>
      <Link className="nav-auth__signin" to="/signin">
        Войти
      </Link>
    </nav>
  );
}

export default NavAuth;
