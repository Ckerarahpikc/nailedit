import styled from "styled-components";

import Input from "../components/Input";
import Button from "../components/Button";
import FormRow from "../components/FormRow";

const StyledForm = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  font-family: inherit;
`;

function Form() {
  return (
    <StyledForm>
      <FormRow label="Email">
        <Input id="email" type="email" />
      </FormRow>
      <FormRow label="Password">
        <Input id="password" type="password" />
      </FormRow>
      <FormRow label="Name">
        <Input id="name" type="text" />
      </FormRow>
      <FormRow>
        <Button size="large" variation="regular" type="submit">
          Login
        </Button>
      </FormRow>
    </StyledForm>
  );
}

export default Form;
