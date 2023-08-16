import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { REGEX_EMAIL } from "../../utils/constants";
import Preloader from "../Preloader/Preloader";
import "./Register.css";
import formLink from "../../images/formLink.svg";

function Register({ handleRegister, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlerSubmit = () => {
    handleRegister(userData);
  };

  return (
    <main>
      {isLoading && <Preloader />}
      <form className="form" onSubmit={handleSubmit(handlerSubmit)}>
        <div className="form__info">
          <Link className="form__link" to="/">
            <img className="form__image" src={formLink} alt="логотип" />
          </Link>
          <h2 className="form__title">Добро пожаловать!</h2>
          <label className="form__input-lable">
            Имя
            <input
              className="form__input"
              type="text"
              placeholder="Имя"
              disabled={isLoading}
              {...register("name", {
                onChange: (e) => {
                  handleChange(e);
                },
                required: "Поле обязательно к заполнению.",
                minLength: {
                  value: 2,
                  message: "Имя должно содержать минимум 2 символа.",
                },
                maxLength: {
                  value: 30,
                  message: "Имя должно содержать максимум 30 символов.",
                },
              })}
              // value={userData.name}
            />
          </label>
          {errors?.name && (
            <span className="form__error">{errors.name.message}</span>
          )}
          <label className="form__input-lable">
            Email
            <input
              className="form__input"
              type="email"
              placeholder="Email"
              disabled={isLoading}
              autoComplete="email"
              {...register("email", {
                onChange: (e) => {
                  handleChange(e);
                },
                required: "Поле email обязательно к заполнению.",
                pattern: {
                  value: REGEX_EMAIL,
                  message: "Email должен иметь формат xxx@xxx.xx.",
                },
              })}
              // value={userData.email}
            />
          </label>
          {errors?.email && (
            <span className="form__error">{errors.email.message}</span>
          )}
          <label className="form__input-lable">
            Пароль
            <input
              className="form__input"
              type="password"
              placeholder="Password"
              disabled={isLoading}
              autoComplete="current-password"
              {...register("password", {
                onChange: (e) => {
                  handleChange(e);
                },
                required: "Поле обязательно к заполнению!",
                minLength: {
                  value: 3,
                  message: "Пароль должен содержать минимум 3 символа.",
                },
                maxLength: {
                  value: 8,
                  message: "Пароль должен содержать максимум 8 символов.",
                },
              })}
              // value={userData.password}
            />
          </label>
          {errors?.password && (
            <span className="form__error">{errors.password.message}</span>
          )}
        </div>
        <div className="form__buttons-section">
          <button
            className={`form__submit-button
              ${!isValid || isLoading ? "form__submit-button_disabled" : ""}`}
            type="submit"
            disabled={!isValid}
          >
            {isLoading ? "Двери открываются..." : "Зарегистрироваться"}
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
