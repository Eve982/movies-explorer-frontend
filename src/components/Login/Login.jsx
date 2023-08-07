import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import formLink from "../../images/formLink.svg";
// import Input from "../Input/Input";

function Login({ handleLogin, isLoading }) {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserLoginData({
      ...userLoginData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(userLoginData);
  }

  return (
    <main>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__info">
          <Link className="form__link" to="/">
            <img className="form__image" src={formLink} alt="логотип" />
          </Link>
          <h2 className="form__title">Рады видеть!</h2>
          {/* <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={userLoginData.email}
          ></Input> */}
          <label className="form__input-lable">
            Email
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              value={userLoginData.email}
              autoComplete="email"
            />
          </label>
          <span className="form__error">{errors.email}</span>
          <label className="form__input-lable">
            Пароль
            <input
              className="form__input"
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength="2"
              maxLength="30"
              onChange={handleChange}
              value={userLoginData.password}
              autoComplete="current-password"
            />
          </label>
          <span className="form__error">{errors.password}</span>
        </div>
        <div className="form__buttons-section">
          <button
            className={`form__submit-button form__submit-button_login
              ${isValid ? "" : "form__submit-button_disabled"}`}
            type="submit"
            disabled={isLoading ? "disabled" : ""}
          >
            Войти
          </button>
          <p className="form__question">
            Еще не зарегистрированы?
            <Link to="/signup" className="form__link">
              Регистрация
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}

export default Login;
