import React, { FunctionComponent } from "react";
import { Box } from "@material-ui/core";

export const FormColumn: FunctionComponent = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" gridGap={16} flex={1}>
      {children}
    </Box>
  );
};
