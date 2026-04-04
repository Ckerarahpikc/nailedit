import styled from "styled-components";
import {
  HiUser,
  HiLockClosed,
  HiSquares2X2,
  HiSwatch,
  HiChartBar,
  HiInformationCircle,
  HiDocumentText,
} from "react-icons/hi2";

import DropdownItem from "../../ui/DropdownItem";
import Paragraph from "../../ui/Paragraph";
import Heading from "../../ui/Heading";
import PersonalInformation from "./PersonalInformation";
import LinkIcon from "../../ui/LinkIcon";

const StyledProfilePage = styled.div`
  width: 100%;
  height: 100%;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85vh;
  padding: 2rem;
`;

const UnorderedList = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: 1.5rem;
`;

const ListItem = styled.li`
  margin: 1rem 0;
`;

const HeadingItem = styled(Heading)`
  color: var(--color-grey-700);
`;

const NavigationPaths = styled.div`
  width: 30%;
  height: 100%;
  background-color: var(--color-grey-100);
  padding: 2rem;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NavigationContent = styled.div`
  width: 65%;
  height: 100%;
  background-color: var(--color-grey-100);
  padding: 2rem;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

function ProfileNavigation() {
  return (
    <StyledProfilePage>
      <NavigationContainer>
        <NavigationPaths>
          <DropdownItem dropDownName="Profile">
            <UnorderedList>
              <ListItem>
                <LinkIcon href="#personal-info" icon={<HiUser />}>
                  Personal Information
                </LinkIcon>
              </ListItem>
              <ListItem>
                <LinkIcon href="#sensitive-info" icon={<HiLockClosed />}>
                  Sensitive Information
                </LinkIcon>
              </ListItem>
            </UnorderedList>
          </DropdownItem>

          <DropdownItem dropDownName="Appearance">
            <UnorderedList>
              <ListItem>
                <LinkIcon href="#layout" icon={<HiSquares2X2 />}>
                  Layout
                </LinkIcon>
              </ListItem>
              <ListItem>
                <LinkIcon href="#appearance" icon={<HiSwatch />}>
                  Colors
                </LinkIcon>
              </ListItem>
            </UnorderedList>
          </DropdownItem>

          <DropdownItem dropDownName="Statistics">
            <UnorderedList>
              <ListItem>
                <LinkIcon href="#stats" icon={<HiChartBar />}>
                  Stats
                </LinkIcon>
              </ListItem>
            </UnorderedList>
          </DropdownItem>

          <DropdownItem dropDownName="Other">
            <UnorderedList>
              <ListItem>
                <LinkIcon href="#aboutus" icon={<HiInformationCircle />}>
                  About
                </LinkIcon>
              </ListItem>
              <ListItem>
                <LinkIcon href="#policy" icon={<HiDocumentText />}>
                  Private Policy
                </LinkIcon>
              </ListItem>
            </UnorderedList>
          </DropdownItem>
        </NavigationPaths>

        <NavigationContent>
          <section id="personal-info">
            <PersonalInformation />
          </section>
          <section id="sensitive-info">
            <HeadingItem type="h1">Sensitive Information</HeadingItem>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              fermentum et ligula vel facilisis. Ut neque magna, semper vel
              fermentum id, viverra sed elit. Duis sagittis lobortis
              pellentesque. Ut enim urna, tempus id erat pulvinar, auctor
              dapibus diam. Aliquam vel magna aliquam, varius justo in, accumsan
              diam. Aliquam quis commodo velit. Etiam ut diam faucibus justo
              efficitur facilisis. Aliquam eget ipsum vitae nulla iaculis
              condimentum sit amet tincidunt massa. Mauris auctor malesuada
              nunc, eu vulputate quam auctor sed. Aliquam sapien sem, venenatis
              at odio non, commodo hendrerit risus.
            </Paragraph>
            <HeadingItem type="h3">Other Informations</HeadingItem>
            <Paragraph>
              Etiam iaculis, felis nec mattis sodales, diam lectus semper
              mauris, nec rutrum lacus lorem sit amet ex. Duis aliquam at ipsum
              sed aliquet. Nam quis ante vitae lacus viverra semper. Fusce quis
              magna ultrices, rutrum nunc ac, faucibus velit. Sed vulputate
              cursus augue, eu feugiat ligula aliquet sit amet. Nulla facilisi.
              Cras tincidunt turpis augue, sit amet eleifend mauris blandit a.
              Maecenas id ex nec nisl aliquam rutrum. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Vestibulum blandit ante vel erat commodo ultricies. In id
              pretium mauris, non eleifend massa. Fusce placerat sapien sit amet
              dolor blandit ullamcorper. Aenean facilisis in erat eget commodo.
              Mauris vitae rhoncus justo.
            </Paragraph>
          </section>
          <section id="personal-settings">
            <HeadingItem type="h3">Personal Settings</HeadingItem>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              fermentum et ligula vel facilisis. Ut neque magna, semper vel
              fermentum id, viverra sed elit. Duis sagittis lobortis
              pellentesque. Ut enim urna, tempus id erat pulvinar, auctor
              dapibus diam. Aliquam vel magna aliquam, varius justo in, accumsan
              diam. Aliquam quis commodo velit. Etiam ut diam faucibus justo
              efficitur facilisis. Aliquam eget ipsum vitae nulla iaculis
              condimentum sit amet tincidunt massa. Mauris auctor malesuada
              nunc, eu vulputate quam auctor sed. Aliquam sapien sem, venenatis
              at odio non, commodo hendrerit risus.
            </Paragraph>
            <HeadingItem type="h3">Other Settings</HeadingItem>
            <Paragraph>
              Etiam iaculis, felis nec mattis sodales, diam lectus semper
              mauris, nec rutrum lacus lorem sit amet ex. Duis aliquam at ipsum
              sed aliquet. Nam quis ante vitae lacus viverra semper. Fusce quis
              magna ultrices, rutrum nunc ac, faucibus velit. Sed vulputate
              cursus augue, eu feugiat ligula aliquet sit amet. Nulla facilisi.
              Cras tincidunt turpis augue, sit amet eleifend mauris blandit a.
              Maecenas id ex nec nisl aliquam rutrum. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Vestibulum blandit ante vel erat commodo ultricies. In id
              pretium mauris, non eleifend massa. Fusce placerat sapien sit amet
              dolor blandit ullamcorper. Aenean facilisis in erat eget commodo.
              Mauris vitae rhoncus justo.
            </Paragraph>
          </section>
          <section id="sensitive-settings">
            <HeadingItem type="h3">Sensitive Settings</HeadingItem>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              fermentum et ligula vel facilisis. Ut neque magna, semper vel
              fermentum id, viverra sed elit. Duis sagittis lobortis
              pellentesque. Ut enim urna, tempus id erat pulvinar, auctor
              dapibus diam. Aliquam vel magna aliquam, varius justo in, accumsan
              diam. Aliquam quis commodo velit. Etiam ut diam faucibus justo
              efficitur facilisis. Aliquam eget ipsum vitae nulla iaculis
              condimentum sit amet tincidunt massa. Mauris auctor malesuada
              nunc, eu vulputate quam auctor sed. Aliquam sapien sem, venenatis
              at odio non, commodo hendrerit risus.
            </Paragraph>
            <HeadingItem type="h3">Other Settings</HeadingItem>
            <Paragraph>
              Etiam iaculis, felis nec mattis sodales, diam lectus semper
              mauris, nec rutrum lacus lorem sit amet ex. Duis aliquam at ipsum
              sed aliquet. Nam quis ante vitae lacus viverra semper. Fusce quis
              magna ultrices, rutrum nunc ac, faucibus velit. Sed vulputate
              cursus augue, eu feugiat ligula aliquet sit amet. Nulla facilisi.
              Cras tincidunt turpis augue, sit amet eleifend mauris blandit a.
              Maecenas id ex nec nisl aliquam rutrum. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Vestibulum blandit ante vel erat commodo ultricies. In id
              pretium mauris, non eleifend massa. Fusce placerat sapien sit amet
              dolor blandit ullamcorper. Aenean facilisis in erat eget commodo.
              Mauris vitae rhoncus justo.
            </Paragraph>
          </section>
          <section id="layout">
            <HeadingItem type="h1">Layout</HeadingItem>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              fermentum et ligula vel facilisis. Ut neque magna, semper vel
              fermentum id, viverra sed elit. Duis sagittis lobortis
              pellentesque. Ut enim urna, tempus id erat pulvinar, auctor
              dapibus diam. Aliquam vel magna aliquam, varius justo in, accumsan
              diam. Aliquam quis commodo velit. Etiam ut diam faucibus justo
              efficitur facilisis. Aliquam eget ipsum vitae nulla iaculis
              condimentum sit amet tincidunt massa. Mauris auctor malesuada
              nunc, eu vulputate quam auctor sed. Aliquam sapien sem, venenatis
              at odio non, commodo hendrerit risus.
            </Paragraph>
            <HeadingItem type="h3">Layout Info</HeadingItem>
            <Paragraph>
              Etiam iaculis, felis nec mattis sodales, diam lectus semper
              mauris, nec rutrum lacus lorem sit amet ex. Duis aliquam at ipsum
              sed aliquet. Nam quis ante vitae lacus viverra semper. Fusce quis
              magna ultrices, rutrum nunc ac, faucibus velit. Sed vulputate
              cursus augue, eu feugiat ligula aliquet sit amet. Nulla facilisi.
              Cras tincidunt turpis augue, sit amet eleifend mauris blandit a.
              Maecenas id ex nec nisl aliquam rutrum. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Vestibulum blandit ante vel erat commodo ultricies. In id
              pretium mauris, non eleifend massa. Fusce placerat sapien sit amet
              dolor blandit ullamcorper. Aenean facilisis in erat eget commodo.
              Mauris vitae rhoncus justo.
            </Paragraph>
          </section>
          <section id="appearance">
            <HeadingItem type="h1">Appearance</HeadingItem>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              fermentum et ligula vel facilisis. Ut neque magna, semper vel
              fermentum id, viverra sed elit. Duis sagittis lobortis
              pellentesque. Ut enim urna, tempus id erat pulvinar, auctor
              dapibus diam. Aliquam vel magna aliquam, varius justo in, accumsan
              diam. Aliquam quis commodo velit. Etiam ut diam faucibus justo
              efficitur facilisis. Aliquam eget ipsum vitae nulla iaculis
              condimentum sit amet tincidunt massa. Mauris auctor malesuada
              nunc, eu vulputate quam auctor sed. Aliquam sapien sem, venenatis
              at odio non, commodo hendrerit risus.
            </Paragraph>
            <HeadingItem type="h3">Appearance Information</HeadingItem>
            <Paragraph>
              Etiam iaculis, felis nec mattis sodales, diam lectus semper
              mauris, nec rutrum lacus lorem sit amet ex. Duis aliquam at ipsum
              sed aliquet. Nam quis ante vitae lacus viverra semper. Fusce quis
              magna ultrices, rutrum nunc ac, faucibus velit. Sed vulputate
              cursus augue, eu feugiat ligula aliquet sit amet. Nulla facilisi.
              Cras tincidunt turpis augue, sit amet eleifend mauris blandit a.
              Maecenas id ex nec nisl aliquam rutrum. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Vestibulum blandit ante vel erat commodo ultricies. In id
              pretium mauris, non eleifend massa. Fusce placerat sapien sit amet
              dolor blandit ullamcorper. Aenean facilisis in erat eget commodo.
              Mauris vitae rhoncus justo.
            </Paragraph>
          </section>
          <section id="stats">
            <HeadingItem type="h1">Statistics</HeadingItem>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              fermentum et ligula vel facilisis. Ut neque magna, semper vel
              fermentum id, viverra sed elit. Duis sagittis lobortis
              pellentesque. Ut enim urna, tempus id erat pulvinar, auctor
              dapibus diam. Aliquam vel magna aliquam, varius justo in, accumsan
              diam. Aliquam quis commodo velit. Etiam ut diam faucibus justo
              efficitur facilisis. Aliquam eget ipsum vitae nulla iaculis
              condimentum sit amet tincidunt massa. Mauris auctor malesuada
              nunc, eu vulputate quam auctor sed. Aliquam sapien sem, venenatis
              at odio non, commodo hendrerit risus.
            </Paragraph>
            <HeadingItem type="h3">Statistics Information</HeadingItem>
            <Paragraph>
              Etiam iaculis, felis nec mattis sodales, diam lectus semper
              mauris, nec rutrum lacus lorem sit amet ex. Duis aliquam at ipsum
              sed aliquet. Nam quis ante vitae lacus viverra semper. Fusce quis
              magna ultrices, rutrum nunc ac, faucibus velit. Sed vulputate
              cursus augue, eu feugiat ligula aliquet sit amet. Nulla facilisi.
              Cras tincidunt turpis augue, sit amet eleifend mauris blandit a.
              Maecenas id ex nec nisl aliquam rutrum. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Vestibulum blandit ante vel erat commodo ultricies. In id
              pretium mauris, non eleifend massa. Fusce placerat sapien sit amet
              dolor blandit ullamcorper. Aenean facilisis in erat eget commodo.
              Mauris vitae rhoncus justo.
            </Paragraph>
          </section>
          <section id="aboutus">
            <HeadingItem type="h1">About Us</HeadingItem>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              fermentum et ligula vel facilisis. Ut neque magna, semper vel
              fermentum id, viverra sed elit. Duis sagittis lobortis
              pellentesque. Ut enim urna, tempus id erat pulvinar, auctor
              dapibus diam. Aliquam vel magna aliquam, varius justo in, accumsan
              diam. Aliquam quis commodo velit. Etiam ut diam faucibus justo
              efficitur facilisis. Aliquam eget ipsum vitae nulla iaculis
              condimentum sit amet tincidunt massa. Mauris auctor malesuada
              nunc, eu vulputate quam auctor sed. Aliquam sapien sem, venenatis
              at odio non, commodo hendrerit risus.
            </Paragraph>
            <HeadingItem type="h3">About Us Information</HeadingItem>
            <Paragraph>
              Etiam iaculis, felis nec mattis sodales, diam lectus semper
              mauris, nec rutrum lacus lorem sit amet ex. Duis aliquam at ipsum
              sed aliquet. Nam quis ante vitae lacus viverra semper. Fusce quis
              magna ultrices, rutrum nunc ac, faucibus velit. Sed vulputate
              cursus augue, eu feugiat ligula aliquet sit amet. Nulla facilisi.
              Cras tincidunt turpis augue, sit amet eleifend mauris blandit a.
              Maecenas id ex nec nisl aliquam rutrum. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Vestibulum blandit ante vel erat commodo ultricies. In id
              pretium mauris, non eleifend massa. Fusce placerat sapien sit amet
              dolor blandit ullamcorper. Aenean facilisis in erat eget commodo.
              Mauris vitae rhoncus justo.
            </Paragraph>
          </section>
          <section id="policy">
            <HeadingItem type="h1">Private Policy</HeadingItem>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              fermentum et ligula vel facilisis. Ut neque magna, semper vel
              fermentum id, viverra sed elit. Duis sagittis lobortis
              pellentesque. Ut enim urna, tempus id erat pulvinar, auctor
              dapibus diam. Aliquam vel magna aliquam, varius justo in, accumsan
              diam. Aliquam quis commodo velit. Etiam ut diam faucibus justo
              efficitur facilisis. Aliquam eget ipsum vitae nulla iaculis
              condimentum sit amet tincidunt massa. Mauris auctor malesuada
              nunc, eu vulputate quam auctor sed. Aliquam sapien sem, venenatis
              at odio non, commodo hendrerit risus.
            </Paragraph>
            <HeadingItem type="h3">
              Terms and Conditions Information
            </HeadingItem>
            <Paragraph>
              Etiam iaculis, felis nec mattis sodales, diam lectus semper
              mauris, nec rutrum lacus lorem sit amet ex. Duis aliquam at ipsum
              sed aliquet. Nam quis ante vitae lacus viverra semper. Fusce quis
              magna ultrices, rutrum nunc ac, faucibus velit. Sed vulputate
              cursus augue, eu feugiat ligula aliquet sit amet. Nulla facilisi.
              Cras tincidunt turpis augue, sit amet eleifend mauris blandit a.
              Maecenas id ex nec nisl aliquam rutrum. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Vestibulum blandit ante vel erat commodo ultricies. In id
              pretium mauris, non eleifend massa. Fusce placerat sapien sit amet
              dolor blandit ullamcorper. Aenean facilisis in erat eget commodo.
              Mauris vitae rhoncus justo.
            </Paragraph>
          </section>
        </NavigationContent>
      </NavigationContainer>
    </StyledProfilePage>
  );
}
export default ProfileNavigation;
