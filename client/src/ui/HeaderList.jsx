import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

import HeadingProfileSection from "./HeadingProfileSection";

const UnorderedList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 4rem;
`;
const ListItem = styled.li`
  display: flex;
  text-transform: lowercase;
  align-items: center;
  justify-content: center;

  & > * {
    color: var(--color-deep-brown);
    font-weight: 500;
    text-transform: lowercase;
  }

  & > a {
    text-transform: lowercase;
    letter-spacing: 0.5px;

    ${(param) =>
      param.$active &&
      css`
        text-decoration: underline;
        text-underline-offset: 4px;
      `}
  }

  & > a:is(:hover, :focus) {
    outline: none;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: var(--color-deep-brown);
  }

  & > button > svg {
    width: 2rem;
    height: 2rem;
  }
`;
function HeaderList() {
  const { pathname } = useLocation();

  return (
    <UnorderedList>
      <ListItem $active={pathname === "/schedule"}>
        <Link to="/schedule">Schedule</Link>
      </ListItem>
      <ListItem $active={pathname === "/works"}>
        <Link to="/works">Works</Link>
      </ListItem>
      <ListItem $active={pathname === "/profile"}>
        <Link to="/profile">Profile</Link>
      </ListItem>
      <ListItem>
        <HeadingProfileSection />
      </ListItem>
    </UnorderedList>
  );
}

export default HeaderList;
