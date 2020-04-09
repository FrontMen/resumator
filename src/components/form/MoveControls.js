import React from "react";
import { Box, Button, Flex } from "rebass";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faTimes } from "@fortawesome/free-solid-svg-icons";

const MoveControls = ({ index, fields, remove, swap }) => (
  <Flex>
    <Box width="6.5rem">
      {index !== fields.length - 1 && (
        <Button
          onClick={() => swap(index, index + 1)}
          variant="outline"
          color="white"
          mr={1}
        >
          <Icon icon={faArrowDown} size="sm" />
        </Button>
      )}
      {index !== 0 && (
        <Button
          onClick={() => swap(index, index - 1)}
          variant="outline"
          color="white"
        >
          <Icon icon={faArrowUp} size="sm" />
        </Button>
      )}
    </Box>

    <Button
      onClick={() => remove(index)}
      variant="outline"
      color="white"
      alignSelf="right"
    >
      <Icon icon={faTimes} size="sm" />{" "}
    </Button>
  </Flex>
);

export default MoveControls;
