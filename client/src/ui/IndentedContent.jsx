import styled from "styled-components";

const Indented = styled.div`
  color: inherit;
  font-size: inherit;
  text-indent: 2rem;

  & > * {
    margin: 2rem 1rem;
  }
`;

function IndentedContent({ children }) {
  return <Indented>{children}</Indented>;
}

export default IndentedContent;
