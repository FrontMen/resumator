import React, { FunctionComponent } from "react";
import { IconButton, IconButtonProps, Tooltip } from "@material-ui/core";

interface TooltipIconButtonProps extends IconButtonProps {
  tooltip: string;
  active?: boolean;
}

export const TooltipIconButton: FunctionComponent<TooltipIconButtonProps> = ({
  tooltip,
  active,
  children,
  ...props
}) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        aria-label={tooltip}
        color={active ? "secondary" : "default"}
        {...props}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};
