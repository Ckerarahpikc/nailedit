import { useLocation, Navigate } from "react-router-dom";
import styled from "styled-components";

import Logo from "../ui/Logo";
import LoginForm from "../elements/authentication/LoginForm";
import { useNotification } from "../hooks/useNotification";
import Button from "../ui/Button";
import useSession from "../hooks/useSession";
import Spinner from "../ui/Spinner";

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

function Login() {
  const location = useLocation();
  const isRegister = location.pathname === "/register";
  const { isSessionPending, sessionData } = useSession();
  const { showNotification } = useNotification();

  if (isSessionPending) {
    return <Spinner />;
  }

  if (sessionData) {
    return <Navigate to="/" replace />;
  }

  return (
    <StyledLoginPage>
      <Logo
        theme="dark"
        size={isRegister ? "medium" : "large"}
        appearance="icon"
        events={false}
      />
      <LoginForm isRegister={isRegister} />
    </StyledLoginPage>
  );
}

export default Login;
