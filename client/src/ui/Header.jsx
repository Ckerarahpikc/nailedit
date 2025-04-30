import styled from "styled-components";

import Logo from "../ui/Logo";
import HeaderList from "./HeaderList";

const StyledHeader = styled.header`
  width: 100%;
  height: 85px;

  background-color: var(--color-soft-white);

  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-grey-800);
  font-family: "Inter";
  padding: 0 3rem 0 3rem;
`;

function Header() {
  return (
    <StyledHeader>
      <Logo theme="dark" size="small" appearance="text" events={true} />
      <HeaderList />
    </StyledHeader>
  );
}

export default Header;
