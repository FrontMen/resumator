import React, { FunctionComponent, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { TooltipIconButton } from "../Material";
// Icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

export interface SectionItemHeaderProps {
  title: string;
  type: string;
  classes?: {
    actions: string;
  };
  onDelete: () => void;
  onEdit: () => void;
}

export const useSectionItemHeaderStyles = makeStyles({
  actions: {
    opacity: 0,
    transition: "opacity 150ms ease-out",
    pointerEvents: "none",
    alignSelf: "start",
    flexShrink: 0,
  },
  container: {
    "&:hover $actions": {
      opacity: 1,
      pointerEvents: "all",
    },
  },
});

export const SectionItemHeader: FunctionComponent<SectionItemHeaderProps> = ({
  title,
  type,
  classes,
  onDelete,
  onEdit,
}) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h6">{title}</Typography>
      <Box className={classes?.actions} marginRight={-1}>
        {/* Delete item */}
        <TooltipIconButton
          color="inherit"
          tooltip={`Delete ${type}`}
          onClick={() => setDeleteConfirmationOpen(true)}
        >
          <DeleteIcon fontSize="small" />
        </TooltipIconButton>
        {/* Edit item */}
        <TooltipIconButton color="inherit" tooltip={`Edit ${type}`} onClick={onEdit}>
          <EditIcon fontSize="small" />
        </TooltipIconButton>
      </Box>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Delete item</DialogTitle>
        <DialogContent>
          <Box>Are you sure you want to delete this item?</Box>
          <Box>This action cannot be reversed.</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmationOpen(false)}>No</Button>
          <Button
            onClick={() => {
              setDeleteConfirmationOpen(false);
              onDelete();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
