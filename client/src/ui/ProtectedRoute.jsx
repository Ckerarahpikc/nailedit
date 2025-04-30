import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

import Spinner from "./Spinner";
import useSession from "../elements/authentication/useSession";

function ProtectedRoute({ children }) {
  const { user, isLoadingUser, error } = useSession();
  if (isLoadingUser) return <Spinner />;

  if (!user) {
    if (error) toast.error(error);
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
