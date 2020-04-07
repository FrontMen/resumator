import React from "react";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { Box, Button, Heading } from "rebass";
import { Label, Input, Textarea } from "@rebass/forms";

// TODO: remove when firebase values are truly fetched
const firebaseValues = {
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1980-01-30",
  city: "Amsterdam",
  introduction: "",
};

const PdfCreator = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    // TODO: save values in firebase
    console.log(data); // eslint-disable-line
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      py={3}
      maxWidth="600px"
      margin="0 auto"
    >
      <Heading as="h1" color="white" p="0" mb="2rem" fontSize="3rem">
        Create Resume
      </Heading>
      <FormGroup>
        <InputWrapper>
          <Heading as="legend" color="white" p="0" mb="2rem">
            Personal details
          </Heading>
          <StyledLabel htmlFor="firstName">First name</StyledLabel>
          <Input
            name="firstName"
            defaultValue={firebaseValues.firstName}
            ref={register({ required: true })}
          />
          {errors.firstName && <ErrorMessage>First name is required</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <StyledLabel htmlFor="lastName">Last name</StyledLabel>
          <Input
            name="lastName"
            defaultValue={firebaseValues.lastName}
            ref={register({ required: true })}
          />
          {errors.lastName && "Last name is required"}
        </InputWrapper>
        <InputWrapper>
          <StyledLabel htmlFor="dateOfBirth">Birthdate</StyledLabel>

          <Input
            type="date"
            name="dateOfBirth"
            defaultValue={firebaseValues.dateOfBirth}
            ref={register({ required: true })}
          />
          {errors.lastName && <ErrorMessage>Last name is required</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <StyledLabel htmlFor="city">City</StyledLabel>
          <Input
            name="city"
            defaultValue={firebaseValues.city}
            ref={register({ required: true })}
          />
          <ErrorMessage> {errors.city && "City is required"}</ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <StyledLabel htmlFor="introduction">Introduction</StyledLabel>
          <Textarea
            name="introduction"
            defaultValue={firebaseValues.introduction}
            ref={register({ required: true })}
          />
          {errors.introduction && (
            <ErrorMessage>Introduction is required</ErrorMessage>
          )}
        </InputWrapper>
      </FormGroup>

      <FormGroup>
        <Heading as="legend" color="white" p="0" mb="2rem">
          Work Experience
        </Heading>
        <Button variant="outline" color="white">
          + Add Work Experience
        </Button>
      </FormGroup>

      <FormGroup>
        <Heading as="legend" color="white" p="0" mb="2rem">
          Education
        </Heading>
      </FormGroup>
      <FormGroup>
        <Heading as="legend" color="white" p="0" mb="2rem">
          Skills
        </Heading>
      </FormGroup>
      <FormGroup>
        <Heading as="legend" color="white" p="0" mb="2rem">
          Projects
        </Heading>
      </FormGroup>
      <FormGroup>
        <Heading as="legend" color="white" p="0" mb="2rem">
          Badges
        </Heading>
      </FormGroup>
      <FormGroup>
        <Heading as="legend" color="white" p="0" mb="2rem">
          Avatar
        </Heading>
      </FormGroup>
      <Button as="input" type="submit" />
    </Box>
  );
};

const FormGroup = styled.fieldset`
  margin-bottom: 2rem;
  border: 0;
  padding: 0;
`;

const StyledLabel = styled(Label)`
  margin-bottom: 0.25rem;
`;

const InputWrapper = styled.div`
  margin-top: 1rem;
`;

const ErrorMessage = styled.label`
  display: block;
  padding-top: 0.25rem;
  color: tomato;
`;

export default PdfCreator;