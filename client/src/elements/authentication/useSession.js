import { useQuery } from "@tanstack/react-query";

import { checkSession } from "../../services/authApi";

function useSession() {
  const {
    data: user,
    isPending: isLoadingUser,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: checkSession,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return { user, isLoadingUser, error: error?.message || null };
}

export default useSession;
