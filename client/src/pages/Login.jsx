import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import Form from "../components/Form";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import FormRow from "../components/FormRow";
import SpinnerMini from "../components/SpinnerMini";
import Paragraph from "../components/Paragraph";
import Link from "../components/Link";

import { useLogin } from "../elements/sign-in-out/useLogin";
import useRegister from "../elements/sign-in-out/useRegister";

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
  background: transparent;
  border-radius: var(--border-radius-sm);
  /* box-shadow: var(--shadow-lg); */
  /* border: 1px solid var(--color-grey-800); */
`;

function Login() {
  const location = useLocation();
  const isRegister = location.pathname === "/register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login, isLoadingLogin = false } = useLogin();
  const { register, isLoadingRegister = false } = useRegister();

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !email ||
      !password ||
      (isRegister && password !== confirmPassword && !name)
    )
      return;

    if (isRegister) {
      register({ name, email, password, confirmPassword });
    } else {
      login({ email, password });
    }
  }

  return (
    <StyledLoginPage>
      <Logo
        theme="dark"
        size={isRegister ? "medium" : "large"}
        appearance="icon"
        events={false}
      />
      <LoginForm onSubmit={handleSubmit}>
        <Form>
          {isRegister && (
            <FormRow label="Name">
              <Input
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </FormRow>
          )}

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

          {isRegister && (
            <FormRow label="Confirm Password">
              <Input
                id="confirmPassword"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormRow>
          )}

          <FormRow>
            <Paragraph>
              {isRegister
                ? "Already have an account?"
                : "Don't have an account yet?"}{" "}
              <Link href={isRegister ? "/login" : "/register"}>
                {isRegister ? "Login" : "Register"}
              </Link>
            </Paragraph>
          </FormRow>

          <FormRow>
            <Button size="large" variation="primary" type="submit">
              {isLoadingLogin || isLoadingRegister ? (
                <SpinnerMini />
              ) : isRegister ? (
                "Register"
              ) : (
                "Login"
              )}
            </Button>
          </FormRow>
        </Form>
      </LoginForm>
    </StyledLoginPage>
  );
}

export default Login;
