import { createGlobalStyle } from "styled-components";

const FullCalendarStyles = createGlobalStyle`
  /* Calendar Container */
  .fc {
    background-color: var(--color-grey-0);
    padding: 2rem;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    font-family: 'Lato', sans-serif;
    color: var(--color-grey-700);
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
    color: var(--color-brand-700);
  }

  .fc-button {
    background-color: var(--color-brand-500);
    color: var(--color-grey-0);
    border: none;
    border-radius: var(--border-radius-sm);
    padding: 0.5rem 1rem;
    box-shadow: var(--shadow-sm);
    transition: background-color 0.3s;
  }

  .fc-button:hover {
    background-color: var(--color-brand-600);
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
    background-color: var(--color-brand-100);
    font-weight: bold;
  }

  /* Events */
  .fc-event {
    background-color: var(--color-brand-500);
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius-sm);
    font-size: 1.4rem;
    color: var(--color-grey-0);
  }

  .fc-event:hover {
    background-color: var(--color-brand-600);
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
    background-color: var(--color-beige-100);
  }

  .fc-list-day {
    background-color: var(--color-beige-200);
    font-weight: 600;
    color: var(--color-beige-900);
  }
`;

export default FullCalendarStyles;
