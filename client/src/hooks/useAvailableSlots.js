import { useQuery } from "@tanstack/react-query";
import { getAvailableSlots } from "../services/appointmentApi";

export function useAvailableSlots({ masterId, date, procedureName, enabled = true }) {
  const {
    data: availableSlots,
    isLoading: isSlotsLoading,
    error: slotsError,
    refetch: refetchSlots,
  } = useQuery({
    queryKey: ["availableSlots", masterId, date?.toISOString(), procedureName],
    queryFn: () => getAvailableSlots({ masterId, date, procedureName }),
    enabled: enabled && !!masterId && !!date && !!procedureName,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    availableSlots: availableSlots || [],
    isSlotsLoading,
    slotsError,
    refetchSlots,
  };
}