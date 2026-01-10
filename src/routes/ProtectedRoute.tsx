import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const ProtectedRoute = () => {
  const loggedIn = isLoggedIn();
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
