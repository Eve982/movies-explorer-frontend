import {Link} from "react-router-dom";
import "./Register.css";
import formLink from '../../images/formLink.svg';

function Register() {
  return (
  <main>
    <form className="form">
    <div className="form__info">
      <Link className="form__link" to="/">
        <img className="form__image" src={formLink} alt="Логотип."/>
      </Link>
      <h2 className="form__title">Добро пожаловать!</h2>
      <label className="form__input-lable">
        Имя
        <input className="form__input"
        type="email"
        name="email"
        placeholder="Имя"
        required />
      </label>
      <span className="form__error">Что-то пошло не так</span>
      <label className="form__input-lable">
        Email
        <input className="form__input"
        type="email"
        name="email"
        placeholder="Email"
        required />
      </label>
      <span className="form__error">Ошибка ввода email</span>
      <label className="form__input-lable">
        Пароль
        <input className="form__input"
        type="password"
        name="password"
        placeholder="Password"
        required
        minLength="2"
        maxLength="30"
        />
      </label>
      <span className="form__error">Ошибка ввода password</span>
    </div>
    <div className="form__buttons-section">
      <button className="form__submit-button form__submit-button_disabled">Зарегистрироваться</button>
      <p className="form__question">
        Уже зарегистрированы?
        <Link to='/signin' className="form__link">Войти</Link>
      </p>
    </div>
    </form>
  </main>
  )
}

export default Register;
