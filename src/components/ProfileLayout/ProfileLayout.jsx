import Header from "../Header/Header";
import Profile from "../Profile/Profile";

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
