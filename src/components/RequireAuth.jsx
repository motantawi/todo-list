import useUser from "@hooks/useUser";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
};

export default RequireAuth;
