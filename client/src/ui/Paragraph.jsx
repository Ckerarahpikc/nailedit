import styled, { css } from "styled-components";

const types = {
  error: css`
    color: var(--color-error);
  `,
  success: css`
    color: var(--color-error);
  `,
};

const Paragraph = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 1.6rem;
  line-height: 1.5;
  color: var(--color-grey-800);
  margin: 0;
  flex-wrap: nowrap;

  ${(props) => types[props.type]}
`;

export default Paragraph;
