import { useState } from "react";
import styled from "styled-components";

import Form from "../ui/Form";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import FormRow from "../components/FormRow";
import SpinnerMini from "../components/SpinnerMini";

import { useLogin } from "../elements/sign-in-out/useLogin";

const StyledLoginPage = styled.div`
  background-color: var(--color-soft-white);
  color: var(--color-grey-800);
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  font-family: "Lato", sans-serif;
`;

const LoginForm = styled.form`
  width: 45rem;
  height: auto;

  margin-top: 5rem;
  background-color: var(--color-beige-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-lg);
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login({ email, password });
  }

  return (
    <StyledLoginPage>
      <Logo />
      <LoginForm onSubmit={handleSubmit}>
        <Form>
          <FormRow label="Email">
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormRow>

          <FormRow label="Password">
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormRow>

          <FormRow>
            <Button size="large" variation="regular" type="submit">
              {isLoading ? "Login" : <SpinnerMini />}
            </Button>
          </FormRow>
        </Form>
      </LoginForm>
    </StyledLoginPage>
  );
}

export default Login;
