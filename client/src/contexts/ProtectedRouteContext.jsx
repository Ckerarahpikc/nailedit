import { Navigate } from "react-router-dom";
import useSession from "../hooks/useSession";
import { ProtectedRouteContext as ProtectedContext } from "../hooks/useProtectedContext";
import Spinner from "../ui/Spinner";
import { useNotification } from "../hooks/useNotification";

// note: THIS IS FOR ALL THE PROTECTED ROUTES EXCEPT LOGIN AND REGISTER PAGES
export default function ProtectedRouteContext({ children }) {
  const { showNotification } = useNotification();
  const { isSessionPending, isSessionError, sessionData } = useSession();

  if (isSessionPending) {
    return <Spinner />;
  }

  if (!sessionData) {
    if (isSessionError) {
      showNotification(
        "Access denied. Please log in or register to continue.",
        "error"
      );
    }
    return <Navigate to="/login" replace />;
  }

  return (
    <ProtectedContext.Provider value={{ sessionData }}>
      {children}
    </ProtectedContext.Provider>
  );
}
