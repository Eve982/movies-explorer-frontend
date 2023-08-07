import Header from "../Header/Header";
import Profile from "../Profile/Profile";

function ProfileLayout({ handleUpdateProfile, logout }) {
  return (
    <>
      <Header />
      <Profile onSubmit={handleUpdateProfile} logout={logout} />
    </>
  );
}
export default ProfileLayout;
