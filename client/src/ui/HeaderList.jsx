import { Link } from "react-router-dom";
import styled from "styled-components";

import ProfileSection from "./ProfileSection";

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
  return (
    <UnorderedList>
      <ListItem>
        <Link to="/">Home</Link>
      </ListItem>
      <ListItem>
        <Link to="/profile">Profile</Link>
      </ListItem>
      <ListItem>
        <Link to="/works">Works</Link>
      </ListItem>
      <ListItem>
        <ProfileSection />
      </ListItem>
    </UnorderedList>
  );
}

export default HeaderList;
