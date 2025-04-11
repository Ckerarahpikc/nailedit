import { Navigate } from "react-router-dom";

import Spinner from "../components/Spinner";
import useSession from "../elements/sign-in-out/useSession";
import toast from "react-hot-toast";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { user, isLoadingUser, error } = useSession();

  // this will trigger toast error by default without render itself while react is trying to render Navigate
  useEffect(
    function () {
      if (error) toast.error(error);
    },
    [error]
  );

  if (isLoadingUser) return <Spinner />;

  if (!user || error) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
