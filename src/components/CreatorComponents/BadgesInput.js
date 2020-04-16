import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, Button, Flex } from "rebass";
import { Select } from "@rebass/forms";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { MoveControls } from "../FormComponents";

const badgeOptions = [
  { key: "angular", label: "Angular" },
  { key: "backbone", label: "BackBone" },
  { key: "css3", label: "CSS3" },
  { key: "ember", label: "Ember" },
  { key: "html5", label: "HTML 5" },
  { key: "nodejs", label: "Node JS" },
  { key: "webpack", label: "Webpack" },
  { key: "javascript", label: "JavaScript" },
  { key: "typescript", label: "TypeScript" },
  { key: "react", label: "React" },
];

const BadgesInput = ({ name }) => {
  const { control, register } = useFormContext();
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name,
  });

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
              id={`${name}[${index}].name`}
              name={`${name}[${index}].name`}
              defaultValue="United States"
              ref={register}
            >
              {badgeOptions.map(({ key, label }) => (
                <option key={key}>{label}</option>
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

      <Button onClick={() => append({ name: "" })} variant="outline" color="white">
        <Icon icon={faPlus} size="sm" /> "Add badge"
      </Button>
    </>
  );
};

export default BadgesInput;
