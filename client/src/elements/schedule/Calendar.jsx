import { useNavigate } from "react-router-dom";
import ruLocale from "@fullcalendar/core/locales/ru";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
const PLUGIN_VIEW_OPTION = "dayGridMonth";

function Calendar() {
  const navigate = useNavigate();
  const option =
    PLUGIN_VIEW_OPTION === "listDay"
      ? "Сегодня"
      : PLUGIN_VIEW_OPTION === "listWeek"
      ? "На этой неделе"
      : PLUGIN_VIEW_OPTION === "listMonth"
      ? "В этом месяце"
      : "В этом году";

  return (
    <FullCalendar
      // plugins
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      // view
      initialView={`${PLUGIN_VIEW_OPTION}`}
      // interaction
      dateClick={(info) => {
        console.log("info:", info);
        navigate(`/schedule/${info.dateStr}`);
      }}
      selectable={true}
      // header text and buttons position
      headerToolbar={{
        left: "title",
        center: "prev next",
        right: "today",
        // right: "dayGridMonth,timeGridWeek,timeGridDay",
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
      eventClick={(info) => console.log("info:", info)}
      // events / appointments
      events={[
        { title: "Nail Appointment", date: "2025-04-19T10:00:00" },
        { title: "Gel Fill-In", date: "2025-04-19T13:00:00" },
        { title: "Full Cleaning", date: "2025-04-20T15:00:00" },
        { title: "Feet Cleaning", date: "2025-04-21T17:00:00" },
      ]}
    />
  );
}

export default Calendar;
