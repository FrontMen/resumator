import React from "react";
import { ErrorMessage as FormErrorMessage } from "react-hook-form";
import { ErrorMessage, InputWrapper, StyledLabel } from "./styledComponents";

const FormField = ({ children, name, label, required }) => (
  <InputWrapper>
    {label && (
      <StyledLabel htmlFor={name}>
        {label} {required && "*"}
      </StyledLabel>
    )}

    {children}

    <FormErrorMessage name={name}>
      {({ message }) => <ErrorMessage>{message}</ErrorMessage>}
    </FormErrorMessage>
  </InputWrapper>
);

export default FormField;
