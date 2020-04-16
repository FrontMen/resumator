import React, { useContext } from "react";
import { FirebaseAppContext } from "../context/FirebaseContext";
import resumeMock from "../mock/smallmock.json";
import { useForm, FormContext } from "react-hook-form";
import { Box, Button, Heading } from "rebass";
import { Input, Textarea } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faGraduationCap,
  faBriefcase,
  faCodeBranch,
  faBrain,
  faCertificate,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import validationSchema, { MIN_NUMBER_OF_EXPERIENCE } from "../config/validation";
import {
  BadgesInput,
  EducationInput,
  ExperienceInput,
} from "../components/CreatorComponents";

import {
  FieldsInput,
  FormField,
  FormGroup,
  InputWrapper,
} from "../components/FormComponents";

const PdfCreator = () => {
  const { firebase } = useContext(FirebaseAppContext);
  const methods = useForm({
    defaultValues: { ...resumeMock },
    validationSchema,
  });

  const onSubmit = (data) => {
    firebase.firestore().collection("resumes").doc().set(data);
  };

  return (
    <FormContext {...methods}>
      <Box
        as="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        py={3}
        maxWidth="600px"
        margin="0 auto"
      >
        <Heading as="h1" color="white" p="0" mb="2rem" fontSize="3rem">
          Create Resume
        </Heading>

        <FormGroup>
          <Heading as="legend" color="white" p="0">
            <Icon icon={faAddressCard} size="sm" /> Personal details
          </Heading>

          <FormField name="personalia.email" label="First name">
            <Input name="personalia.email" type="email" ref={methods.register()} />
          </FormField>

          <FormField name="personalia.firstName" label="First name">
            <Input name="personalia.firstName" ref={methods.register()} />
          </FormField>

          <FormField name="personalia.lastName" label="Last name">
            <Input name="personalia.lastName" ref={methods.register()} />
          </FormField>

          <FormField name="personalia.dateOfBirth" label="Birth date">
            <Input
              name="personalia.dateOfBirth"
              type="date"
              ref={methods.register()}
            />
          </FormField>

          <FormField name="personalia.city" label="City">
            <Input name="personalia.city" ref={methods.register()} />
          </FormField>

          <FormField name="introduction" label="Introduction">
            <Textarea name="introduction" ref={methods.register()} />
          </FormField>
        </FormGroup>

        <FormGroup>
          <Heading as="legend" color="white" p="0">
            <Icon icon={faBriefcase} size="sm" /> Work Experience
          </Heading>

          <InputWrapper>
            <ExperienceInput
              name="experience"
              label="Work experience"
              addButtonLabel="Add experience"
              min={MIN_NUMBER_OF_EXPERIENCE}
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Heading as="legend" color="white" p="0">
            <Icon icon={faGraduationCap} size="sm" /> Education
          </Heading>

          <InputWrapper>
            <EducationInput name="education" addButtonLabel="Add education" />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Heading as="legend" color="white" p="0">
            <Icon icon={faBrain} size="sm" /> Skills
          </Heading>

          <InputWrapper>
            <FieldsInput name="skills" addButtonLabel="Add skill" />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Heading as="legend" color="white" p="0">
            <Icon icon={faCodeBranch} size="sm" /> Projects
          </Heading>

          <InputWrapper>
            <ExperienceInput
              name="projects"
              label="Project"
              addButtonLabel="Add project"
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Heading as="legend" color="white" p="0">
            <Icon icon={faCertificate} size="sm" /> Badges
          </Heading>

          <InputWrapper>
            <BadgesInput name="badges" />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Heading as="legend" color="white" p="0">
            <Icon icon={faUserCircle} size="sm" /> Avatar
          </Heading>
        </FormGroup>

        <Button as="input" type="submit" />
      </Box>
    </FormContext>
  );
};

export default PdfCreator;
