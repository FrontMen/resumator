import React, { FunctionComponent } from "react";
import { Box, Typography } from "@material-ui/core";
import { TooltipIconButton } from "../Material";
// Icons
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

export interface SectionHeaderProps {
  title: string;
  action?: "add" | "edit";
  actionTooltip?: string;
  actionOnClick?: () => void;
}

export const SectionHeader: FunctionComponent<SectionHeaderProps> = ({
  title,
  action,
  actionTooltip,
  actionOnClick,
}) => {
  return (
    <>
      {/* Only show a header if a title and/or action are defined. */}
      {(title || action) && (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          height={52}
          paddingTop={1}
          paddingRight={1}
          paddingLeft={2}
        >
          {/* Only show a title if we actually have a title. */}
          {title && <Typography variant="h5">{title}</Typography>}
          {/* Only show an action button if we actually have an action. */}
          {action && (
            <TooltipIconButton
              color="inherit"
              tooltip={actionTooltip || ""}
              onClick={actionOnClick || (() => {})}
            >
              {action === "add" && <AddIcon fontSize="small" />}
              {action === "edit" && <EditIcon fontSize="small" />}
            </TooltipIconButton>
          )}
        </Box>
      )}
    </>
  );
};
