import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/settingsApi";

export function useSettings() {
  const { data: settings, isPending: isLoadingSettings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isLoadingSettings };
}
