import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import formLink from "../../images/formLink.svg";

function Register({ handleRegister, isLoading }) {
  const [userRegistrationData, setUserRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserRegistrationData({
      ...userRegistrationData,
      [name]: value,
    });

    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(userRegistrationData);
  }

  return (
    <main>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__info">
          <Link className="form__link" to="/">
            <img className="form__image" src={formLink} alt="логотип" />
          </Link>
          <h2 className="form__title">Добро пожаловать!</h2>
          <label className="form__input-lable">
            Имя
            <input
              className="form__input"
              type="name"
              name="name"
              id="name"
              placeholder="Имя"
              required
              value={userRegistrationData.name}
              onChange={handleChange}
            />
          </label>
          <span className="form__error">{errors.name}</span>
          <label className="form__input-lable">
            Email
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={userRegistrationData.email}
              onChange={handleChange}
              autoComplete="current-password"
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
              value={userRegistrationData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </label>
          <span className="form__error">{errors.password}</span>
        </div>
        <div className="form__buttons-section">
          <button
            className={`form__submit-button
              ${isValid ? "" : "form__submit-button_disabled"}`}
            type="submit"
            disabled={isLoading ? "disabled" : ""}
          >
            Зарегистрироваться
          </button>
          <p className="form__question">
            Уже зарегистрированы?
            <Link to="/signin" className="form__link">
              Войти
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}

export default Register;
