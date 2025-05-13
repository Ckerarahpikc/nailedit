import { logout as logoutUser } from "../../services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { mutate: logout, isPending: isLoadingLogout } = useMutation({
    mutationFn: logoutUser,

    onSuccess: async () => {
      showNotification("Successfully logged out.", "success");
      queryClient.removeQueries(["user"]);
      navigate("/login");
    },

    onError: (err) => {
      showNotification(err, "error");
    },
  });

  return { logout, isLoadingLogout };
}

export default useLogout;
