import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Section from "../ui/Section";

import ImageRoyalHands from "../assets/images/royalhands.jpg";
import ImageSimpleHand from "../assets/images/simplehand.jpg";
import ImageElephant from "../assets/images/elephantonbooks.jpg";
import Logo from "../ui/Logo";

const StyledHomePage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 40% 30%;
  filter: brightness(60%);
  user-select: none;
`;

const SectionContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  margin: 5rem;
  word-break: balance;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  column-gap: 5rem;

  & > div {
    display: grid;
    row-gap: 5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
`;

function Home() {
  const navigate = useNavigate();

  return (
    <StyledHomePage>
      <Section>
        <Img src={ImageRoyalHands} alt="Royal Hands" />
        <SectionContent>
          <div>
            <div>
              <Heading type="h1">In et nunc in.</Heading>
              <Heading type="h4">
                In molestie convallis risus sit amet pharetra. Sed bibendum
                neque nec dolor vulputate pharetra. Donec suscipit purus at
                magna luctus accumsan. Integer efficitur fermentum libero, vitae
                faucibus tellus ornare id.
              </Heading>
            </div>

            <ButtonContainer>
              <Button
                size="large"
                variation="primary"
                onClick={() => navigate("/profile", { replace: true })}
              >
                Try Now
              </Button>
              <Button size="large" variation="regular">
                Join Us Today
              </Button>
            </ButtonContainer>
          </div>
          <div></div>
        </SectionContent>
      </Section>

      <Section>
        <Img src={ImageElephant} alt="Minimalistic Elephant" />
        <SectionContent>
          <div>
            <img src={ImageSimpleHand} alt="Simple Hands" width="auto" />
          </div>
          <div>
            <Heading type="h1">In et nunc in.</Heading>
            <Heading type="h4">
              In molestie convallis risus sit amet pharetra. Sed bibendum neque
              nec dolor vulputate pharetra. Donec suscipit purus at magna luctus
              accumsan. Integer efficitur fermentum libero, vitae faucibus
              tellus ornare id.
            </Heading>
          </div>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <div>
            <Heading type="h1">In et nunc in.</Heading>
            <Heading type="h4">
              In molestie convallis risus sit amet pharetra. Sed bibendum neque
              nec dolor vulputate pharetra. Donec suscipit purus at magna luctus
              accumsan. Integer efficitur fermentum libero, vitae faucibus
              tellus ornare id.
            </Heading>
          </div>
          <div></div>
        </SectionContent>
      </Section>
    </StyledHomePage>
  );
}

export default Home;
