import { useQuery } from "@tanstack/react-query";
import { checkSession } from "../services/authApi";

function useSession() {
  const {
    isSuccess: isSessionSuccessful,
    isPending: isSessionPending,
    isError: isSessionError,
    error: sessionError,
    data: sessionData,
  } = useQuery({
    queryKey: ["user"],
    queryFn: checkSession,
  });

  return {
    isSessionSuccessful,
    isSessionPending,
    isSessionError,
    sessionError,
    sessionData,
  };
}

export default useSession;
