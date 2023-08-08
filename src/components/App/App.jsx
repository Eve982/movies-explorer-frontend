import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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

  const [isRequestInProgress, setRequestInProgress] = useState(true);

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

  const [shortMovies, setShortMovies] = useState([]);
  const [shortMoviesSaved, setShortMoviesSaved] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedFilteredMovies, setSavedFilteredMovies] = useState([]);

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
    authApi
      .register(data)
      .then((res) => handleLogin(data.email, data.password))
      .catch((err) => {
        showErrorPopup(err, false);
      });
  }

  function handleLogin(data) {
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
      });
  }

  function handleUpdateProfile(data) {
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
      .catch((err) => {
        showErrorPopup(err);
      });
  }

  function checkToken() {
    setLoading(false);
    mainApi
      .getUserInfo()
      .then((userData) => {
        setCurrentUser({
          ...userData,
          isLoggedIn: true,
        });
        setLoading(false);
      })
      .catch((err) => {
        handleLogout();
        console.log(err);
      })
      .finally(() => {
        setRequestInProgress(false);
      });
  }

  function handleLogout() {
    localStorage.removeItem("movies");
    localStorage.removeItem("moviesSearchKey");
    localStorage.removeItem("savedMoviesSearchKey");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("shortMovies");
    localStorage.removeItem("moviesCheckBox");
    localStorage.removeItem("savedMoviesCheckBox");
    setCurrentUser({
      _id: "",
      name: "",
      email: "",
      isLoggedIn: false,
    });
    setSavedMovies([]);
    setFilteredMovies([]);
    setCheckBoxMoviesActive(false);
    setCheckBoxSavedMoviesActive(false);
    setShortMovies([]);
    setShortMoviesSaved([]);
    setSavedFilteredMovies(false);
    authApi.logout();
    navigate("/", { replace: true });
  }

  function handleFindClickMovies(e, parent) {
    e.preventDefault();
    const moviesArray = JSON.parse(localStorage.getItem("movies"));
    const inputValue = e.target.searchFormInput.value;

    const filteredMovies = filters.filterByKeyWord(inputValue, moviesArray);
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    // Записываю поисковый ключ в хранилище.
    localStorage.setItem(`${parent}SearchKey`, inputValue);
    setFilteredMovies(filteredMovies);

    if (isCheckBoxMoviesActive) {
      const shortMovies = filters.findShorts(filteredMovies);
      setShortMovies(shortMovies);
      localStorage.setItem("shortMovies", JSON.stringify(shortMovies));
    }
  }

  function handleFindClickSaved(e) {
    e.preventDefault();
    const inputValue = e.target.searchFormInput.value;
    const filteredSavedMovies = filters.filterByKeyWord(
      inputValue,
      savedMovies,
    );
    setSavedFilteredMovies(filteredSavedMovies);

    if (isCheckBoxMoviesActive) {
      const shortMoviesSaved = filters.findShorts(filteredSavedMovies);
      setShortMoviesSaved(shortMoviesSaved);
    }
  }

  function saveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then(() => {
        mainApi.getSavedMovies().then((res) => {
          setSavedMovies(res);
          setSavedFilteredMovies(res);
        });
      })
      .catch((err) => {
        showErrorPopup(err, false);
      });
  }

  function deleteMovie(movie) {
    mainApi.deleteMovie(movie.movieId).then(() => {
      setSavedMovies((state) => state.filter((m) => m._id !== movie._id));
    });
  }

  // function handleCheckBoxMoviesActive() {
  //   const shortMovies = filters.findShorts(filteredMovies);
  //   setShortMovies(shortMovies);
  //   localStorage.setItem("shortMovies", JSON.stringify(shortMovies));
  // }

  // function handleCheckBoxSavedMoviesActive() {
  //   const shortMoviesSaved = filters.findShorts(savedFilteredMovies);
  //   setShortMoviesSaved(shortMoviesSaved);
  // }

  function handleCheckBoxActive(parent, checkBox) {
    parent === "movies"
      ? setCheckBoxMoviesActive(!checkBox)
      : setCheckBoxSavedMoviesActive(!checkBox);
    localStorage.setItem(`${parent}CheckBox`, !checkBox);
  }

  useEffect(() => {
    checkToken();

    const moviesCheckBox = localStorage.getItem("moviesCheckBox");
    const savedMoviesCheckBox = localStorage.getItem("savedMoviesCheckBox");

    if (moviesCheckBox) {
      setCheckBoxMoviesActive(Boolean(JSON.parse(moviesCheckBox)));
    }
    if (savedMoviesCheckBox) {
      setCheckBoxSavedMoviesActive(Boolean(JSON.parse(savedMoviesCheckBox)));
    }

    const filteredMovies = localStorage.getItem("filteredMovies");
    const filteredSavedMovies = localStorage.getItem("filteredSavedMovies");

    if (filteredMovies) {
      setFilteredMovies(JSON.parse(filteredMovies));
    }
    if (filteredSavedMovies) {
      setShortMovies(JSON.parse(filteredSavedMovies));
    }
  }, []);

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      setLoading(true);
      Promise.all([
        mainApi.getUserInfo(),
        moviesApi.getInitialMovies(),
        mainApi.getSavedMovies(),
      ])
        .then(([userData, moviesData, savedMovies]) => {
          setCurrentUser({
            ...userData,
            isLoggedIn: true,
          });
          localStorage.setItem("movies", JSON.stringify(moviesData));
          setSavedMovies(savedMovies);
          setSavedFilteredMovies(savedMovies);
        })
        .then((res) => setLoading(false))
        .catch((err) => {
          showErrorPopup(err, false);
        });
    }
    return;
  }, [currentUser.isLoggedIn]);

  // function getUserInfo() {
  //   mainApi.getUserInfo().then((userData) => {
  //     setCurrentUser({
  //       ...userData,
  //       isLoggedIn: true,
  //     });
  //   });
  // }

  // function getSavedMovies() {
  //   mainApi
  //     .getSavedMovies()
  //     .then((res) => {
  //       setSavedMovies(res);
  //       setSavedFilteredMovies(res);
  //     })
  //     .catch((err) => console.log(err));
  // }

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
                  isRequestInProgress={isRequestInProgress}
                  element={Movies}
                  onFindClick={handleFindClickMovies}
                  filteredMovies={filteredMovies}
                  savedMovies={savedMovies}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                  shortMovies={shortMovies}
                  isCheckBoxActive={isCheckBoxMoviesActive}
                  handleCheckBoxActive={handleCheckBoxActive}
                />
              }
            />

            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  isRequestInProgress={isRequestInProgress}
                  element={SavedMovies}
                  onFindClick={handleFindClickSaved}
                  savedFilteredMovies={savedFilteredMovies}
                  savedMovies={savedMovies}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                  shortMovies={shortMoviesSaved}
                  isCheckBoxActive={isCheckBoxSavedMoviesActive}
                  handleCheckBoxActive={handleCheckBoxActive}
                />
              }
            />
          </Route>

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isRequestInProgress={isRequestInProgress}
                element={ProfileLayout}
                handleUpdateProfile={handleUpdateProfile}
                logout={handleLogout}
              />
            }
          />
          <Route
            path="/signin"
            element={
              !currentUser.isLoggedIn ? (
                <Login handleLogin={handleLogin} isLoading={isLoading} />
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
