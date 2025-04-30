import styled from "styled-components";

import Calendar from "./Calendar";

const StyledLayoutSchedule = styled.div`
  max-width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  max-height: 100%;
  
  padding: 2rem;
`;

function SchedulePage() {
  return (
    <StyledLayoutSchedule>
      <Calendar />
    </StyledLayoutSchedule>
  );
}

export default SchedulePage;
