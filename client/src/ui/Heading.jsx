import styled, { css } from "styled-components";

const Heading = styled.p`
  font-family: "Playfair Display", sans-serif;
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 8rem;
      letter-spacing: 0.4rem;
      font-weight: 400;
      margin-bottom: 2rem;
      line-height: 86px;
    `};
  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 3.5rem;
      font-weight: 400;
      line-height: 56px;
    `};
  ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 3rem;
      font-weight: 400;
      line-height: 48px;
    `};
  ${(props) =>
    props.type === "h4" &&
    css`
      font-size: 2rem;
      font-weight: 400;
      line-height: 32px;
      filter: brightness(80%);
    `};

  position: relative;
  color: white;
`;
export default Heading;
