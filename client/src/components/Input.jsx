import styled from "styled-components";

const Input = styled.input`
  background: transparent;
  width: 100%;
  height: 50px;
  border: none;
  border-bottom: 1px solid var(--color-grey-700);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  color: var(--color-grey-800);

  &:focus {
    outline: none;
  }
`;

export default Input;
