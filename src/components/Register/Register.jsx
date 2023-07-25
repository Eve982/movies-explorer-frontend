import React from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(data);
  }
  return (
    <div className="authorization">
      <h3 className="authorization__title">Регистрация</h3>
      <form
        action=""
        name="register"
        onSubmit={handleSubmit}
        className="authorization__form"
      >
        <input
          placeholder="Email"
          required
          type="email"
          name="email"
          minLength="2"
          maxLength="40"
          className="authorization__input"
          onChange={handleChange}
          autoComplete="on"
        />
        <input
          placeholder="Пароль"
          required
          type="password"
          name="password"
          minLength="2"
          maxLength="200"
          className="authorization__input"
          onChange={handleChange}
          autoComplete="on"
        />
        <button
          type="submit"
          className="authorization__submit-button"
          aria-label="Зарегистрироваться."
        >
          Зарегистрироваться
        </button>
        <Link to="/signin" className="authorization__signin-link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}
export default Register;
