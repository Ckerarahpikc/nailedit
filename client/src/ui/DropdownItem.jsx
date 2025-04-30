import styled from "styled-components";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import Link from "./Link";
import { useState } from "react";

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropDownName = styled(Link)`
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  color: var(--color-grey-900);

  & > span {
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    margin: 8px 0 0 -5px;
  }
`;

const FolderHeader = styled.h4`
  margin: 1rem 0 0.5rem;
  font-size: 1.6rem;
  color: var(--color-grey-900);
`;

const List = styled.div`
  display: ${({ isClose }) => (isClose ? "none" : "inline-block")};
  margin-top: 0.5rem;

  & > li {
    display: block;
    color: var(--color-grey-700);
    text-indent: 2rem;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

function DropdownItem({ children, dropDownName }) {
  const [isClose, setIsClose] = useState(false);

  return (
    <Dropdown>
      <DropDownName onClick={() => setIsClose((prev) => !prev)}>
        <FolderHeader>{dropDownName}</FolderHeader>
        <span>{isClose ? <HiChevronDown /> : <HiChevronUp />}</span>
      </DropDownName>

      <List isClose={isClose}>{children}</List>
    </Dropdown>
  );
}

export default DropdownItem;
