import { useNavigate } from "react-router-dom";

import PngLogoWhite from "../assets/logoWhite.png";
import PngLogoDark from "../assets/logoDark.png";
import PngOnlyLogoWhite from "../assets/onlyLogoWhite.png";
import PngOnlyLogoDark from "../assets/onlyLogoDark.png";
import PngOnlyTextWhite from "../assets/onlyTextWhite.png";
import PngOnlyTextDark from "../assets/onlyTextDark.png";
import StyledImage from "../ui/StyledImage";

const logoType = {
  whole: {
    white: PngLogoWhite,
    dark: PngLogoDark,
  },
  icon: {
    white: PngOnlyLogoWhite,
    dark: PngOnlyLogoDark,
  },
  text: {
    white: PngOnlyTextWhite,
    dark: PngOnlyTextDark,
  },
};

function Logo({
  theme = "dark",
  size = "medium",
  appearance = "whole",
  events = false,
}) {
  const navigate = useNavigate();
  const logoSrc = logoType[appearance][theme];

  function goToHome() {
    if (!events) return;

    navigate("/", { replace: true });
  }

  return (
    <StyledImage
      src={logoSrc}
      size={size}
      alt="NailedIt Logo :]"
      onClick={goToHome}
    />
  );
}

export default Logo;
