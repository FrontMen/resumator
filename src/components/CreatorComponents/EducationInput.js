import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, Button, Flex, Heading } from "rebass";
import { Checkbox, Input } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { MIN_NUMBER_OF_EDUCATION } from "../../config/validation";

import {
  InputWrapper,
  FormField,
  MoveControls,
  StyledLabel,
} from "../FormComponents";

const EducationInput = ({ name, addButtonLabel }) => {
  const { control, register } = useFormContext();
  const { fields, prepend, remove, swap } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      <Button
        onClick={() => prepend({})}
        variant="outline"
        color="white"
        type="button"
      >
        <Icon icon={faPlus} size="sm" /> {addButtonLabel}
      </Button>

      {fields.map((item, index) => (
        <Box key={item.id} mb="1rem">
          <Flex direction="row" alignItems="center" justifyContent="space-between">
            <Box width="100%" mr={1}>
              <Heading fontSize={20} as="legend" color="white" my="2rem">
                Education #{index + 1}
              </Heading>
            </Box>

            <Box flexShrink={0}>
              <MoveControls
                index={index}
                min={MIN_NUMBER_OF_EDUCATION}
                fields={fields}
                remove={remove}
                swap={swap}
              />
            </Box>
          </Flex>

          <FormField
            name={`${name}[${index}].institute]`}
            label="Institute"
            required
          >
            <Input name={`${name}[${index}].institute`} ref={register()} />
          </FormField>

          <FormField name={`${name}[${index}].name]`} label="Name" required>
            <Input name={`${name}[${index}].name`} ref={register()} />
          </FormField>

          <FormField name={`${name}[${index}].level]`} label="Level">
            <Input name={`${name}[${index}].level`} ref={register()} />
          </FormField>

          <FormField
            name={`${name}[${index}].startDate]`}
            label="Start date"
            required
          >
            <Input
              type="date"
              name={`${name}[${index}].startDate`}
              ref={register()}
            />
          </FormField>

          <FormField name={`${name}[${index}].endDate]`} label="End date" required>
            <Input type="date" name={`${name}[${index}].endDate`} ref={register()} />
          </FormField>

          <InputWrapper>
            <StyledLabel>
              <Checkbox
                as="input"
                type="checkbox"
                name={`${name}[${index}].certificate`}
                ref={register()}
              />
              Certificate
            </StyledLabel>
          </InputWrapper>
        </Box>
      ))}
    </>
  );
};

export default EducationInput;
