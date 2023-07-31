import Profile from "../Profile/Profile";
import Header from "../Header/Header";

function ProfileLayout({
  loggedIn,
  setPreloader,
  handleUpdateProfile,
  onClickLogout,
}) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <Profile
        loggedIn={loggedIn}
        setPreloader={setPreloader}
        onSubmit={handleUpdateProfile}
        onClickLogout={onClickLogout}
      />
    </>
  );
}
export default ProfileLayout;
