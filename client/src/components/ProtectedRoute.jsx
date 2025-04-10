import { Navigate } from "react-router-dom";

import Spinner from "../components/Spinner";
import useSession from "../elements/sign-in-out/useSession";

function ProtectedRoute({ children }) {
  const { user, isLoadingUser, error } = useSession();

  if (isLoadingUser) return <Spinner />;

  if (!user || error) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
