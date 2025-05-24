import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const StyledConfirmModal = styled(Box)`
  width: 40rem;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  z-index: 9999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export default function ConfirmModal({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  state,
}) {
  const isToDelete = state === "delete";

  return (
    <Modal open={true} onClose={onCloseModal}>
      <StyledConfirmModal>
        <Heading as="h3">
          {isToDelete ? "Delete" : "Save"} {resourceName}
        </Heading>
        <p>
          {isToDelete
            ? `Are you sure you want to delete "${resourceName}" permanently? This action cannot be undone.`
            : `Are you sure you want to save "${resourceName}"?`}
        </p>

        <div>
          <Button
            variation="primary"
            size="medium"
            disabled={disabled}
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button
            variation={isToDelete ? "danger" : "regular"}
            size="medium"
            disabled={disabled}
            onClick={onConfirm}
          >
            {isToDelete ? "Delete" : "Save"}
          </Button>
        </div>
      </StyledConfirmModal>
    </Modal>
  );
}
