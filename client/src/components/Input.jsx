import styled from "styled-components";

const Input = styled.input`
  background: transparent;
  width: 100%;
  height: 50px;
  border: none;
  border-bottom: 1px solid var(--color-grey-700);
  /* box-shadow: var(--shadow-sm); */
  padding: 0.8rem 1.2rem;
  color: var(--color-grey-800);
  outline: none;

  &:focus {
    outline: none;
  }

  // autofill fix background
  &:-webkit-autofill {
    /* -webkit-box-shadow: 0 0 0px 1000px transparent inset; */
    /* box-shadow: 0 0 0px 1000px transparent inset; */
    background-color: transparent !important;
    /* caret-color: var(--color-grey-800) !important; */
  }

  &:-webkit-autofill:focus {
    /* -webkit-box-shadow: 0 0 0px 1000px transparent inset; */
    /* box-shadow: 0 0 0px 1000px transparent inset; */
    background-color: transparent !important;
    /* caret-color: var(--color-grey-800) !important; */
  }
`;

export default Input;
