import useLogout from "../elements/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";

import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";
import Button from "./Button";

function ProfileSection() {
  const { logout, isLoadingLogout } = useLogout();

  return !isLoadingLogout ? (
    <Button size="large" variation="regular" onClick={logout}>
      <HiOutlineArrowRightStartOnRectangle />
    </Button>
  ) : (
    <SpinnerMini />
  );
}

export default ProfileSection;
