import React, { FunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  DatePickerProps,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

type FormDatePickerProps = Omit<DatePickerProps, "value" | "onChange">;

export const FormDatePicker: FunctionComponent<FormDatePickerProps> = ({
  name,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Controller
        defaultValue={null}
        control={control}
        name={name!}
        render={({ value, onChange }) => (
          <DatePicker
            fullWidth
            variant="inline"
            inputVariant="outlined"
            size="small"
            format="dd-MM-yyyy"
            name={name}
            value={value}
            onChange={onChange}
            {...props}
          />
        )}
      />
    </MuiPickersUtilsProvider>
  );
};
