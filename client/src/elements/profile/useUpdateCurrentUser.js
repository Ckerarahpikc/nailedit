import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserData } from "../../services/profileApi";
import { useNotification } from "../../hooks/useNotification";

function useUpdateCurrentUser() {
  const showNotification = useNotification();
  const queryClient = useQueryClient();
  const { mutate: updateCurrentUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: ({ newName: name, newEmail: email, imageFile: photo }) =>
      updateCurrentUserData({ name, email, photo }),

    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      showNotification("Profile updated successfully.", "success");
    },

    onError: (err) => {
      showNotification(err, "error");
    },
  });

  return { updateCurrentUser, isUpdatingUser };
}

export default useUpdateCurrentUser;
