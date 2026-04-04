import { useState } from "react";
import styled from "styled-components";
import ruLocale from "@fullcalendar/core/locales/ru";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import { useAppointments } from "../../hooks/useAppointments";
import { useProtectedContext } from "../../hooks/useProtectedContext";
import { useModal } from "../../contexts/ModalProvider";
import AppointmentForm from "../../features/appointments/AppointmentForm";
import AppointmentCard from "../../features/appointments/AppointmentCard";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";

const PLUGIN_VIEW_OPTION = "listMonth";

const StyledLayoutSchedule = styled.div`
  max-width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  max-height: 100%;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const CalendarContainer = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
`;

const AppointmentsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-grey-500);
`;

function SchedulePage() {
  const context = useProtectedContext();
  const sessionData = context?.sessionData;
  const { appointments, isAppointmentsLoading, refetchAppointments } =
    useAppointments();
  const { showModal, hideModal } = useModal();
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const isClient = sessionData?.status === "client";
  const isMaster = sessionData?.status === "master";
  const isAdmin = sessionData?.status === "admin";

  // Convert appointments to FullCalendar events format
  const calendarEvents = appointments.map((appointment) => ({
    id: appointment._id,
    title: `${appointment.procedureName}${
      isMaster && appointment.userId ? ` - ${appointment.userId.name}` : ""
    }`,
    start: appointment.startTime,
    end: appointment.endTime,
    backgroundColor: getEventColor(appointment.status),
    borderColor: getEventColor(appointment.status),
    extendedProps: {
      appointment,
    },
  }));

  function getEventColor(status) {
    switch (status) {
      case "pending":
        return "#f59e0b"; // yellow
      case "confirmed":
        return "#10b981"; // green
      case "completed":
        return "#3b82f6"; // blue
      case "cancelled":
        return "#ef4444"; // red
      default:
        return "#6b7280"; // gray
    }
  }

  const handleDateClick = (dateInfo) => {
    // admins and clients can create an appointment
    if (!isClient || !isAdmin) return;

    const clickedDate = dateInfo.date;
    const now = new Date();

    // don't allow booking in the past
    if (clickedDate < now) {
      return;
    }

    showModal(
      <div>
        <Heading as="h2">Новая запись</Heading>
        <AppointmentForm
          masterId={getMasterId()}
          onSuccess={() => {
            hideModal();
            refetchAppointments();
          }}
          onCancel={hideModal}
        />
      </div>
    );
  };

  const handleEventClick = (eventInfo) => {
    const appointment = eventInfo.event.extendedProps.appointment;
    setSelectedAppointment(appointment);

    showModal(
      <div>
        <Heading as="h2">Детали записи</Heading>
        <AppointmentCard
          appointment={appointment}
          onEdit={(apt) => {
            
            console.log("Edit appointment:", apt);
          }}
        />
        <div style={{ marginTop: "2rem", textAlign: "right" }}>
          <Button onClick={hideModal}>Закрыть</Button>
        </div>
      </div>
    );
  };

  const handleNewAppointment = () => {
    showModal(
      <div>
        <Heading as="h2">Новая запись</Heading>
        <AppointmentForm
          masterId={getMasterId()}
          onSuccess={() => {
            hideModal();
            refetchAppointments();
          }}
          onCancel={hideModal}
        />
      </div>
    );
  };

  const getMasterId = () => {
    // For now, return a placeholder - this should be fetched from settings
    return "placeholder-master-id";
  };

  if (isAppointmentsLoading) {
    return (
      <StyledLayoutSchedule>
        <Spinner />
      </StyledLayoutSchedule>
    );
  }

  return (
    <StyledLayoutSchedule>
      <Header>
        <Heading as="h1">
          {isMaster ? "Календарь записей" : "Мои записи"}
        </Heading>
        {isClient && <Button onClick={handleNewAppointment}>Записаться</Button>}
      </Header>

      <CalendarContainer>
        <FullCalendar
          plugins={[
            listPlugin,
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          initialView={PLUGIN_VIEW_OPTION}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          selectable={isClient}
          headerToolbar={{
            left: "title",
            center: "prev next",
            right: "today dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          weekends={true}
          locales={[ruLocale]}
          locale="ru"
          events={calendarEvents}
          height="auto"
          eventDisplay="block"
          dayMaxEvents={3}
          moreLinkClick="popover"
        />
      </CalendarContainer>

      {/* Show appointments list for mobile or as additional view */}
      {appointments.length > 0 ? (
        <AppointmentsList>
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onEdit={(apt) => {
                console.log("Edit appointment:", apt);
              }}
            />
          ))}
        </AppointmentsList>
      ) : (
        <EmptyState>
          <Heading as="h3">
            {isClient ? "У вас пока нет записей" : "Записей пока нет"}
          </Heading>
          <p>
            {isClient
              ? "Нажмите кнопку 'Записаться' или выберите дату в календаре, чтобы создать новую запись"
              : "Клиенты смогут записываться к вам через календарь"}
          </p>
        </EmptyState>
      )}
    </StyledLayoutSchedule>
  );
}

export default SchedulePage;
