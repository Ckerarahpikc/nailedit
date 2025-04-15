import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginUser } from "../../services/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading: isLoadingLogin } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),

    onSuccess: (user) => {
      toast.success("Successfully logged in.");
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isLoadingLogin };
}
