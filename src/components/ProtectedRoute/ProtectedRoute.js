import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ProtectedRoute({ element: Component, ...props }) {
  const currentUser = useContext(CurrentUserContext);
  return currentUser.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace />
  );
}

export default ProtectedRoute;
