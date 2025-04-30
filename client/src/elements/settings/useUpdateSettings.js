import { useMutation } from "@tanstack/react-query";
import { updateSettings } from "../../services/settingsApi";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const { mutate, isPending } = useMutation({
    mutationFn: (body) => updateSettings(body),

    onError: () => {
      toast.error("Could not update settings.");
    },
  });

  return { mutate, isPending };
}

export default useUpdateSettings;
