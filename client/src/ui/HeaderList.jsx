import { Link } from "react-router-dom";
import styled from "styled-components";

const UnorderedList = styled.ul`
  display: block;
  text-align: center;
`;
const ListItem = styled.li`
  display: inline-block;
  margin: 0 2rem;
  font-size: 2rem;
  text-transform: uppercase;

  & > * {
    color: var(--color-deep-brown);
    text-transform: lowercase;
    letter-spacing: 0.5px;
  }

  &:is(:hover, :focus) {
    outline: none;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: var(--color-deep-brown);
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
    </UnorderedList>
  );
}

export default HeaderList;
