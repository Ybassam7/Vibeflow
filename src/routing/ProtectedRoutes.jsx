import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  if (!localStorage.getItem("token")) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

export default ProtectedRoutes;
