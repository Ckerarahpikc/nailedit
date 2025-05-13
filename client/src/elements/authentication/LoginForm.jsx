import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";
import Paragraph from "../../ui/Paragraph";
import Link from "../../ui/Link";

import useLogin from "./useLogin";
import useRegister from "./useRegister";

const StyledLoginForm = styled.div`
  width: 45rem;
  height: auto;

  margin-top: 5rem;
  background: transparent;
  border-radius: var(--border-radius-sm);
  /* box-shadow: var(--shadow-lg); */
  /* border: 1px solid var(--color-grey-800); */
`;

function LoginForm({ isRegister }) {
  // formSatate - metadata about the current state of the form
  const {
    register: registerInput,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { login, isLoadingLogin } = useLogin();
  const { register, isLoadingRegister } = useRegister();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  function onSubmit(data) {
    console.log("data:", data);
  }

  return (
    <StyledLoginForm>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {isRegister && (
          <FormRow label="Name">
            <Input
              id="name"
              type="text"
              {...registerInput("name", {
                required: "Name is required",
                maxLength: 10,
              })}
              placeholder={errors?.name?.message}
            />
          </FormRow>
        )}

        <FormRow label="Email">
          <Input
            id="email"
            type="email"
            {...registerInput("email", {
              required: "Email is required",
              maxLength: 10,
            })}
            placeholder={errors?.email?.message}
          />
        </FormRow>

        <FormRow label="Password">
          <Input
            id="password"
            type="password"
            {...registerInput("password", {
              required: "Password is required",
              pattern: /[0-9][a-z][A-Z]/,
              validate: (value) => {
                return value === confirmPassword || "Passwords don't match";
              },
            })}
            placeholder={errors?.password && errors?.password?.message}
          />
        </FormRow>

        {isRegister && (
          <FormRow label="Confirm Password">
            <Input
              id="confirmPassword"
              type="password"
              {...registerInput("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) => {
                  return value === password || "Passwords don't match";
                },
              })}
              placeholder={errors?.confirmPassword?.message}
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
