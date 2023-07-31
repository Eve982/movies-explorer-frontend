import { Link } from "react-router-dom";
import "./Profile.css";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onSubmit, onClickLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [editClicked, setEditClicked] = useState(false);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isNewInfo, setIsNewInfo] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

  function handleEdit() {
    setEditClicked(!editClicked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEditClicked(!editClicked);
    onSubmit(userData);
  }

  useEffect(() => {
    setUserData({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser.name, currentUser.email]);

  useEffect(() => {
    setIsNewInfo(
      currentUser.name !== userData.name ||
        currentUser.email !== userData.email,
    );
  }, [userData.name, userData.email, currentUser.name, currentUser.email]);

  return (
    <main className="profile">
      <form className="profile__form" name="profile" onSubmit={handleSubmit}>
        <div>
          <h2 className="profile__title">{`Привет, ${userData.name}!`}</h2>
          <label className="profile__form-label">
            Имя
            <input
              className="profile__input"
              type="text"
              name="name"
              id="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </label>
          <span className="profile__error">{errors.name}</span>
          <label className="profile__form-label">
            Email
            <input
              className="profile__input"
              type="email"
              name="email"
              id="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </label>
          <span className="profile__error">{errors.email}</span>
        </div>
        {editClicked ? (
          <div className="profile__submit-section">
            <button
              className={
                isValid && isNewInfo
                  ? "profile__submit-button"
                  : "profile__submit-button profile__submit-button_disabled"
              }
              type="submit"
              disabled={isValid && isNewInfo ? "" : "disabled"}
            >
              Сохранить
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
              <Link className="profile__link" onClick={onClickLogout} to="/">
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
