import toast from "react-hot-toast";
import { logout as logoutUser } from "../../services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading: isLoadingLogout } = useMutation({
    mutationFn: logoutUser,

    onSuccess: async () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },

    onError: (err) => {
      toast.error(err);
    },
  });

  return { logout, isLoadingLogout };
}

export default useLogout;
