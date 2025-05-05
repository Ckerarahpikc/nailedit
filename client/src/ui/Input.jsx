import styled, { css } from "styled-components";

const Input = styled.input`
  background: transparent;
  width: 100%;
  height: 50px;
  border: none;
  color: var(--color-grey-800);
  outline: none;

  ${(param) =>
    param.type === "file"
      ? css`
          display: flex;
          height: 4rem;
          width: 100%;
          border-radius: var(--border-radius-sm);
          border: 1px solid #d1d5db;
          background-color: var(--color-soft-white);
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          padding-top: 0.8rem;
          padding-bottom: 0.8rem;
          font-size: 1.4rem;
          color: #9ca3af;

          &:is(:hover, :focus) {
            border: 2px solid var(--color-brand-700);
            cursor: pointer;
          }

          &::file-selector-button {
            border: none;
            background: transparent;
            color: #4b5563;
            font-size: 1.5rem;
            font-weight: 500;
          }
        `
      : css`
          padding: 0.8rem 1.2rem;
          border-bottom: 1px solid var(--color-grey-700);
          &:focus {
            outline: none;
          }

          // autofill fix background
          &:-webkit-autofill {
            /* -webkit-box-shadow: 0 0 0px 1000px transparent inset; */
            /* box-shadow: 0 0 0px 1000px transparent inset; */
            background-color: transparent !important;
            /* caret-color: var(--color-grey-800) !important; */
          }

          &:-webkit-autofill:focus {
            /* -webkit-box-shadow: 0 0 0px 1000px transparent inset; */
            /* box-shadow: 0 0 0px 1000px transparent inset; */
            background-color: transparent !important;
            /* caret-color: var(--color-grey-800) !important; */
          }
        `}
`;

export default Input;
