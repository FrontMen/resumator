import React, { FunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControlProps } from "@material-ui/core";
import FormSkillsSelectAutocomplete from "./FormSkillsSelectAutocomplete";

interface FormSkillsSelectProps extends FormControlProps {
  name: string;
  label?: string;
}

export const FormSkillsSelect: FunctionComponent<FormSkillsSelectProps> = ({
  name,
  label,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      defaultValue={[]}
      control={control}
      name={name!}
      render={({ value, onChange }) => (
        <FormSkillsSelectAutocomplete
          {...props}
          label={label}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};
