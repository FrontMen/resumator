import React from "react";
import { Flex, Box } from "rebass";
import { Button } from "@material-ui/core";

const ModalActionButtons = ({
  primaryText,
  secondaryText,
  onPrimaryActionClicked,
  onSecondaryActionClicked,
}) => {
  return (
    <Flex justifyContent="flex-end">
      <Box mx={2}>
        <Button onClick={onSecondaryActionClicked} variant="contained" type="button">
          {secondaryText ? secondaryText : "Cancel"}
        </Button>
      </Box>
      <Box mx={2}>
        <Button
          onClick={onPrimaryActionClicked}
          variant="contained"
          type="button"
          color="primary"
        >
          {primaryText ? primaryText : "Save"}
        </Button>
      </Box>
    </Flex>
  );
};

export default ModalActionButtons;