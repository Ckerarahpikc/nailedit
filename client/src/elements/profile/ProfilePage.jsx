import styled from "styled-components";
import NavigationPathLayout from "../../ui/NavigationPathLayout";

const StyledProfilePage = styled.div`
  width: 100%;
  height: 100%;
`;
// review: there will be left section that holds navigation and right section which holds the actual content

function ProfilePage() {
  return (
    <StyledProfilePage>
      <NavigationPathLayout />
    </StyledProfilePage>
  );
}

export default ProfilePage;
