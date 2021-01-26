import React, { FunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormControlProps,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { FormRichTextDraftEditor } from "./FormRichTextDraftEditor";

interface FormRichTextEditorProps extends FormControlProps {
  name: string;
  label: string;
  rows?: number;
}

export const FormRichTextEditor: FunctionComponent<FormRichTextEditorProps> = ({
  name,
  label,
  rows,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      defaultValue=""
      control={control}
      name={name!}
      render={({ value, onChange }) => (
        <FormControl fullWidth size="small" {...props}>
          <InputLabel
            shrink
            variant="outlined"
            htmlFor="form-rich-text-editor-input"
          >
            {label}
          </InputLabel>
          <OutlinedInput
            fullWidth
            notched
            id="form-rich-text-editor-input"
            label={label}
            inputComponent={() => (
              <FormRichTextDraftEditor value={value} onChange={onChange} />
            )}
          />
        </FormControl>
      )}
    />
  );
};
