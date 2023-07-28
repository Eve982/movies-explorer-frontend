import './Portfolio.css'

function Portfolio() {
  return (
  <>
    <p className='portfolio'>Портфолио</p>
    <ul className='portfolio-links'>
      <li className='portfolio__link-item'>
        <a className='portfolio__link-wrapper' target="_blank" rel="noreferrer" href="https://github.com/eve982/how-to-learn">
          <p className='portfolio__link-title'>Статичный сайт</p>
          <span className="portfolio__link-arrow">↗</span>
        </a>
      </li>
      <li className='portfolio__link-item'>
        <a className='portfolio__link-wrapper' target="_blank" rel="noreferrer" href="https://github.com/eve982/RussianTravelExtended">
          <p className='portfolio__link-title'>Адаптивный сайт</p>
          <span className="portfolio__link-arrow">↗</span>
        </a>
      </li>
      <li className='portfolio__link-item'>
        <a className='portfolio__link-wrapper' target="_blank" rel="noreferrer" href="https://github.com/eve982/react-mesto-api-full">
          <p className='portfolio__link-title'>Одностраничное приложение</p>
          <span className="portfolio__link-arrow">↗</span>
        </a>
      </li>
    </ul>
  </>
  )
}

export default Portfolio;
