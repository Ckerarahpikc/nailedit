import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  font-family: inherit;
`;

function Form({ children, ...props }) {
  return <StyledForm {...props}>{children}</StyledForm>;
}

export default Form;
