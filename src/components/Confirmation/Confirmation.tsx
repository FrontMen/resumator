import React, { FunctionComponent } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

interface ConfirmationProps {
  isOpen: boolean;
  onClose: () => any;
  title?: string;
  message?: string;
  denyText?: string;
  confirmText?: string;
  denyClick: () => any;
  confirmClick: () => any;
}

export const Confirmation: FunctionComponent<ConfirmationProps> = ({
  isOpen,
  onClose,
  title,
  message,
  denyClick,
  confirmClick,
  denyText,
  confirmText,
  ...props
}) => {
  return (
    <Dialog open={isOpen !== false} onClose={onClose}>
      <DialogTitle>{title || "Confirm action"}</DialogTitle>
      <DialogContent>
        <Box>{message || "This action cannot be reversed."}</Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={denyClick}>{denyText || "No"}</Button>
        <Button onClick={confirmClick}>{denyText || "Yes"}</Button>
      </DialogActions>
    </Dialog>
  );
};
