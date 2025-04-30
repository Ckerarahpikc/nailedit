import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Header from "./Header";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  overflow: auto;
  font-family: "Lato", sans-serif;

  // main style of the layout
  padding: 2rem 1rem;
  margin: 0 auto;

  min-width: 100%;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
