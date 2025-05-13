import { useState } from "react";
import styled, { css } from "styled-components";

import Heading from "../../ui/Heading";
import Paragraph from "../../ui/Paragraph";
import Spinner from "../../ui/Spinner";
import Input from "../../ui/Input";
import IndentedContent from "../../ui/IndentedContent";

import SpinnerMini from "../../ui/SpinnerMini";
import useUpdateCurrentUser from "./useUpdateCurrentUser";
import { useProtectedContext } from "../../hooks/useProtectedContext";

const HeadingItem = styled(Heading)`
  color: var(--color-grey-700);
`;

const InputField = styled(Input)`
  border: 1px solid var(--color-grey-800);
  max-width: 400px;
`;

const RowContent = styled.div`
  display: flex;
  font-family: "Lato", sans-serif;

  ${(props) =>
    props.type === "horizontal"
      ? css`
          align-items: center;
          gap: 1rem;
        `
      : css`
          flex-direction: column;
          gap: 1rem;
        `}
`;

function PersonalInformation() {
  const { user, isLoadingUser } = useProtectedContext();
  const { updateCurrentUser, isUpdatingUser } = useUpdateCurrentUser();
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState("");
  // const [previewImage, setPreviewImage] = useState("");

  if (isLoadingUser) return <Spinner />;

  const { name, email, status, createdAt, updatedAt } = user;
  const createdAtFormat = new Date(createdAt).toLocaleDateString("ru-RU");
  const updatedAtFormat = new Date(updatedAt).toLocaleDateString("ru-RU");

  function handleSubmit() {
    updateCurrentUser({ newName, newEmail, imageFile });
  }

  // function updateImage(e) {
  //   const selectedImage = e.target.files[0];
  //   const formData = new FormData();

  //   formData.append("photo", selectedImage);
  //   updatePicture(formData);
  // }

  return (
    <>
      <HeadingItem type="h2">Personal Information</HeadingItem>
      <IndentedContent>
        <RowContent type="horizontal">
          <Paragraph>Name:</Paragraph>
          <b>
            <InputField
              type="text"
              value={name}
              onChange={(e) => setNewName(e.target.value)}
              disabled={isUpdatingUser}
            />
          </b>
        </RowContent>

        <RowContent type="horizontal">
          <Paragraph>Email:</Paragraph>
          <b>
            <InputField
              type="text"
              value={email}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={isUpdatingUser}
            />
          </b>
        </RowContent>

        <RowContent type="horizontal">
          <Paragraph>Update Profile Picture:</Paragraph>
          <InputField
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            disabled={isUpdatingUser}
          />
        </RowContent>

        <Button onClick={() => handleSubmit()} disabled={isUpdatingUser}>
          {isUpdatingUser ? <SpinnerMini /> : "Submit"}
        </Button>

        <Paragraph>
          Account created at: <b>{createdAtFormat}</b>
        </Paragraph>

        <Paragraph>
          Account updated at: <b>{updatedAtFormat}</b>
        </Paragraph>
      </IndentedContent>
    </>
  );
}

export default PersonalInformation;
