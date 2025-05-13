import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginUser } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const { mutate: login, isPending: isLoadingLogin } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),

    onSuccess: (user) => {
      showNotification("Successfully logged in.", "success");
      queryClient.setQueryData(["user"], user);
      navigate("/");
    },

    onError: (err) => {
      const errorMessage = err?.message || "An error occurred.";
      showNotification(errorMessage, "error");
    },
  });

  return { login, isLoadingLogin };
}
