import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import LandingNav from "../LandingNav/LandingNav";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Header from "../Header/Header";

function Main({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <Promo />
        <LandingNav></LandingNav>
        <AboutProject></AboutProject>
        <Techs></Techs>
        <AboutMe></AboutMe>
      </main>
    </>
  );
}

export default Main;
