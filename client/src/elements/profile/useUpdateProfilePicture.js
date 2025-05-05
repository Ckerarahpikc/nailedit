import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../../services/profileApi";
import toast from "react-hot-toast";

function useUpdateProfilePicture() {
  const queryClient = useQueryClient();
  const { mutate: updatePicture, isPending: isPendingImage } = useMutation({
    mutationFn: (formData) => updateProfilePicture(formData),

    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Picture updated successfully.");
    },

    onError: (err) => {
      toast.error(err);
    },
  });

  return { updatePicture, isPendingImage };
}

export default useUpdateProfilePicture;
