import { useQuery } from "@tanstack/react-query";

import { checkSession } from "../../services/authApi";

function useSession() {
  const {
    data: user,
    isLoading: isLoadingUser,
    error,
  } = useQuery({
    queryKey: ["session"],
    queryFn: checkSession,
    staleTime: 1000 * 60 * 5, // 5min
  });
  return { user, isLoadingUser, error };
}

export default useSession;
