const BEATFILM_URL = "https://api.nomoreparties.co";
// const BASE_URL = "https://api.movies.nomoredomains.xyz";
const BASE_URL = "http://localhost:3000";
// const REGEX_PASSWORD = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,14}$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SHORT_FILM_MAX_DURATION = 40;
const WIDTH_MEDIUM = 768;
const WIDTH_BIG = 1280;
const MOVIES_ON_MEDIUM_SCREEN = 5;
const MOVIES_ON_BIG_SCREEN = 8;
const MOVIES_ON_HUGE_SCREEN = 12;
const MORE_MOVIES_ON_BIG_SCREEN = 2;
const MORE_MOVIES_ON_HUGE_SCREEN = 3;

const RENDERED_BASIC_CARDS = () => {
  const width = window.innerWidth;
  if (width < WIDTH_MEDIUM) {
    return MOVIES_ON_MEDIUM_SCREEN;
  }
  if (width < WIDTH_BIG) {
    return MOVIES_ON_BIG_SCREEN;
  }

  return MOVIES_ON_HUGE_SCREEN;
};

const RENDERED_MORE_CARD = () => {
  const width = window.innerWidth;
  if (width < WIDTH_BIG) {
    return MORE_MOVIES_ON_BIG_SCREEN;
  }

  return MORE_MOVIES_ON_HUGE_SCREEN;
};

export {
  REGEX_EMAIL,
  BEATFILM_URL,
  BASE_URL,
  SHORT_FILM_MAX_DURATION,
  RENDERED_BASIC_CARDS,
  RENDERED_MORE_CARD,
};
