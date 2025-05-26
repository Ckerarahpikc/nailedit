import { useState, useContext, createContext } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";

const ModalContext = createContext();

const styledContent = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};
const StyledModalBox = styled.div`
  background-color: var(--color-soft-white);
  border: 1px solid var(--color-brand-100);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem;
  max-width: 48rem;
  width: 90%;
  margin: 0 auto;
  position: relative;

  h2 {
    color: var(--color-brand-700);
    margin-bottom: 1.6rem;
    font-size: 2.2rem;
    font-weight: 600;
  }

  p {
    color: var(--color-grey-700);
    margin-bottom: 1.2rem;
    font-size: 1.6rem;
  }

  button {
    background-color: var(--color-brand-500);
    color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    font-weight: 600;

    &:hover {
      background-color: var(--color-brand-600);
    }
  }
`;

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const showModal = (content) => {
    setIsOpen(true);
    setModalContent(content);
  };

  const hideModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal open={isOpen} onClose={hideModal}>
        <div style={styledContent}>
          <StyledModalBox>{modalContent}</StyledModalBox>
        </div>
      </Modal>
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
