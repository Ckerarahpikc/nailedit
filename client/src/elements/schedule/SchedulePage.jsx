import styled from "styled-components";
import ruLocale from "@fullcalendar/core/locales/ru";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import ConfirmModal from "../../ui/ConfirmModal";

const PLUGIN_VIEW_OPTION = "listMonth"; // dayGridMonth

const StyledLayoutSchedule = styled.div`
  max-width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  max-height: 100%;

  padding: 2rem;
`;

const styledModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

function SchedulePage() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [events, setEvents] = useState(appointments);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setShowConfirm(true);
  };

  const onCloseConfirmModal = () => {
    setOpen(false);
    setShowConfirm(false);
  };

  const option =
    PLUGIN_VIEW_OPTION === "listDay"
      ? "Сегодня"
      : PLUGIN_VIEW_OPTION === "listWeek"
      ? "На этой неделе"
      : PLUGIN_VIEW_OPTION === "listMonth"
      ? "В этом месяце"
      : "В этом году";

  const createNewAppointment = (info) => {
    // date, dateStr, allDay, jsEvent, view
    console.log("new appointment:", info);
  };

  const viewAppointment = ({ event: { start, end, id } }) => {
    handleOpen();
    console.log("start:", start);
    console.log("end:", end);
    // event, el, jsEvent, view

    console.log("Setting id");
    setId(id);
  };

  const deleteAppointment = (idToDelete) => {
    console.log("Appointment deleted definitely.");
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== idToDelete)
    );
  };

  return (
    <StyledLayoutSchedule>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styledModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>

      {showConfirm && (
        <ConfirmModal
          resourceName={id}
          onConfirm={() => {
            deleteAppointment(id);
            onCloseConfirmModal();
          }}
          disabled={false}
          onCloseModal={onCloseConfirmModal}
          state="delete"
        />
      )}
    </StyledLayoutSchedule>
  );
}

export default SchedulePage;
