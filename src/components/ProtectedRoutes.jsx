import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ redirectPath = "/" }) => {
  // Check if the user is authenticated
  if (!isAuthenticated()) {
    return <Navigate to={redirectPath} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;