import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

// rotation animation :0
const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

// styless
const SpinnerMini = styled(BiLoaderAlt)`
  width: 2.4rem;
  height: 2.4rem;
  color: var(--color-brand-600); /* spinner color */
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
