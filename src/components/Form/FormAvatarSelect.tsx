import React, { FunctionComponent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  FormControl,
  FormControlProps,
  InputLabel,
  makeStyles,
  OutlinedInput,
} from "@material-ui/core";
import avatars from "../../assets/images/avatars";
import { colors } from "../../config/theme";

interface FormAvatarSelectProps extends FormControlProps {
  name: string;
  label: string;
}

const useStyles = makeStyles({
  avatar: {
    width: "100px",
    height: "200px",
    margin: "16px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    cursor: "pointer",

    "&:hover": {
      outline: `2px auto ${colors.darkBlue}`,
    },
  },
  selected: {
    outline: `2px auto ${colors.orange}`,
  },
});

export const FormAvatarSelect: FunctionComponent<FormAvatarSelectProps> = ({
  name,
  label,
  ...props
}) => {
  const classes = useStyles();
  const { control } = useFormContext();

  return (
    <Controller
      defaultValue="1"
      control={control}
      name={name!}
      render={({ value, onChange }) => (
        <FormControl fullWidth size="small" {...props}>
          <InputLabel shrink variant="outlined" htmlFor="form-avatar-selector-input">
            {label}
          </InputLabel>
          <OutlinedInput
            fullWidth
            notched
            id="form-avatar-selector-input"
            label={label}
            inputComponent={() => (
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="center"
              >
                {avatars.map((avatar, i) => (
                  <Box
                    component="span"
                    className={`${classes.avatar} ${
                      avatar.name === value && classes.selected
                    }`}
                    key={i}
                    style={{
                      backgroundImage: `url(${avatar.img})`,
                    }}
                    onClick={() => onChange(avatar.name)}
                  />
                ))}
              </Box>
            )}
          />
        </FormControl>
      )}
    />
  );
};
