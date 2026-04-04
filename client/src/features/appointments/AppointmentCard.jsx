import styled from "styled-components";
import { ru } from "date-fns/locale";
import { format } from "date-fns";

import Button from "../../ui/Button";
import { useProtectedContext } from "../../hooks/useProtectedContext";
import { useUpdateAppointment } from "../../hooks/useUpdateAppointment";

const Card = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s;

  &:hover {
    box-shadow: var(--shadow-md);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin: 0;
`;

const StatusBadge = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: var(--border-radius-sm);
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;

  ${(props) => {
    switch (props.status) {
      case "pending":
        return `
          background-color: var(--color-yellow-100);
          color: var(--color-yellow-800);
        `;
      case "confirmed":
        return `
          background-color: var(--color-green-100);
          color: var(--color-green-800);
        `;
      case "completed":
        return `
          background-color: var(--color-blue-100);
          color: var(--color-blue-800);
        `;
      case "cancelled":
        return `
          background-color: var(--color-red-100);
          color: var(--color-red-800);
        `;
      default:
        return `
          background-color: var(--color-grey-100);
          color: var(--color-grey-800);
        `;
    }
  }}
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-600);
  text-transform: uppercase;
`;

const Value = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-800);
`;

const Notes = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-sm);
  border-left: 4px solid var(--color-brand-600);
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const statusLabels = {
  pending: "Ожидает",
  confirmed: "Подтверждена",
  completed: "Завершена",
  cancelled: "Отменена",
};

function AppointmentCard({ appointment, onEdit }) {
  const context = useProtectedContext();
  const sessionData = context?.sessionData;
  const { updateAppointment, isUpdatingAppointment } = useUpdateAppointment();

  const isClient = sessionData?.status === "client";
  const isMaster = sessionData?.status === "master";
  let isOwnAppointment = false;
  if (sessionData && appointment.userId) {
    isOwnAppointment = appointment.userId._id === sessionData._id;
  }

  const canCancel =
    isClient && isOwnAppointment && appointment.status === "pending";
  const canConfirm = isMaster && appointment.status === "pending";
  const canComplete = isMaster && appointment.status === "confirmed";

  const handleStatusUpdate = (newStatus) => {
    updateAppointment({
      appointmentId: appointment._id,
      updates: { status: newStatus },
    });
  };

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), "d MMMM yyyy, HH:mm", { locale: ru });
  };

  return (
    <Card>
      <Header>
        <Title>{appointment.procedureName}</Title>
        <StatusBadge status={appointment.status}>
          {statusLabels[appointment.status]}
        </StatusBadge>
      </Header>

      <Info>
        <InfoItem>
          <Label>Дата и время</Label>
          <Value>{formatDateTime(appointment.startTime)}</Value>
        </InfoItem>

        <InfoItem>
          <Label>Длительность</Label>
          <Value>{appointment.procedureDuration} мин</Value>
        </InfoItem>

        <InfoItem>
          <Label>Стоимость</Label>
          <Value>{appointment.procedurePrice}₽</Value>
        </InfoItem>

        {isMaster && appointment.userId && (
          <InfoItem>
            <Label>Клиент</Label>
            <Value>{appointment.userId.name}</Value>
          </InfoItem>
        )}

        {isClient && appointment.masterId && (
          <InfoItem>
            <Label>Мастер</Label>
            <Value>{appointment.masterId.name}</Value>
          </InfoItem>
        )}
      </Info>

      {appointment.notes && (
        <Notes>
          <Label>Примечания</Label>
          <Value>{appointment.notes}</Value>
        </Notes>
      )}

      <Actions>
        {canCancel && (
          <Button
            variation="danger"
            size="small"
            onClick={() => handleStatusUpdate("cancelled")}
            disabled={isUpdatingAppointment}
          >
            Отменить
          </Button>
        )}

        {canConfirm && (
          <Button
            variation="primary"
            size="small"
            onClick={() => handleStatusUpdate("confirmed")}
            disabled={isUpdatingAppointment}
          >
            Подтвердить
          </Button>
        )}

        {canComplete && (
          <Button
            variation="secondary"
            size="small"
            onClick={() => handleStatusUpdate("completed")}
            disabled={isUpdatingAppointment}
          >
            Завершить
          </Button>
        )}

        {onEdit && (isOwnAppointment || isMaster) && (
          <Button
            variation="secondary"
            size="small"
            onClick={() => onEdit(appointment)}
            disabled={isUpdatingAppointment}
          >
            Редактировать
          </Button>
        )}
      </Actions>
    </Card>
  );
}

export default AppointmentCard;
