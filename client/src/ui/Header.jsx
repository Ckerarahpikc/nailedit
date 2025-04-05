import styled from "styled-components";
import { Link } from "react-router-dom";

import Logo from "../components/Logo";
import { useEffect, useState } from "react";

const StyledHeader = styled.header`
  width: 100%;
  height: 85px;

  background-color: var(--color-soft-pink);

  display: flex;
  align-items: center;
  color: var(--color-grey-800);
  font-family: "Playfair Display", sans-serif;

  top: ${(props) => (props.isvisible ? "0" : "-85px")};
  transition: all 400ms ease;
`;

const UnorderedList = styled.ul`
  width: 100%;
  display: block;
  text-align: center;
`;
const ListItem = styled.li`
  display: inline-block;
  margin: 0 2rem;
  font-size: 2rem;

  & > * {
    color: var(--color-deep-brown);
  }

  &:is(:hover, :focus) {
    outline: none;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: var(--color-deep-brown);
  }
`;

function Header() {
  // const [isVisible, setIsVisible] = useState(false);
  // const [lastScrollY, setLastScrollY] = useState(0);

  // useEffect(
  //   function () {
  //     function handleScrollHeader() {
  //       const currentScrollY = window.scrollY;

  //       if (currentScrollY > lastScrollY && currentScrollY > 100) {
  //         setIsVisible(true);
  //       } else {
  //         setIsVisible(false);
  //       }

  //       setLastScrollY(currentScrollY);
  //     }

  //     window.addEventListener("scroll", handleScrollHeader);

  //     return () => window.removeEventListener("scroll", handleScrollHeader);
  //   },
  //   [lastScrollY]
  // );

  return (
    <StyledHeader>
      <UnorderedList>
        <ListItem>
          <Link to="/">Home</Link>
        </ListItem>
        <ListItem>
          <Link to="/profile">Profile</Link>
        </ListItem>
        <ListItem>
          <Link to="/works">Works</Link>
        </ListItem>
      </UnorderedList>

      <Logo />

      <UnorderedList>
        <ListItem>
          <Link to="/service">Service</Link>
        </ListItem>
        <ListItem>
          <Link to="/resources">Resources</Link>
        </ListItem>
        <ListItem>
          <Link to="/help">Help</Link>
        </ListItem>
      </UnorderedList>
    </StyledHeader>
  );
}

export default Header;
