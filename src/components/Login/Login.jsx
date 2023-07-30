import { Link } from "react-router-dom";
import { useState } from "react";
import './Login.css';
import formLink from '../../images/formLink.svg';
import Input from "../Input/Input";
import validateEmail from "../../utils/validateEmail";
import validatePassword from "../../utils/validatePassword";

function Login() {
  const [validate, setValidate] = useState({});
  const handleError = (isValidate) => {
    setValidate(prev => ({...prev, ...isValidate}));
  };
  const isFormValidated = (validate) => {
    if (Object.values.length === 0) return false;
    console.log('Object.values: ', Object.values.length);
    const res = Object.values(validate).every(item => {
      return item;
    } )
    console.log('res: ', res);
    return res;
  }

  return (
  <main>
    <form className="form">
      <div className="form__info">
        <Link className="form__link" to="/">
          <img className="form__image" src={formLink} alt="Логотип."/>
        </Link>
        <h2 className="form__title">Рады видеть!</h2>
        <Input className="form__input"
          label="Email"
          type="email"
          name="email"
          onError={handleError}
          validator={validateEmail}
          textError="Некорректный e-mail."
          placeholder="Email"
          required />
        <Input
          label="Пароль"
          type="password"
          onError={handleError}
          validator={validatePassword}
          textError="Слишком короткий пароль."
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <div className="form__buttons-section">
        <button className={`form__submit-button form__submit-button_login
          ${!isFormValidated(validate) ? "form__submit-button_disabled" : ''}`}>Войти
        </button>
        <p className="form__question">Еще не зарегистрированы?
          <Link to='/signup' className="form__link">Регистрация</Link>
        </p>
      </div>
    </form>
  </main>
  )
}

export default Login;
