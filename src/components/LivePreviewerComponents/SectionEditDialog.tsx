import React, { PropsWithChildren, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Typography,
} from "@material-ui/core";
import { TooltipIconButton } from "../Material";
// Icons
import CloseIcon from "@material-ui/icons/Close";

interface SectionEditDialogProps<T> extends DialogProps {
  title: string;
  data: T;
  onCancel: () => void;
  onSave: (data: T) => void;
}

// FunctionComponent doesn't work well with additional generics, so we use the props type directly.
// To have generics work in TSX with an arrow function, we have to hint the compiler to use generics, thus the trailing comma.
export const SectionEditDialog = <T,>({
  title,
  data,
  onCancel,
  onSave,
  children,
  ...props
}: PropsWithChildren<SectionEditDialogProps<T>>) => {
  const { reset, ...form } = useForm();

  // Reset the form with new data if it changes.
  useEffect(() => reset({ ...data }), [reset, data]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="section-edit-dialog-title"
      aria-describedby="section-edit-dialog-content"
      onClose={onCancel}
      {...props}
    >
      {/* Custom title to include a close button, example from material documentation doesn't work. */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding={1}
      >
        <Box paddingX={2} paddingY={1}>
          <Typography id="section-edit-dialog-title" variant="h6">
            {title}
          </Typography>
        </Box>
        <TooltipIconButton tooltip="Close" onClick={onCancel}>
          <CloseIcon />
        </TooltipIconButton>
      </Box>
      {/* Content */}
      <DialogContent id="section-edit-dialog-content">
        <FormProvider reset={reset} {...form}>
          <form
            id="section-edit-dialog-form"
            onSubmit={form.handleSubmit((formData) => onSave(formData as T))}
          >
            {children}
          </form>
        </FormProvider>
      </DialogContent>
      {/* Actions for cancel and save. */}
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" color="primary" form="section-edit-dialog-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
