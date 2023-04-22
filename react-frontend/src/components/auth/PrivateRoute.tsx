import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { checkAuth } from "../../utils/helpers";

export default function PrivateRoute() {
  const isAuthenticated: boolean = checkAuth();
  return isAuthenticated
    ? <Outlet />
    : <Navigate to={ROUTES.LOGIN} replace />;

}