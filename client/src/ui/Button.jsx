import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  regular: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-500);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  primary: css`
    color: var(--color-grey-800);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50); 
    }
  `,
  danger: css`
    color: var(--color-soft-white);
    background-color: red;

    &:hover {
      background-color: red;
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  
  display: flex;
  align-items: center;
  justify-content: center;
  

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

export default Button;
