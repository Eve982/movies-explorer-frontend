import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";

function ProtectedRoute({ element: Component, ...props }) {
  const currentUser = useContext(CurrentUserContext);
  return props.isRequestInProgress ? (
    <Preloader />
  ) : currentUser.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace />
  );
}

export default ProtectedRoute;
