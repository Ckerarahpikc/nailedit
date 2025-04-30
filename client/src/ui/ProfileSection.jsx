import {
  HiMiniArrowRightOnRectangle,
  HiCog6Tooth,
  HiChartBar,
} from "react-icons/hi2";
import styled from "styled-components";

import Menu from "./Menu";
import SpinnerMini from "./SpinnerMini";
import useLogout from "../elements/authentication/useLogout";
import useSession from "../elements/authentication/useSession";
import { useNavigate } from "react-router-dom";

const Img = styled.img`
  position: absolute;
  display: flex;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  transition: all 400ms ease;
  background-color: var(--color-deep-brown);

  &:is(:hover, :focus) {
    border: 1px solid var(--color-deep-brown);
  }
`;

function ProfileSection() {
  const navigate = useNavigate();
  const { user, isLoadingUser } = useSession();
  const { logout } = useLogout();

  function hello() {
    console.log("was clicked");
  }

  return (
    <Menu>
      <Menu.Toggle id="profile-section">
        {isLoadingUser ? (
          <SpinnerMini />
        ) : (
          <Img size="small" src={`/src/assets/images/${user.photo}`} />
        )}
      </Menu.Toggle>

      <Menu.List id="profile-section">
        <Menu.Button
          onClick={() => navigate("/settings")}
          icon={<HiCog6Tooth size={18} />}
        >
          Settings
        </Menu.Button>

        <Menu.Button onClick={hello} icon={<HiChartBar size={18} />}>
          Stats
        </Menu.Button>

        <Menu.Button
          onClick={logout}
          icon={<HiMiniArrowRightOnRectangle size={18} />}
        >
          Logout
        </Menu.Button>
      </Menu.List>
    </Menu>
  );
}

//   return !isLoadingLogout ? (
//     <Button size="large" variation="regular" onClick={logout}>
//       <HiOutlineArrowRightStartOnRectangle />
//     </Button>
//   ) : (
//     <SpinnerMini />
//   );

export default ProfileSection;
