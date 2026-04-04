import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointment } from "../services/appointmentApi";
import { useNotification } from "./useNotification";

export function useUpdateAppointment() {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const {
    mutate: updateAppointmentMutation,
    isLoading: isUpdatingAppointment,
    error: updateAppointmentError,
  } = useMutation({
    mutationFn: updateAppointment,
    onSuccess: (updatedAppointment) => {
      // Update the appointments cache
      queryClient.setQueryData(["appointments"], (oldAppointments) => {
        if (!oldAppointments) return [updatedAppointment];

        return oldAppointments.map((appointment) =>
          appointment._id === updatedAppointment._id
            ? updatedAppointment
            : appointment
        );
      });

      // Update individual appointment cache if it exists
      queryClient.setQueryData(
        ["appointment", updatedAppointment._id],
        updatedAppointment
      );

      showNotification("Запись успешно обновлена!", "success");
    },
    onError: (error) => {
      const message = error.message || "Не удалось обновить запись";
      showNotification(message, "error");
    },
  });

  return {
    updateAppointment: updateAppointmentMutation,
    isUpdatingAppointment,
    updateAppointmentError,
  };
}
