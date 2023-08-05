import Header from "../Header/Header";
import Profile from "../Profile/Profile";

function ProfileLayout({
  loggedIn,
  setPreloader,
  handleUpdateProfile,
  logout,
}) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <Profile
        loggedIn={loggedIn}
        setPreloader={setPreloader}
        onSubmit={handleUpdateProfile}
        logout={logout}
      />
    </>
  );
}
export default ProfileLayout;
