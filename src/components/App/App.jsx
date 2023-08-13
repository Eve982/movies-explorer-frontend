import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import "./App.css";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Layout from "../Layout/Layout";
import ProfileLayout from "../ProfileLayout/ProfileLayout";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import authApi from "../../utils/AuthApi.js";
import mainApi from "../../utils/MainApi.js";
import * as moviesApi from "../../utils/MoviesApi";
import * as filters from "../../utils/filters";
import InfoToolTip from "../InfoToolTip/InfoToolTip";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCheckingToken, checkingToken] = useState(true);

  const [isLoading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    email: "",
    isLoggedIn: false,
  });

  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [infoToolTip, setInfoToolTip] = useState({
    text: "",
    status: false,
  });

  const [isCheckBoxMoviesActive, setCheckBoxMoviesActive] = useState(false);
  const [isCheckBoxSavedMoviesActive, setCheckBoxSavedMoviesActive] =
    useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    function closeByEscape(e) {
      if (e.key === "Escape") {
        setInfoToolTipOpen(false);
      }
    }
    if (isInfoToolTipOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isInfoToolTipOpen]);

  function showErrorPopup(textError, isSuccess) {
    setInfoToolTip({ text: textError.message, status: isSuccess });
    setInfoToolTipOpen(true);
  }

  function handleRegister(data) {
    console.log('Register data: ', data);
    setLoading(true);
    authApi
    .register(data)
    .then((res) => handleLogin(data))
    .catch((err) => showErrorPopup(err, false));
  }

  function handleLogin(data) {
    console.log('Login data: ', data);
    setLoading(true);
    authApi
    .login(data)
    .then((userData) => {
      setCurrentUser({
        ...userData,
        isLoggedIn: true,
      });
      navigate("/movies");
    })
    .catch((err) => {
      showErrorPopup(err, false);
    })
    .finally(() => setLoading(false));
  }

  function handleUpdateProfile(data) {
    setLoading(true);
    mainApi
      .updateUserInfo(data)
      .then((userData) => {
        setCurrentUser({
          ...currentUser,
          ...userData,
        });
        setInfoToolTip({ text: `Данные профиля обновлены!`, status: true });
        setInfoToolTipOpen(true);
      })
      .catch((err) => showErrorPopup(err, false))
      .finally(() => setLoading(false));
  }

  function checkToken() {
    setLoading(true);
    mainApi
    .getUserInfo()
    .then((userData) => {
      setCurrentUser({
        ...userData,
        isLoggedIn: true,
      });
    })
    .catch((err) => {
      handleLogout();
      console.log(err.message);
    })
    .finally(() => {
      setLoading(false);
      checkingToken(false);
    });
  }

  function handleLogout() {
    authApi.logout();
    localStorage.clear();
    setCurrentUser({});
    setSavedMovies([]);
    setFilteredMovies([]);
    setCheckBoxMoviesActive(false);
    setCheckBoxSavedMoviesActive(false);
    navigate("/", { replace: true });
  }

  function handleFindClickMovies(searchKey, parent) {
    setLoading(true);
    const moviesArray = JSON.parse(
      localStorage.getItem(parent === "movies" ? "movies" : "savedMovies"),
    );

    if (moviesArray.length === 0) {
      showErrorPopup({ message: "У Вас нет сохраненных фильмов." }, false);
      return;
    } else {
      const filteredMovies = filters.filterByKeyWord(searchKey, moviesArray);
      if(parent === "movies") {
        localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
        setFilteredMovies(filteredMovies);
      } else setFilteredSavedMovies(filteredMovies);
    }
    setLoading(false);
  }

  function saveMovie(movie) {
    setLoading(true);
    mainApi
      .saveMovie(movie)
      .then(() => {
        mainApi.getSavedMovies().then((res) => {
          setSavedMovies(res);
          localStorage.setItem("savedMovies", JSON.stringify(res));
        });
      })
      .catch((err) => showErrorPopup(err, false))
      .finally(() => setLoading(false));
  }

  function deleteMovie(movieId) {
    setLoading(true);
    mainApi
      .deleteMovie(movieId)
      .then((res) => {
        setSavedMovies((state) => state.filter((m) => m.movieId !== movieId));
      })
      .then((res) => localStorage.setItem("savedMovies", JSON.stringify(savedMovies)))
      .catch((err) => showErrorPopup(err, false))
      .finally(() => setLoading(false));
  }

  function handleCheckBoxActive(parent, checkBox) {
    parent === "movies"
      ? setCheckBoxMoviesActive(!checkBox)
      : setCheckBoxSavedMoviesActive(!checkBox);
    localStorage.setItem(`${parent}CheckBox`, !checkBox);
  }

  useEffect(() => {
    checkToken();
    // При рефреше страницы обновляем стейты из локального хранилища.
    const moviesCheckBox = localStorage.getItem("moviesCheckBox");
    const savedMoviesCheckBox = localStorage.getItem("savedMoviesCheckBox");
    const savedMovies = localStorage.getItem("savedMovies");
    const filteredMovies = localStorage.getItem("filteredMovies");

    moviesCheckBox &&
      setCheckBoxMoviesActive(Boolean(JSON.parse(moviesCheckBox)));
    savedMoviesCheckBox &&
      setCheckBoxSavedMoviesActive(Boolean(JSON.parse(savedMoviesCheckBox)));
    savedMovies && setSavedMovies(JSON.parse(savedMovies));
    filteredMovies && setFilteredMovies(JSON.parse(filteredMovies));
  }, []);

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      setLoading(true);
      Promise.all([
        mainApi.getUserInfo(),
        moviesApi.getAllMovies(),
        mainApi.getSavedMovies(),
      ])
        .then(([userData, allMovies, savedMovies]) => {
          setCurrentUser({
            ...userData,
            isLoggedIn: true,
          });
          localStorage.setItem("movies", JSON.stringify(allMovies));
          setSavedMovies(savedMovies);
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
          setFilteredSavedMovies(savedMovies);
        })
        .catch((err) => {
          showErrorPopup(err, false);
        })
        .finally(() => setLoading(false));
    }
  }, [currentUser.isLoggedIn]);

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setFilteredSavedMovies(savedMovies);
    }
  }, [location.pathname]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {isLoading && <Preloader />}
        <Routes>
          <Route path={"/"} element={<Main />} />
          <Route element={<Layout />}>
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  isCheckingToken={isCheckingToken}
                  element={Movies}
                  savedMovies={savedMovies}
                  movies={filteredMovies}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                  isCheckBoxActive={isCheckBoxMoviesActive}
                  handleCheckBoxActive={handleCheckBoxActive}
                  onFindClick={handleFindClickMovies}
                />
              }
            />

            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  isCheckingToken={isCheckingToken}
                  element={SavedMovies}
                  movies={filteredSavedMovies}
                  deleteMovie={deleteMovie}
                  isCheckBoxActive={isCheckBoxSavedMoviesActive}
                  handleCheckBoxActive={handleCheckBoxActive}
                  onFindClick={handleFindClickMovies}
                />
              }
            />
          </Route>

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isCheckingToken={isCheckingToken}
                element={ProfileLayout}
                handleUpdateProfile={handleUpdateProfile}
                logout={handleLogout}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/signin"
            element={
              !currentUser.isLoggedIn ? (
                <Login
                  handleLogin={handleLogin}
                  isLoading={isLoading}
                 />
              ) : (
                <Navigate replace to="/movies" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !currentUser.isLoggedIn ? (
                <Register
                  handleRegister={handleRegister}
                  isLoading={isLoading}
                />
              ) : (
                <Navigate replace to="/movies" />
              )
            }
          />
          <Route
            path="/signout"
            element={() => {
              handleLogout();
              return <></>;
            }}
          />
          {<Route path="/*" element={<NotFoundPage />} />}
        </Routes>
        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={() => setInfoToolTipOpen(false)}
          infoToolTip={infoToolTip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
