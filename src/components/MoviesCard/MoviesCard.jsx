import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ nameRU, image, duration,}) {
  const location = useLocation();

  return (
  <li className="movies-card">
    <img className="movies-card__image" src={image} alt="Название фильма."></img>
    <div className="movies-card__wrapper">
      <div className='movies-card__container'>
        <div className="movies-card__name-section">
          <p className="movies-card__name">{nameRU}</p>
          <span className="movies-card__duration">{duration}</span>
        </div>
      </div>
      {location.pathname === '/saved-movies'
      ?
      <button className='movies-card__remove' type="button"/>
      :
      <button className="movies-card__like movies-card__like_active" type="button"/>
      }
    </div>
  </li>
  )
}

export default MoviesCard;
