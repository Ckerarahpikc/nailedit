import { useEffect, useState } from "react";
import styled from "styled-components";

import dayGridPlugin from "@fullcalendar/daygrid";
import ruLocale from "@fullcalendar/core/locales/ru";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ConfirmModal from "../../ui/ConfirmModal";
import { useModal } from "../../contexts/ModalProvider";

const PLUGIN_VIEW_OPTION = "listMonth"; // dayGridMonth

const StyledLayoutCalendar = styled.div`
  max-width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  max-height: 100%;

  padding: 2rem;
`;

const appointments = [
  {
    id: "1",
    title: "BCH237",
    start: "2025-05-24T10:20:00",
    end: "2025-05-26T17:30:00",
  },
  {
    id: "2",
    title: "BCH237",
    start: "2025-05-26T17:20:00",
    end: "2025-05-27T17:30:00",
  },
];

function CalendarContent() {
  const option =
    PLUGIN_VIEW_OPTION === "listDay"
      ? "Сегодня"
      : PLUGIN_VIEW_OPTION === "listWeek"
      ? "На этой неделе"
      : PLUGIN_VIEW_OPTION === "listMonth"
      ? "В этом месяце"
      : "В этом году";

  const [events, setEvents] = useState(appointments);
  const [eventId, setEventId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showConfirmModal, setShowConfirmation] = useState(false);
  const { showModal, hideModal } = useModal();

  const onCloseConfirmation = () => {
    // close default and confirm modal
    setOpenModal(false);
    setShowConfirmation(false);
  };

  const createNewAppointment = (event) => {
    // date, dateStr, allDay, jsEvent, view
    console.log("new appointment:", event);
    showModal(
      <>
        <h2>Новая запись</h2>
        <p>Дата: {event.date.toLocaleString()}</p>
        <p>Целый день? {event.allDay ? "Да" : "Нет"}</p>
        <button onClick={hideModal}>Закрыть</button>
      </>
    );
  };

  const viewAppointment = ({ event: { start, end, id } }) => {
    setOpenModal(true);
    console.log("start:", start);
    console.log("end:", end);
    // event, el, jsEvent, view

    console.log("Setting id");
    setEventId(id);
  };

  const deleteAppointment = (idToDelete) => {
    console.log("Appointment deleted definitely.");
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== idToDelete)
    );
  };

  return (
    <StyledLayoutCalendar>
      <FullCalendar
        // plugins
        plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
        // view
        initialView={`${PLUGIN_VIEW_OPTION}`}
        // interaction
        dateClick={createNewAppointment}
        selectable={true}
        // header text and buttons position
        headerToolbar={{
          left: "title",
          center: "prev next",
          // right: "today",
          right: "today dayGridMonth,timeGridWeek,timeGridDay",
        }}
        // on/off weekends
        weekends={true}
        // firstDay="monday"
        // buttonText={{
        // today: `${option}`,
        // month: "Месяц",
        // week: "Неделя",
        // day: "День",
        // }}
        locales={[ruLocale]}
        locale="ru"
        // interaction
        eventClick={viewAppointment}
        // events / appointments
        events={events}
      />

      {showConfirmModal && (
        <ConfirmModal
          resourceName={eventId}
          onConfirm={() => {
            deleteAppointment(eventId);
            onCloseConfirmation();
          }}
          disabled={false}
          onCloseModal={onCloseConfirmation}
          state="delete"
        />
      )}
    </StyledLayoutCalendar>
  );
}

export default CalendarContent;
