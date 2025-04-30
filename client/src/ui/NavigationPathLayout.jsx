import styled from "styled-components";

import DropdownItem from "./DropdownItem";
import Paragraph from "./Paragraph";
import Heading from "../ui/Heading";

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

  & > a {
    color: var(--color-grey-700);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
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
  padding: 2rem;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

function NavigationPathLayout() {
  return (
    <NavigationContainer>
      <NavigationPaths>
        <DropdownItem dropDownName="Profile">
          <UnorderedList>
            <ListItem>
              <a href="#personal-info">Personal Information</a>
            </ListItem>
            <ListItem>
              <a href="#sensitive-info">Sensitive Information</a>
            </ListItem>
            <ListItem>
              <DropdownItem dropDownName="Update Settings">
                <ListItem>
                  <a href="#personal-settings">Personal Settings</a>
                </ListItem>
                <ListItem>
                  <a href="#sensitive-settings">Sensitive Settings</a>
                </ListItem>
              </DropdownItem>
            </ListItem>
          </UnorderedList>
        </DropdownItem>

        <DropdownItem dropDownName="Appearance">
          <UnorderedList>
            <ListItem>
              <a href="#layout">Layout</a>
            </ListItem>
            <ListItem>
              <a href="#appearance">Colors</a>
            </ListItem>
          </UnorderedList>
        </DropdownItem>
      </NavigationPaths>

      <NavigationContent>
        <section id="personal-info">
          <HeadingItem type="h1">Personal Information</HeadingItem>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            fermentum et ligula vel facilisis. Ut neque magna, semper vel
            fermentum id, viverra sed elit. Duis sagittis lobortis pellentesque.
            Ut enim urna, tempus id erat pulvinar, auctor dapibus diam. Aliquam
            vel magna aliquam, varius justo in, accumsan diam. Aliquam quis
            commodo velit. Etiam ut diam faucibus justo efficitur facilisis.
            Aliquam eget ipsum vitae nulla iaculis condimentum sit amet
            tincidunt massa. Mauris auctor malesuada nunc, eu vulputate quam
            auctor sed. Aliquam sapien sem, venenatis at odio non, commodo
            hendrerit risus.
          </Paragraph>
          <HeadingItem type="h3">Other Informations</HeadingItem>
          <Paragraph>
            Etiam iaculis, felis nec mattis sodales, diam lectus semper mauris,
            nec rutrum lacus lorem sit amet ex. Duis aliquam at ipsum sed
            aliquet. Nam quis ante vitae lacus viverra semper. Fusce quis magna
            ultrices, rutrum nunc ac, faucibus velit. Sed vulputate cursus
            augue, eu feugiat ligula aliquet sit amet. Nulla facilisi. Cras
            tincidunt turpis augue, sit amet eleifend mauris blandit a. Maecenas
            id ex nec nisl aliquam rutrum. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Vestibulum
            blandit ante vel erat commodo ultricies. In id pretium mauris, non
            eleifend massa. Fusce placerat sapien sit amet dolor blandit
            ullamcorper. Aenean facilisis in erat eget commodo. Mauris vitae
            rhoncus justo.
          </Paragraph>
        </section>
        <section id="sensitive-info">
          <HeadingItem type="h1">Sensitive Information</HeadingItem>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            fermentum et ligula vel facilisis. Ut neque magna, semper vel
            fermentum id, viverra sed elit. Duis sagittis lobortis pellentesque.
            Ut enim urna, tempus id erat pulvinar, auctor dapibus diam. Aliquam
            vel magna aliquam, varius justo in, accumsan diam. Aliquam quis
            commodo velit. Etiam ut diam faucibus justo efficitur facilisis.
            Aliquam eget ipsum vitae nulla iaculis condimentum sit amet
            tincidunt massa. Mauris auctor malesuada nunc, eu vulputate quam
            auctor sed. Aliquam sapien sem, venenatis at odio non, commodo
            hendrerit risus.
          </Paragraph>
          <HeadingItem type="h3">Other Informations</HeadingItem>
          <Paragraph>
            Etiam iaculis, felis nec mattis sodales, diam lectus semper mauris,
            nec rutrum lacus lorem sit amet ex. Duis aliquam at ipsum sed
            aliquet. Nam quis ante vitae lacus viverra semper. Fusce quis magna
            ultrices, rutrum nunc ac, faucibus velit. Sed vulputate cursus
            augue, eu feugiat ligula aliquet sit amet. Nulla facilisi. Cras
            tincidunt turpis augue, sit amet eleifend mauris blandit a. Maecenas
            id ex nec nisl aliquam rutrum. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Vestibulum
            blandit ante vel erat commodo ultricies. In id pretium mauris, non
            eleifend massa. Fusce placerat sapien sit amet dolor blandit
            ullamcorper. Aenean facilisis in erat eget commodo. Mauris vitae
            rhoncus justo.
          </Paragraph>
        </section>
        <section id="personal-settings">
          <HeadingItem type="h3">Personal Settings</HeadingItem>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            fermentum et ligula vel facilisis. Ut neque magna, semper vel
            fermentum id, viverra sed elit. Duis sagittis lobortis pellentesque.
            Ut enim urna, tempus id erat pulvinar, auctor dapibus diam. Aliquam
            vel magna aliquam, varius justo in, accumsan diam. Aliquam quis
            commodo velit. Etiam ut diam faucibus justo efficitur facilisis.
            Aliquam eget ipsum vitae nulla iaculis condimentum sit amet
            tincidunt massa. Mauris auctor malesuada nunc, eu vulputate quam
            auctor sed. Aliquam sapien sem, venenatis at odio non, commodo
            hendrerit risus.
          </Paragraph>
          <HeadingItem type="h3">Other Settings</HeadingItem>
          <Paragraph>
            Etiam iaculis, felis nec mattis sodales, diam lectus semper mauris,
            nec rutrum lacus lorem sit amet ex. Duis aliquam at ipsum sed
            aliquet. Nam quis ante vitae lacus viverra semper. Fusce quis magna
            ultrices, rutrum nunc ac, faucibus velit. Sed vulputate cursus
            augue, eu feugiat ligula aliquet sit amet. Nulla facilisi. Cras
            tincidunt turpis augue, sit amet eleifend mauris blandit a. Maecenas
            id ex nec nisl aliquam rutrum. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Vestibulum
            blandit ante vel erat commodo ultricies. In id pretium mauris, non
            eleifend massa. Fusce placerat sapien sit amet dolor blandit
            ullamcorper. Aenean facilisis in erat eget commodo. Mauris vitae
            rhoncus justo.
          </Paragraph>
        </section>
        <section id="sensitive-settings">
          <HeadingItem type="h3">Sensitive Settings</HeadingItem>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            fermentum et ligula vel facilisis. Ut neque magna, semper vel
            fermentum id, viverra sed elit. Duis sagittis lobortis pellentesque.
            Ut enim urna, tempus id erat pulvinar, auctor dapibus diam. Aliquam
            vel magna aliquam, varius justo in, accumsan diam. Aliquam quis
            commodo velit. Etiam ut diam faucibus justo efficitur facilisis.
            Aliquam eget ipsum vitae nulla iaculis condimentum sit amet
            tincidunt massa. Mauris auctor malesuada nunc, eu vulputate quam
            auctor sed. Aliquam sapien sem, venenatis at odio non, commodo
            hendrerit risus.
          </Paragraph>
          <HeadingItem type="h3">Other Settings</HeadingItem>
          <Paragraph>
            Etiam iaculis, felis nec mattis sodales, diam lectus semper mauris,
            nec rutrum lacus lorem sit amet ex. Duis aliquam at ipsum sed
            aliquet. Nam quis ante vitae lacus viverra semper. Fusce quis magna
            ultrices, rutrum nunc ac, faucibus velit. Sed vulputate cursus
            augue, eu feugiat ligula aliquet sit amet. Nulla facilisi. Cras
            tincidunt turpis augue, sit amet eleifend mauris blandit a. Maecenas
            id ex nec nisl aliquam rutrum. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Vestibulum
            blandit ante vel erat commodo ultricies. In id pretium mauris, non
            eleifend massa. Fusce placerat sapien sit amet dolor blandit
            ullamcorper. Aenean facilisis in erat eget commodo. Mauris vitae
            rhoncus justo.
          </Paragraph>
        </section>
        <section id="layout">
          <HeadingItem type="h1">Layout</HeadingItem>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            fermentum et ligula vel facilisis. Ut neque magna, semper vel
            fermentum id, viverra sed elit. Duis sagittis lobortis pellentesque.
            Ut enim urna, tempus id erat pulvinar, auctor dapibus diam. Aliquam
            vel magna aliquam, varius justo in, accumsan diam. Aliquam quis
            commodo velit. Etiam ut diam faucibus justo efficitur facilisis.
            Aliquam eget ipsum vitae nulla iaculis condimentum sit amet
            tincidunt massa. Mauris auctor malesuada nunc, eu vulputate quam
            auctor sed. Aliquam sapien sem, venenatis at odio non, commodo
            hendrerit risus.
          </Paragraph>
          <HeadingItem type="h3">Layout Info</HeadingItem>
          <Paragraph>
            Etiam iaculis, felis nec mattis sodales, diam lectus semper mauris,
            nec rutrum lacus lorem sit amet ex. Duis aliquam at ipsum sed
            aliquet. Nam quis ante vitae lacus viverra semper. Fusce quis magna
            ultrices, rutrum nunc ac, faucibus velit. Sed vulputate cursus
            augue, eu feugiat ligula aliquet sit amet. Nulla facilisi. Cras
            tincidunt turpis augue, sit amet eleifend mauris blandit a. Maecenas
            id ex nec nisl aliquam rutrum. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Vestibulum
            blandit ante vel erat commodo ultricies. In id pretium mauris, non
            eleifend massa. Fusce placerat sapien sit amet dolor blandit
            ullamcorper. Aenean facilisis in erat eget commodo. Mauris vitae
            rhoncus justo.
          </Paragraph>
        </section>
        <section id="appearance">
          <HeadingItem type="h1">Appearance</HeadingItem>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            fermentum et ligula vel facilisis. Ut neque magna, semper vel
            fermentum id, viverra sed elit. Duis sagittis lobortis pellentesque.
            Ut enim urna, tempus id erat pulvinar, auctor dapibus diam. Aliquam
            vel magna aliquam, varius justo in, accumsan diam. Aliquam quis
            commodo velit. Etiam ut diam faucibus justo efficitur facilisis.
            Aliquam eget ipsum vitae nulla iaculis condimentum sit amet
            tincidunt massa. Mauris auctor malesuada nunc, eu vulputate quam
            auctor sed. Aliquam sapien sem, venenatis at odio non, commodo
            hendrerit risus.
          </Paragraph>
          <HeadingItem type="h3">Appearance Information</HeadingItem>
          <Paragraph>
            Etiam iaculis, felis nec mattis sodales, diam lectus semper mauris,
            nec rutrum lacus lorem sit amet ex. Duis aliquam at ipsum sed
            aliquet. Nam quis ante vitae lacus viverra semper. Fusce quis magna
            ultrices, rutrum nunc ac, faucibus velit. Sed vulputate cursus
            augue, eu feugiat ligula aliquet sit amet. Nulla facilisi. Cras
            tincidunt turpis augue, sit amet eleifend mauris blandit a. Maecenas
            id ex nec nisl aliquam rutrum. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Vestibulum
            blandit ante vel erat commodo ultricies. In id pretium mauris, non
            eleifend massa. Fusce placerat sapien sit amet dolor blandit
            ullamcorper. Aenean facilisis in erat eget commodo. Mauris vitae
            rhoncus justo.
          </Paragraph>
        </section>
      </NavigationContent>
    </NavigationContainer>
  );
}

export default NavigationPathLayout;
