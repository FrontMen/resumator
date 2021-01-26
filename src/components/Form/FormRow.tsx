import React, { FunctionComponent } from "react";
import { Box } from "@material-ui/core";

export const FormRow: FunctionComponent = ({ children }) => {
  return (
    <Box display="flex" flexDirection="row" gridGap={8}>
      {children}
    </Box>
  );
};
