import './AboutProject.css';

function AboutProject() {
  return (
  <section id="about-project" className="about-project">
    <h1 className="about-project__title">О проекте</h1>
    <div className="about-project__info">
      <p className='about-project__header'>Дипломный проект включал 5 этапов </p>
      <p className='about-project__detailes'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки. </p>
      <p className='about-project__header'>На выполнение диплома ушло 5 недель </p>
      <p className='about-project__detailes'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься. </p>
    </div>
    <div className="about-project__infographics">
      <p className="about-project__timeline">1 неделя</p>
      <p className="about-project__timeline">4 недели</p>
      <p className="about-project__technology">Back-end</p>
      <p className="about-project__technology">Front-end</p>
    </div>
  </section>
  )
}

export default AboutProject;
