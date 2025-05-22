import {
  HiMiniArrowRightOnRectangle,
  HiCog6Tooth,
  HiChartBar,
} from "react-icons/hi2";
import styled from "styled-components";

import Menu from "./Menu";
import useLogout from "../elements/authentication/useLogout";
import { useNavigate } from "react-router-dom";
import { URL_ADDRESS } from "../utils/constants";
import { useProtectedContext } from "../hooks/useProtectedContext";

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

function HeadingProfileSection() {
  const navigate = useNavigate();
  const { sessionData } = useProtectedContext();
  const { logout } = useLogout();

  function hello() {
    console.log("was clicked");
  }

  return (
    <Menu>
      <Menu.Toggle id="profile-section">
        <Img
          size="small"
          src={`${URL_ADDRESS}/uploads/${sessionData.photo}`}
          title={sessionData.name}
        />
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

export default HeadingProfileSection;
