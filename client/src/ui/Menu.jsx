import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

import useClickOutsideEffect from "../hooks/useClickOutsideEffect";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  font-family: "Inter", sans-serif;
`;

const StyledToggle = styled.button`
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
`;

const StyledList = styled.ul`
  position: absolute;
  background-color: var(--color-soft-white);
  display: flex;
  flex-direction: column;
  min-width: 130px;
  gap: 1rem;

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;

  & > li {
  }
`;

const StyledButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  box-shadow: none;
  color: var(--color-deep-brown);
  width: 100%;
  height: 100%;

  list-style-type: none;
  font-family: "Inter";
  font-size: 1.3rem;
  gap: 5px;
  padding: 15px 5px;

  &:is(:hover, :focus) {
    background-color: var(--color-grey-200);
  }
`;

const MenuContext = createContext();

function Menu({ children }) {
  const [position, setPosition] = useState({});
  const [openId, setOpenId] = useState("");
  const close = () => setOpenId("");

  return (
    <MenuContext.Provider
      value={{ openId, setOpenId, close, position, setPosition }}
    >
      <StyledMenu>{children}</StyledMenu>
    </MenuContext.Provider>
  );
}

function Toggle({ children, id }) {
  const { openId, close, setOpenId, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();

    // 1. get some information about toggle button
    const button = e.target.closest("button");
    const rect = button.getBoundingClientRect();

    // 2. initial position
    const y = rect.y + rect.height + 15;
    const x = window.innerWidth - rect.width - rect.x - 30; // +10 gives some more space
    setPosition({
      y: Math.round(y),
      x: Math.round(x),
    });

    // debug: here 'close' is not working so setted to null temporarly
    openId === "" || openId !== id ? setOpenId(id) : null;
  }

  return <StyledToggle onClick={handleClick}>{children}</StyledToggle>;
}

function List({ children, id }) {
  const { position, openId, close } = useContext(MenuContext);
  const { ref } = useClickOutsideEffect({ callback: close });

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    // this is a part of the list so 'li'
    <li>
      <StyledButton onClick={() => handleClick()}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export default Menu;
