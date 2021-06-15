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
  onClose?: () => any;
  title?: string;
  message?: string;
  denyText?: string;
  confirmText?: string;
  denyClick: () => any;
  confirmClick: () => any;
}

export const Confirmation: FunctionComponent<ConfirmationProps> = ({
  isOpen,
  onClose = () => null,
  title = "Confirm action",
  message = "This action cannot be reversed.",
  denyClick,
  confirmClick,
  denyText = "No",
  confirmText = "Yes",
  ...props
}) => {
  return (
    <Dialog open={isOpen !== false} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box dangerouslySetInnerHTML={{ __html: message }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={denyClick}>{denyText}</Button>
        <Button onClick={confirmClick}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
};
