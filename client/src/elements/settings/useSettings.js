import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/settingsApi";

function useSettings() {
  const { data: settings, isPending: isLoadingSettings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isLoadingSettings };
}

export default useSettings;
