import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, Button, Flex } from "rebass";
import { Select } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { MoveControls } from "../FormComponents";

// TODO: these options should probably be more dynamic
const badgeOptions = [
  "Angular",
  "BackBone",
  "CSS3",
  "Ember",
  "HTML 5",
  "Node JS",
  "Webpack",
  "JavaScript",
  "TypeScript",
  "React",
];

const BadgesInput = ({ name }) => {
  const { control, register, watch } = useFormContext();
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name,
  });

  const currentValues = watch("badges");

  const isAvailable = (option, index) => {
    if (!currentValues || !currentValues.length) return true;
    return currentValues[index] === option || !currentValues.includes(option);
  };

  return (
    <>
      {fields.map((item, index) => (
        <Flex
          mb={2}
          key={item.id}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box width="100%" mr={1}>
            <Select
              id={`${name}[${index}]`}
              name={`${name}[${index}]`}
              ref={register}
            >
              {badgeOptions
                .filter((option) => isAvailable(option, index))
                .map((option) => (
                  <option key={option}>{option}</option>
                ))}
            </Select>
          </Box>

          <Box flexShrink={0}>
            <MoveControls
              index={index}
              fields={fields}
              remove={remove}
              swap={swap}
            />
          </Box>
        </Flex>
      ))}

      <Button
        onClick={() => append({ name: "" })}
        variant="outline"
        color="white"
        type="button"
      >
        <Icon icon={faPlus} size="sm" />
        Add badge
      </Button>
    </>
  );
};

export default BadgesInput;
