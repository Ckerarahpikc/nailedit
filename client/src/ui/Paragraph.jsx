import styled, { css } from "styled-components";

const Paragraph = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 1.6rem;
  line-height: 1.5;
  color: var(--color-grey-800);
  margin: 0;
  flex-wrap: nowrap;

  ${(props) => {
    props.type === "error" &&
      css`
        color: var(--color-error);
      `;
  }}
`;

export default Paragraph;
