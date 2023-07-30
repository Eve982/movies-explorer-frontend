import './Techs.css';

function Techs() {
  return (
  <section id="tech" className='techs'>
    <div className='techs__container-main'>
      <h2 className='techs__header'>Технологии</h2>
      <div className='techs__container-content'>
        <div className='techs__description'>
        <p className='techs__title'>7 технологий</p>
        <p className='techs__detailes'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
        <ul className='techs__stacks'>
          <li className='techs__stack'>HTML</li>
          <li className='techs__stack'>CSS</li>
          <li className='techs__stack'>JS</li>
          <li className='techs__stack'>React</li>
          <li className='techs__stack'>Git</li>
          <li className='techs__stack'>Express.js</li>
          <li className='techs__stack'>mongoDB</li>
        </ul>
      </div>
    </div>
  </section>
  )
}

export default Techs;
