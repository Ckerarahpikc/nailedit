import { createContext, useContext, useState } from "react";
import { createPortal } from "react-drom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

import useClickOutsideEffect from "../hooks/useClickOutsideEffect";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button``;

const StyledList = styled.ul`
  list-style-type: none;
`;

const StyledButton = styled.button``;

const MenuContext = createContext();

function Menu({ children }) {
  const [position, setPosition] = useState({});
  const [openId, setOpenId] = useState("");
  const close = () => setOpenId("");

  return (
    <MenuContext.Provider
      value={{ openId, setOpenId: open, close, position, setPosition }}
    >
      <StyledMenu>{children}</StyledMenu>
    </MenuContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    // 1. get some information about toggle button
    const button = e.target.closest("button");
    const rect = button.getBoundingClientRect();

    // 2. initial position
    const y = rect.y + rect.height + 8;
    const x = window.innerWidth - rect.width - rect.x + 10; // +10 gives some more space

    setPosition({
      y,
      x,
    });

    // 3. make it toggble (what?)
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children, id }) {
  const { position, openId, close } = useContext(MenuContext);
  const { ref } = useClickOutsideEffect({ callback: close });
  console.log("position:", position);

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
    <StyledButton onClick={() => handleClick()}>
      {icon}
      <span>{children}</span>
    </StyledButton>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export default Menu;
