import React from "react";

function Login({ handleLogin }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData((oldData) => ({ ...oldData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(data);
  }

  return (
    <div className="authorization">
      <h3 className="authorization__title">Вход</h3>
      <form
        action=""
        name="login"
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
          aria-label="Сохранить ссылку."
        >
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
