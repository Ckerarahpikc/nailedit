import { createGlobalStyle } from "styled-components";

const FullCalendarStyles = createGlobalStyle`
  :root {
    --calendar-primary: #2C3E50;
    --calendar-primary-dark: #1A252F;
    --calendar-accent: #34495E;
    --calendar-today-bg: #ecf0f1;
    --calendar-event-text: #ffffff;
  }

  /* Calendar Container */
  .fc {
    background-color: var(--color-grey-0);
    padding: 2rem;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    font-family: 'Lato', sans-serif;
    color: var(--calendar-primary);
  }

  /* Header Toolbar */
  .fc-header-toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .fc-toolbar-chunk:nth-of-type(2) {
    margin-left: auto;
  }

  .fc-toolbar-chunk:nth-of-type(3) {
    margin-left: 1rem;
  }

  .fc-toolbar-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--calendar-primary);
  }

  .fc-button {
    background-color: var(--calendar-primary);
    color: var(--calendar-event-text);
    border: none;
    border-radius: var(--border-radius-sm);
    padding: 0.5rem 1rem;
    box-shadow: var(--shadow-sm);
    transition: background-color 0.3s;
  }

  .fc-button:hover {
    background-color: var(--calendar-primary-dark);
  }

  .fc-button:disabled {
    background-color: var(--color-grey-300);
    cursor: not-allowed;
  }

  /* Day Grid */
  .fc-daygrid-day {
    border: 1px solid var(--color-grey-200);
  }

  .fc-day-today {
    background-color: var(--calendar-today-bg);
    font-weight: bold;
  }

  /* Events */
  .fc-event {
    background-color: var(--calendar-accent);
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius-sm);
    font-size: 1.4rem;
    color: var(--calendar-event-text);
  }

  .fc-event:hover {
    background-color: var(--calendar-primary);
  }

  /* List View */
  .fc-list {
    border-color: var(--color-grey-200);
  }

  .fc-list-item {
    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-200);
  }

  .fc-list-item:hover {
    background-color: var(--calendar-today-bg);
  }

  .fc-list-day {
    background-color: var(--calendar-accent);
    font-weight: 600;
    color: var(--calendar-event-text);
  }
`;

export default FullCalendarStyles;
