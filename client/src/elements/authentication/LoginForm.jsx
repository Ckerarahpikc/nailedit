import toast from "react-hot-toast";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IoCheckmarkCircle, IoClose, IoCloseCircle } from "react-icons/io5";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";
import Paragraph from "../../ui/Paragraph";
import Link from "../../ui/Link";
import ButtonIcon from "../../ui/ButtonIcon";

import useLogin from "./useLogin";
import useRegister from "./useRegister";
import { useNotification } from "../../hooks/useNotification";
import { useEffect } from "react";

const StyledLoginForm = styled.div`
  width: 45rem;
  height: auto;

  margin-top: 5rem;
  background: transparent;
  border-radius: var(--border-radius-sm);
  /* box-shadow: var(--shadow-lg); */
  /* border: 1px solid var(--color-grey-800); */
`;

const FieldStatusAbsolutePositioned = styled.span`
  position: absolute;
  font-size: 2.5rem;
  right: 0;
  top: 50%;
  transform: translate(-50%, -10%);
`;

function LoginForm({ isRegister }) {
  const {
    register: registerInput,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur", // review: show errors when user left a field
  });
  const { login, isLoadingLogin } = useLogin();
  const { register, isLoadingRegister } = useRegister();
  const { showNotification } = useNotification();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const name = watch("name");
  const email = watch("email");

  useEffect(() => {
    const fields = ["name", "email", "password", "confirmPassword"];
    for (const field of fields) {
      if (errors?.[field]) {
        showNotification(errors[field].message, "error");
        break;
      }
    }
  }, [errors, showNotification]);

  function onSubmit(data) {
    console.log("onSubmit called with:", data);
    login(data);
  }

  return (
    <StyledLoginForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isRegister && (
          <FormRow label="Name">
            <Input
              id="name"
              type="text"
              {...registerInput("name", {
                required: "Name is required",
                validate: (value) => {
                  if (!value) return true;
                  if (value.length > 20) {
                    return "Max length for name is 20 characters";
                  } else if (value.length < 3)
                    return "Min length for name is 3 characters";
                  return true;
                },
              })}
              placeholder="John Doe"
            />
            <FieldStatusAbsolutePositioned>
              {name &&
                (errors?.name ? (
                  <IoCloseCircle color="var(--color-error)" />
                ) : (
                  <IoCheckmarkCircle color="var(--color-success)" />
                ))}
            </FieldStatusAbsolutePositioned>
          </FormRow>
        )}

        <FormRow label="Email">
          <Input
            id="email"
            type="email"
            {...registerInput("email", {
              required: "Email is required",
              validate: (value) => {
                if (!value) return true;
                if (value.length > 30) {
                  return "Email has too many characters";
                } else if (value.length < 4)
                  return "Min length for email is 4 characters";
                return true;
              },
            })}
            placeholder="example@gmail.com"
          />
          <FieldStatusAbsolutePositioned>
            {email &&
              (errors?.email ? (
                <IoCloseCircle color="var(--color-error)" />
              ) : (
                <IoCheckmarkCircle color="var(--color-success)" />
              ))}
          </FieldStatusAbsolutePositioned>
        </FormRow>

        <FormRow label="Password">
          <Input
            id="password"
            type="password"
            {...registerInput("password", {
              required: "Password is required",
              validate: (value) => {
                if (!value) return true;
                if (value.length < 6) {
                  return "Password should contain at least 6 characters";
                }
                return true;
              },
            })}
            placeholder="******"
          />
          <FieldStatusAbsolutePositioned>
            {password &&
              (errors?.password ? (
                <IoCloseCircle color="var(--color-error)" />
              ) : (
                <IoCheckmarkCircle color="var(--color-success)" />
              ))}
          </FieldStatusAbsolutePositioned>
        </FormRow>

        {isRegister && (
          <FormRow label="Confirm Password">
            <Input
              id="confirmPassword"
              type="password"
              {...registerInput("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) => {
                  if (!value) return true;
                  if (value.length < 6)
                    return "Confirmation password should contain at least 6 characters";
                  return true;
                },
              })}
              placeholder="******"
            />
            <FieldStatusAbsolutePositioned>
              {confirmPassword &&
                (errors?.confirmPassword ? (
                  <IoCloseCircle color="var(--color-error)" />
                ) : (
                  <IoCheckmarkCircle color="var(--color-success)" />
                ))}
            </FieldStatusAbsolutePositioned>
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
          <Button size="large" variation="regular" type="submit">
            {isLoadingLogin || isLoadingRegister ? (
              <SpinnerMini />
            ) : isRegister ? (
              "Register"
            ) : (
              "Login"
            )}
          </Button>
        </FormRow>
      </form>
    </StyledLoginForm>
  );
}

export default LoginForm;
