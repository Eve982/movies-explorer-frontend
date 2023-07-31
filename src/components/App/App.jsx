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

  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);

  const [infoToolTipText, setInfoToolTipText] = useState("");

  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedFilteredMovies, setSavedFilteredMovies] = useState([]);
  const [shortsIsChecked, setShortsIsChecked] = useState(false);
  const [shortsSavedIsChecked, setShortsSavedIsChecked] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);
  const [shortMoviesSaved, setShortMoviesSaved] = useState([]);

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

  function showErrorPopup(textError) {
    setInfoToolTipText(textError);
    setInfoToolTipOpen(true);
  }

  function handleRegister(data) {
    register(data)
      .then((res) => {
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log("smth wrong");
        showErrorPopup(err);
      })
  }

  function handleLogin(data) {
    authorize(data)
      .then((res) => {
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        showErrorPopup(err);
      });
  }

  function checkToken() {
    checkTokenApi()
      .then((data) => {
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    checkToken();
    setLoggedIn(true);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData);
          setSavedMovies(moviesData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

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
        setCurrentUser(res);
        setIsLoading(false);
        setInfoToolTipText(`Данные профиля обновлены.`);
        setInfoToolTipOpen(true);
      })
      .catch((err) => {
        showErrorPopup(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        showErrorPopup(err);
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
          setSavedMovies(res);
          setSavedFilteredMovies(res);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, currentUser]);

  function handleShortsChangeMovies() {
    localStorage.setItem("shortsIsChecked", !shortsIsChecked);
    setShortsIsChecked(!shortsIsChecked);
    const shortMovies = filters.findShorts(filteredMovies);
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
                    logout={handleLogout}
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
                  <Login handleLogin={handleLogin} isLoading={isLoading} />
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
          isOpen={isInfoToolTipOpen}
          onClose={() => setInfoToolTipOpen(false)}
          message={infoToolTipText}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
