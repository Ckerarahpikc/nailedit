import toast from "react-hot-toast";
import { register as registerUser } from "../../services/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: register, isLoading: isLoadingRegister } = useMutation({
    mutationFn: ({ name, email, password, confirmPassword }) =>
      registerUser({ name, email, password, confirmPassword }),

    onSuccess: (user) => {
      toast.success("Successfully registered. You're welcome.");
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
    },

    onError: (error) => {
      console.log("errors:", error);
      toast.error(error.message);
    },
  });

  return { register, isLoadingRegister };
}

export default useRegister;
