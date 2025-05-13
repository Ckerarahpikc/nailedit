import { useMutation } from "@tanstack/react-query";
import { updateSettings } from "../../services/settingsApi";
import { useNotification } from "../../hooks/useNotification";

export function useUpdateSettings() {
  const showNotification = useNotification();
  const { mutate, isPending } = useMutation({
    mutationFn: (body) => updateSettings(body),

    onSuccess: () => {
      showNotification("Settings updated successfully.", "success");
    },

    onError: (err) => {
      showNotification(err, "error");
    },
  });

  return { mutate, isPending };
}

export default useUpdateSettings;
