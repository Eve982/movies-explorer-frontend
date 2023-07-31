import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import * as moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi.js";
import * as filters from "../../utils/filters";
import { register, authorize, checkTokenApi } from "../../utils/Auth.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import InfoToolTip from "../InfoToolTip/InfoToolTip";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedFilteredMovies, setSavedFilteredMovies] = useState([]);
  const [shortsIsChecked, setShortsIsChecked] = useState(false);
  const [shortsSavedIsChecked, setShortsSavedIsChecked] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);
  const [shortMoviesSaved, setShortMoviesSaved] = useState([]);

  function handleOpeningInfoToolTip() {
    setInfoToolTipOpen(true);
  }

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

  function showErrorPopup(
//     errorMessage = `Произошла ошибка.
// Попробуйте еще раз.`,
  ) {
    // setInfoToolTipType(false);
    // setInfoToolTipText(errorMessage);
    setInfoToolTipOpen(true);
  }

  function handleRegister(data) {
    register(data)
      .then((res) => {
        setIsAuthSuccess(true);
        navigate("/signin");
      })
      .catch((err) => {
        console.log("smth wrong");
        setIsAuthSuccess(false);
      })
      .finally(() => {
        handleOpeningInfoToolTip();
      });
  }

  function handleLogin(data) {
    authorize(data)
      .then((res) => {
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        handleOpeningInfoToolTip();
        setIsAuthSuccess(false);
      });
  }

  function checkToken() {
    checkTokenApi()
      .then((data) => {
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    checkToken();
  }, []);

  function handleLogout() {
    navigate("/", { replace: true });
    localStorage.removeItem("movies");
    localStorage.removeItem("searchKey");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("token");
    localStorage.removeItem("shortMovies");
    localStorage.removeItem("shortsIsChecked");
    setLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    setFilteredMovies([]);
    setShortsSavedIsChecked(false);
    setShortMoviesSaved([]);
    setSavedFilteredMovies(false);
    setFilteredMovies([]);
    setShortMovies([]);
  }

  function handleFindClickMovies(e) {
    e.preventDefault();
    const moviesArray = JSON.parse(localStorage.getItem("movies"));
    const inputValue = e.target.searchFormInput.value;
    const filteredMovies = filters.filterByKeyWord(inputValue, moviesArray);
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    localStorage.setItem("searchKey", inputValue);
    setFilteredMovies(filteredMovies);

    if (shortsIsChecked) {
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

    if (shortsSavedIsChecked) {
      const shortMoviesSaved = filters.findShorts(filteredSavedMovies);
      setShortMoviesSaved(shortMoviesSaved);
    }
  }

  function handleUpdateProfile(userData) {
    setIsLoading(true);
    mainApi
      .updateUserInfo({ name: userData.name, email: userData.email })
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoading(false);
        // setInfoToolTipType(true);
        // setInfoToolTipText(`Данные профиля обновлены.`);
        setInfoToolTipOpen(true);
      })
      .catch((err) => {
        showErrorPopup(`При обновлении профиля произошла ошибка.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function findCurrentUserMovies(movies, currentUserId) {
    let currentUserMovies = [];

    movies.forEach((movie) => {
      if (movie.owner === currentUserId) {
        currentUserMovies.push(movie);
      }
    });
    return currentUserMovies;
  }

  function saveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then(() => {
        mainApi.getSavedMovies().then((res) => {
          const currentUserMovies = findCurrentUserMovies(
            res.data,
            currentUser._id,
          );
          setSavedMovies(currentUserMovies);
          setSavedFilteredMovies(currentUserMovies);
        });
      })
      .catch((err) => {
        showErrorPopup();
      });
  }

  function deleteMovie(movie) {
    mainApi.deleteMovie(movie._id).then(() => {
      setSavedMovies((state) => state.filter((m) => m._id !== movie._id));
    });
  }

  useEffect(() => {
    if (!loggedIn) {
      return;
    } else {
      mainApi
        .getSavedMovies()
        .then((res) => {
          const currentUserMovies = findCurrentUserMovies(
            res.data,
            currentUser._id,
          );
          setSavedMovies(currentUserMovies);
          setSavedFilteredMovies(currentUserMovies);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, currentUser]);

  useEffect(() => {
    if (!loggedIn) {
      return;
    } else {
      mainApi
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      moviesApi
        .getInitialMovies()
        .then((res) => {
          localStorage.setItem("movies", JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleShortsChangeMovies() {
    localStorage.setItem("shortsIsChecked", !shortsIsChecked);
    setShortsIsChecked(!shortsIsChecked);
    console.log(!shortsIsChecked);
    const shortMovies = filters.findShorts(filteredMovies);
    console.log(shortMovies);
    setShortMovies(shortMovies);
    localStorage.setItem("shortMovies", JSON.stringify(shortMovies));
  }

  function handleShortsChangeSaved() {
    setShortsSavedIsChecked(!shortsSavedIsChecked);
    const shortMoviesSaved = filters.findShorts(savedFilteredMovies);
    setShortMoviesSaved(shortMoviesSaved);
  }

  useEffect(() => {
    const filteredMovies = localStorage.getItem("filteredMovies");
    const shortMovies = localStorage.getItem("shortMovies");
    const shortsIsChecked = localStorage.getItem("shortsIsCheckedMovies");

    if (filteredMovies) {
      setFilteredMovies(JSON.parse(filteredMovies));
    }

    if (shortMovies) {
      setShortMovies(JSON.parse(shortMovies));
    }

    if (shortsIsChecked) {
      setShortsIsChecked(JSON.parse(shortsIsChecked));
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {isLoading && <Preloader />}
        <Routes>
          <Route path={"/"} element={<Main loggedIn={loggedIn} />} />
          {loggedIn ? (
            <>
              <Route element={<Layout loggedIn={loggedIn} />}>
                <Route
                  path="/movies"
                  element={
                    <ProtectedRoute
                      element={Movies}
                      loggedIn={loggedIn}
                      onFindClick={handleFindClickMovies}
                      filteredMovies={filteredMovies}
                      savedMovies={savedMovies}
                      deleteMovie={deleteMovie}
                      shortMovies={shortMovies}
                      onShorts={handleShortsChangeMovies}
                      shortsIsChecked={shortsIsChecked}
                      saveMovie={saveMovie}
                    />
                  }
                ></Route>

                <Route
                  path="/saved-movies"
                  element={
                    <ProtectedRoute
                      loggedIn={loggedIn}
                      element={SavedMovies}
                      onFindClick={handleFindClickSaved}
                      savedMovies={savedMovies}
                      savedFilteredMovies={savedFilteredMovies}
                      deleteMovie={deleteMovie}
                      shortMovies={shortMoviesSaved}
                      shortsIsChecked={shortsSavedIsChecked}
                      onShorts={handleShortsChangeSaved}
                    />
                  }
                />
              </Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    element={ProfileLayout}
                    onClickLogout={handleLogout}
                    handleUpdateProfile={handleUpdateProfile}
                  />
                }
              />
            </>
          ) : (
            <>
              <Route
                path="/signin"
                element={
                  <Login
                  handleLogin={handleLogin}
                    isLoading={isLoading}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <Register
                    handleRegistration={handleRegister}
                    isLoading={isLoading}
                  />
                }
              />
            </>
          )}
          {<Route path="/*" element={<NotFoundPage />} />}
        </Routes>
        <InfoToolTip
          // isOpen={isInfoToolTipOpen}
          onClose={() => (setInfoToolTipOpen(false))}
          isSucsess={isAuthSuccess}
          text={""}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
