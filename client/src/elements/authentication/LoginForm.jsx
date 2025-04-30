import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import Paragraph from "../../ui/Paragraph";
import Link from "../../ui/Link";

import { useLogin } from "./useLogin";
import useRegister from "./useRegister";
import useSession from "./useSession";

const StyledLoginForm = styled.form`
  width: 45rem;
  height: auto;

  margin-top: 5rem;
  background: transparent;
  border-radius: var(--border-radius-sm);
  /* box-shadow: var(--shadow-lg); */
  /* border: 1px solid var(--color-grey-800); */
`;

function LoginForm({ isRegister }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login, isLoadingLogin = false } = useLogin();
  const { register, isLoadingRegister = false } = useRegister();
  const { user, isLoadingLogin: isLoadingSession } = useSession();

  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  if (isLoadingSession) {
    return <Spinner />;
  }

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
    <StyledLoginForm onSubmit={handleSubmit}>
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
    </StyledLoginForm>
  );
}

export default LoginForm;
