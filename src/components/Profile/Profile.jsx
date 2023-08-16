import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { REGEX_EMAIL } from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({ handleUpdateProfile, logout, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
    mode: "onChange",
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    setUserData({ name: currentUser.name, email: currentUser.email });
  }, [currentUser]);

  const [isClicked, setClicked] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  const handleEdit = () => {
    setClicked(!isClicked);
  }

  const handlerSubmit = (userData) => {
    console.log('userData: ', userData);
    handleUpdateProfile(userData);
    setClicked(!isClicked);
  };

  return (
    <main className="profile">
      <form className="profile__form" onSubmit={handleSubmit(handlerSubmit)}>
        <div>
          <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
          <label className="profile__form-label">
            Имя
            <input
              className="profile__input"
              type="text"
              disabled={isLoading}
              {...register("name", {
                onChange: (e) => {
                  handleChange(e);
                },
                required: "Поле обязательно к заполнению.",
                value: currentUser.name,
                minLength: {
                  value: 2,
                  message: "Имя должно содержать минимум 2 символа.",
                },
                maxLength: {
                  value: 30,
                  message: "Имя должно содержать максимум 30 символов.",
                },
              })}
            />
          </label>
          {errors?.name && (
            <span className="form__error">{errors.name.message}</span>
          )}
          <label className="profile__form-label">
            Email
            <input
              className="profile__input"
              type="email"
              {...register("email", {
                onChange: (e) => {
                  handleChange(e);
                },
                required: "Поле email обязательно к заполнению.",
                value: currentUser.email,
                pattern: {
                  value: REGEX_EMAIL,
                  message: "Email должен иметь формат xxx@xxx.xx.",
                },
              })}
            />
          </label>
          {errors?.email && (
            <span className="form__error">{errors.email.message}</span>
          )}
        </div>
        {isClicked ? (
          <div className="form__buttons-section">
            <button
              className={`form__submit-button
                ${!isValid || !isDirty ? "form__submit-button_disabled" : ""}`}
              type="submit"
              disabled={!isValid && !isDirty}
            >
              {isLoading ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        ) : (
          <ul className="profile__links-section">
            <li className="profile__links-item">
              <button className="profile__edit" onClick={handleEdit}>
                Редактировать
              </button>
            </li>
            <li>
              <Link className="profile__link" onClick={logout} to="/">
                Выйти из аккаунта
              </Link>
            </li>
          </ul>
        )}
      </form>
    </main>
  );
}

export default Profile;
