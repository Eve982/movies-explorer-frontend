import "./LandingNav.css";

function LandingNav() {
  return (
    <nav className="landingnav">
      <ul className="landingnav__links">
        <li href="#about-project" className="landingnav__link">
          <a className="landingnav__link" href="#about-project">
            О проекте
          </a>
        </li>
        <li className="landingnav__link">
          <a className="landingnav__link" href="#tech">
            Технология
          </a>
        </li>
        <li className="landingnav__link">
          <a className="landingnav__link" href="#student">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default LandingNav;
