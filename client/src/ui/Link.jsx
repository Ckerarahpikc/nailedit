import styled from "styled-components";

const Link = styled.a`
  font-family: "Lato", sans-serif;
  font-size: 1.6rem;
  color: var(--color-primary);
  text-decoration: none;
  user-select: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: none;
    text-decoration: underline;
  }
`;

export default Link;
