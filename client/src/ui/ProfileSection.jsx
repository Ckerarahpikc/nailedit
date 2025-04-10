import useLogout from "../elements/sign-in-out/useLogout";
import SpinnerMini from "../components/SpinnerMini";

import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";
import Button from "../components/Button";

function ProfileSection() {
  const { logout, isLoadingLogout } = useLogout();
  return (
      {!isLoadingLogout ? (
        <ListItem>
          <Button size="large" variation="regular" onClick={logout}>
            <HiOutlineArrowRightStartOnRectangle />
          </Button>
        </ListItem>
      ) : (
        <SpinnerMini />
      )}
  );
}

export default ProfileSection;
