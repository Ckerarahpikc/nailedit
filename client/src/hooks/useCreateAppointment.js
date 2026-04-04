import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../services/appointmentApi";
import { useNotification } from "../hooks/useNotification";

export function useCreateAppointment() {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const {
    mutate: createAppointmentMutation,
    isLoading: isCreatingAppointment,
    error: createAppointmentError,
  } = useMutation({
    mutationFn: createAppointment,
    onSuccess: (newAppointment) => {
      // Update the appointments cache
      queryClient.setQueryData(["appointments"], (oldAppointments) => {
        return oldAppointments
          ? [...oldAppointments, newAppointment]
          : [newAppointment];
      });

      // Invalidate and refetch appointments to ensure consistency
      queryClient.invalidateQueries(["appointments"]);

      showNotification("Запись успешно создана!", "success");
    },
    onError: (error) => {
      const message = error.message || "Не удалось создать запись";
      showNotification(message, "error");
    },
  });

  return {
    createAppointment: createAppointmentMutation,
    isCreatingAppointment,
    createAppointmentError,
  };
}
