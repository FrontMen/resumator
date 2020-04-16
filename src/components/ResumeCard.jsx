import React from "react";
import styled from "@emotion/styled";
import { Button, Box, Heading, Text, Image } from "rebass";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const Card = styled(Box)`
  padding: 2rem 1rem 2rem 1rem;
  /* parent has -1rem padding fix */
  margin: 0 1rem 2rem 1rem;
  background-color: #12111d;
  color: white;
`;

const Avatar = styled(Image)`
  width: 8rem;
  height: 8rem;
  border-radius: 100%;
  margin-bottom: 1rem;
`;

const FooterButton = styled(Button)`
  color: white;
`;

const ResumeCard = ({ avatar, name, city, id }) => {
  const history = useHistory();
  const goTo = (path) => history.push(path);

  return (
    <Card key={id} bg="grey" width={["100%", "100%", "300px"]}>
      <header>{avatar && <Avatar src={avatar} />}</header>
      <Heading as="h1" fontSize="1.5rem">
        {name}
      </Heading>
      <Text fontSize="1rem" mb="2rem">
        {city}
      </Text>
      <footer>
        <FooterButton
          variant="outline"
          mr="1rem"
          onClick={() => goTo(`./previewer/${id}`)}
        >
          Edit&nbsp;&nbsp;
          <Icon icon={faPencilAlt} />
        </FooterButton>
        <FooterButton onClick={() => goTo(`./creator/${id}`)}>
          View&nbsp;&nbsp;
          <Icon icon={faExternalLinkAlt} />
        </FooterButton>
      </footer>
    </Card>
  );
};
export default ResumeCard;
