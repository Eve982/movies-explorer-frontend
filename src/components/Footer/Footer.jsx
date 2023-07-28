import './Footer.css';

function Footer() {
  return (
  <footer className="footer">
    <div className="footer__main-container">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info-container">
        <p className="footer__copyright">&copy;{` ${new Date().getFullYear()}`}</p>
        <ul className="footer__links-container">
          <li>
            <a className="footer__link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com/">Github</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
  )
}

export default Footer;
