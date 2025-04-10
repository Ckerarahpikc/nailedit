import styled from "styled-components";

const ButtonIcon = styled.button`
  display: flex;
  margin-left: auto;
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  background-color: var(--color-brand-500);

  &:hover {
    background-color: var(--color-brand-700);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-deep-brown);
  }
`;

export default ButtonIcon;
