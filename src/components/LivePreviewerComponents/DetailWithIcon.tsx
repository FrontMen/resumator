import React, { FunctionComponent, ReactNode } from "react";
import { Box } from "@material-ui/core";

interface DetailWithIconProps {
  icon: ReactNode;
}

export const DetailWithIcon: FunctionComponent<DetailWithIconProps> = ({
  icon,
  children,
}) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" gridGap={8}>
      {icon}
      {children ? children : "---"}
    </Box>
  );
};
