import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { REGEX_EMAIL } from "../../utils/constants";
import "./Login.css";
import formLink from "../../images/formLink.svg";
// import Input from "../Input/Input";
// Не могу понять как реализовать отображение ошибок живой
// валидации react-hook-form при передаче errros в компонент <Input>.
// Также пока непонятно, нужно ли прописывать value тега input при
// использовании react-hook-form...
function Login({ handleLogin, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [userData, setUserData] = useState({
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
    handleLogin(userData);
  };

  return (
    <main>
      <form className="form" onSubmit={handleSubmit(handlerSubmit)}>
        <div className="form__info">
          <Link className="form__link" to="/">
            <img className="form__image" src={formLink} alt="логотип" />
          </Link>
          <h2 className="form__title">Рады видеть!</h2>
          {/* <Input
            label="Email"
            type="email"
            register={register}
            inputsData={userData}
            inputsDataHandler={setUserLoginData}
            errors={errors}
          ></Input>
          <Input
            label="Password"
            type="password"
            register={register}
            inputsData={userData}
            inputsDataHandler={setUserLoginData}
            errors={errors}
          ></Input> */}
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
            className={`form__submit-button form__submit-button_login
              ${
                !isValid || isLoading ? "form__submit-button_disabled" : ""
              }`}
            type="submit"
            disabled={!isValid}
          >
            {isLoading ? "Двери открываются..." : "Войти"}
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
