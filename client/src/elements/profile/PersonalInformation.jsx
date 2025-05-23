import { useState } from "react";
import styled, { css } from "styled-components";

import Heading from "../../ui/Heading";
import Paragraph from "../../ui/Paragraph";
import Button from "../../ui/Button";
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
  const { sessionData } = useProtectedContext();
  const { updateCurrentUser, isUpdatingUser } = useUpdateCurrentUser();
  const [name, setNewName] = useState(sessionData.name || "");
  const [email, setNewEmail] = useState(sessionData.email || "");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // useEffect(() => {
  //   if (state !== "loading") {
  //     setNewName(sessionData.name);
  //     setNewEmail(sessionData.email);
  //     setImageFile(sessionData.photo);
  //   }
  // }, [state, sessionData]);

  const { status, createdAt, updatedAt } = sessionData;
  const createdAtFormat = new Date(createdAt).toLocaleDateString("ru-RU");
  const updatedAtFormat = new Date(updatedAt).toLocaleDateString("ru-RU");

  function handleSubmit() {
    if (!name && !email && !photo) return;
    updateCurrentUser({ name, email, photo });
  }

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
            onChange={(e) => {
              setPhoto(e.target.files[0]);
              setPreviewImage(URL.createObjectURL(e.target.files[0]));
            }}
            disabled={isUpdatingUser}
          />
        </RowContent>

        <RowContent>
          <Button
            onClick={() => handleSubmit()}
            // disabled={isUpdatingUser}
            size="medium"
            variation="regular"
          >
            {isUpdatingUser ? <SpinnerMini /> : "Submit"}
          </Button>
        </RowContent>

        <RowContent>
          <Paragraph>
            Account created at: <b>{createdAtFormat}</b>
          </Paragraph>

          <Paragraph>
            Account updated at: <b>{updatedAtFormat}</b>
          </Paragraph>
        </RowContent>
      </IndentedContent>
    </>
  );
}

export default PersonalInformation;
