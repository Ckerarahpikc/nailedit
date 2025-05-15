import { register as registerUser } from "../../services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

function useRegister() {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: register, isPending: isLoadingRegister } = useMutation({
    mutationFn: ({ name, email, password, confirmPassword }) =>
      registerUser({ name, email, password, confirmPassword }),

    onSuccess: (user) => {
      showNotification("Successfully registered. You're welcome.", "success");
      queryClient.setQueryData(["user"], user);
      navigate("/");
    },

    onError: (err) => {
      const errorMessage = err?.message || "An error occurred";
      showNotification(errorMessage, "error");
    },
  });

  return { register, isLoadingRegister };
}

export default useRegister;
