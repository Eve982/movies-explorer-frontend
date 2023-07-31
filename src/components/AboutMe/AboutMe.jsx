import "./AboutMe.css";
import Portfolio from "../Portfolio/Portfolio";
import me from "../../images/me.jpg";

function AboutMe() {
  return (
    <section id="student" className="about-me">
      <h2 className="about-me__heading">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__description">
          <div>
            <p className="about-me__name">Ольга</p>
            <p className="about-me__details">Веб-разработчик, 41 год</p>
            <p>
              Почти 20 лет своей жизни я была экономистом и арбитражным
              управляющим&#129488; Но однажды мне прислали ссылку на вводный
              курс Яндекс.Практикума) С этого все и началось&#129327;
            </p>
            <p>
              Я купила полный курс "Веб-разработка" на Яндекс.Практикуме и
              начала учиться в марте 2022 года!!! Все было прекрасно! Мне
              нравилась каждая функция, каждый метод и даже каждая фигурная
              скобка!
              <p>
                Затем, спустя 2 месяца, моя подруга рассказала мне о программе
                "Цифровые профессии" и о скидках для неработающих. На тот момент
                я не работала и по словам подруги могла получить курс с 75%й
                скидкой. Но я в это не верила, и решила подать заявку, чтоб
                доказать подруге, что бесплатного сыра не бывает &#128517;.
              </p>
              На выбор было не так много курсов. По моему уже изучаемому стэку
              не было никаких варинтов, кроме того курса, на котором я уже
              училась. И я выбрала курс Python-разработчик &#129302;.
              <p>
                И... мою заявку одобрили &#128569;. В итоге с июня 2022 года я
                была зачислена на второй курс и моя жизнь превратилась в гонку
                между дедлайнами и бесконечными академами &#127939;.
              </p>
              <p>
                Диплом на курсе Python-разработчик я сдала в мае 2023
                года&#127878;. К диплому по курсу Веб-разработчик я еле
                приползла &#128517;.
              </p>
              <p className="about-me__story">
                Больше я решила с подругой не спорить &#128514;
              </p>
            </p>
          </div>
          <a className="about-me__github-link" href="https://github.com/eve982">
            Github
          </a>
        </div>
        <img
          className="about-me__photo"
          src={me}
          alt="Фотография студента."
        ></img>
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
