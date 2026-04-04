import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../services/appointmentApi";

export function useAppointments() {
  const {
    data: appointments,
    isLoading: isAppointmentsLoading,
    error: appointmentsError,
    refetch: refetchAppointments,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    appointments: appointments || [],
    isAppointmentsLoading,
    appointmentsError,
    refetchAppointments,
  };
}