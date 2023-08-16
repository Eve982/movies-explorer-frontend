import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Preloader from "../Preloader/Preloader";

function ProfileLayout({ handleUpdateProfile, logout, isLoading }) {
  return (
    <>
      <Header />
      {isLoading && <Preloader />}
      <Profile handleUpdateProfile={handleUpdateProfile} logout={logout} />
    </>
  );
}
export default ProfileLayout;
