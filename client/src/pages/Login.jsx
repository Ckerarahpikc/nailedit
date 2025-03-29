import styled from "styled-components";

import Form from "../ui/Form";
import Logo from "../components/Logo";

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
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Login submitted");
  }
  return (
    <StyledLoginPage>
      <Logo />
      <LoginForm onSubmit={handleSubmit}>
        <Form />
      </LoginForm>
    </StyledLoginPage>
  );
}

export default Login;
