import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useCreateAppointment } from "../../hooks/useCreateAppointment";
import { useAvailableSlots } from "../../hooks/useAvailableSlots";
import { useSettings } from "../../features/settings/useSettings";

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  font-size: 1.4rem;
  width: 100%;

  &:focus {
    outline: none;
    border: 2px solid var(--color-brand-600);
  }

  &:disabled {
    background-color: var(--color-grey-200);
    cursor: not-allowed;
  }
`;

const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const SlotButton = styled.button`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  background-color: ${(props) =>
    props.selected ? "var(--color-brand-600)" : "var(--color-grey-0)"};
  color: ${(props) =>
    props.selected ? "var(--color-grey-0)" : "var(--color-grey-700)"};
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.selected ? "var(--color-brand-700)" : "var(--color-grey-100)"};
  }

  &:disabled {
    background-color: var(--color-grey-200);
    cursor: not-allowed;
  }
`;

function AppointmentForm({ masterId, onSuccess, onCancel }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { createAppointment, isCreatingAppointment } = useCreateAppointment();
  const { settings, isSettingsLoading } = useSettings();

  const date = selectedDate ? new Date(selectedDate) : null;
  const { availableSlots, isSlotsLoading } = useAvailableSlots({
    masterId,
    date,
    procedureName: selectedProcedure,
    enabled: !!selectedDate && !!selectedProcedure,
  });

  const procedures = settings?.procedures || [];

  // Get minimum date (today)
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  // Get maximum date (based on advance booking days)
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + (settings?.advanceBookingDays || 30));
  const maxDateStr = maxDate.toISOString().split("T")[0];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedSlot(null); // Reset selected slot when date changes
  };

  const handleProcedureChange = (e) => {
    setSelectedProcedure(e.target.value);
    setSelectedSlot(null); // Reset selected slot when procedure changes
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const onSubmit = (data) => {
    if (!selectedSlot) {
      return;
    }

    const appointmentData = {
      masterId,
      procedureName: selectedProcedure,
      startTime: selectedSlot.startTime,
      notes: data.notes || "",
    };

    createAppointment(appointmentData, {
      onSuccess: () => {
        reset();
        setSelectedDate("");
        setSelectedProcedure("");
        setSelectedSlot(null);
        onSuccess?.();
      },
    });
  };

  if (isSettingsLoading) {
    return <Spinner />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Выберите процедуру" error={errors?.procedure?.message}>
        <StyledSelect
          value={selectedProcedure}
          onChange={handleProcedureChange}
          disabled={isCreatingAppointment}
        >
          <option value="">-- Выберите процедуру --</option>
          {procedures.map((procedure) => (
            <option key={procedure.name} value={procedure.name}>
              {procedure.name} - {procedure.price}₽ ({procedure.duration} мин)
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow label="Выберите дату" error={errors?.date?.message}>
        <Input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          min={minDate}
          max={maxDateStr}
          disabled={isCreatingAppointment || !selectedProcedure}
        />
      </FormRow>

      {selectedDate && selectedProcedure && (
        <FormRow label="Доступное время">
          {isSlotsLoading ? (
            <Spinner />
          ) : availableSlots.length === 0 ? (
            <p>На выбранную дату нет доступных слотов</p>
          ) : (
            <SlotsGrid>
              {availableSlots.map((slot, index) => (
                <SlotButton
                  key={index}
                  type="button"
                  selected={selectedSlot === slot}
                  onClick={() => handleSlotSelect(slot)}
                  disabled={isCreatingAppointment}
                >
                  {new Date(slot.startTime).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </SlotButton>
              ))}
            </SlotsGrid>
          )}
        </FormRow>
      )}

      <FormRow
        label="Примечания (необязательно)"
        error={errors?.notes?.message}
      >
        <Input
          type="text"
          placeholder="Дополнительные пожелания..."
          disabled={isCreatingAppointment}
          {...register("notes", {
            maxLength: {
              value: 500,
              message: "Примечания не должны превышать 500 символов",
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="button"
          onClick={onCancel}
          disabled={isCreatingAppointment}
        >
          Отмена
        </Button>
        <Button type="submit" disabled={isCreatingAppointment || !selectedSlot}>
          {isCreatingAppointment ? <Spinner /> : "Записаться"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default AppointmentForm;
