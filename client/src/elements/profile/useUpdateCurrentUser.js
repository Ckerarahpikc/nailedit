import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePersonalInformation } from "../../services/profileApi";
import toast from "react-hot-toast";

function useUpdateCurrentUser() {
  const queryClient = useQueryClient();
  const { mutate: updateCurrentUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: ({ newName: name, newEmail: email, imageFile: photo }) =>
      updatePersonalInformation({ name, email, photo }),

    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Profile updated successfully.");
    },

    onError: (err) => {
      toast.error(err);
    },
  });

  return { updateCurrentUser, isUpdatingUser };
}

export default useUpdateCurrentUser;
