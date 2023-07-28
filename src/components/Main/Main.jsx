import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import LandingNav from "../LandingNav/LandingNav";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

function Main () {
  return (
  <main>
    <Promo/>
    <LandingNav></LandingNav>
    <AboutProject></AboutProject>
    <Techs></Techs>
    <AboutMe></AboutMe>
  </main>
  )
}

export default Main;
