import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { user } = useContext(AppContext);

  // Agar already logged in hai → home pe bhej do
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;