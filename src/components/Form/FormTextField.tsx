import React, { FunctionComponent } from "react";
import { useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@material-ui/core";

export const FormTextField: FunctionComponent<TextFieldProps> = ({ ...props }) => {
  const { register } = useFormContext();

  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      inputRef={register}
      {...props}
    />
  );
};
