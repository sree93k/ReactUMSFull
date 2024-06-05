import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

  function UserPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/user/signin" />;
}

  function AdminPrivateRoute() {
    const { currentAdmin } = useSelector((state) => state.admin);
    return currentAdmin ? <Outlet /> : <Navigate to="/admin/signin" />;
  }


  export default {
    UserPrivateRoute,
    AdminPrivateRoute
  }