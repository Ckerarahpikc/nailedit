import styled, { css } from "styled-components";

const Img = styled.img`
  left: 3rem;
  display: flex;
  ${(props) =>
    props.size === "small" &&
    css`
      height: 5rem;
    `}
  ${(props) =>
    props.size === "medium" &&
    css`
      height: 10rem;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      height: 15rem;
    `}

  cursor: pointer;
  user-select: none;
`;

export default Img;
