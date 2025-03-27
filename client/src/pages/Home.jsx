import styled, { css } from "styled-components";
import ImageRoyalHands from "../assets/home/royalhands.jpg";
import ImageBookHands from "../assets/home/booknails.jpg";
import ImageElephant from "../assets/home/elephantonbooks.jpg";
import Heading from "../components/Heading";
import Button from "../components/Button";

const StyledHomePage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  height: 93rem;
  width: 100%;
`;

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 40% 30%;
  filter: brightness(60%);
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
              <Button size="large" variation="primary">
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
        <Img src={ImageElephant} alt="Royal Hands" />
        <SectionContent>
          <div>
            <img src={ImageBookHands} alt="Hands on book." width="auto" />
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
