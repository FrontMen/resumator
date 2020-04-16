import React from "react";
import { useFormContext } from "react-hook-form";
import { Box, Flex } from "rebass";
import { Checkbox, Label } from "@rebass/forms";

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
  const { register } = useFormContext();

  return (
    <Flex direction="row" flexWrap="wrap">
      {badgeOptions.map((option) => (
        <Box key={option} width={1 / 4}>
          <Label>
            <Checkbox
              id={`${name}.${option}`}
              name={`${name}.${option}`}
              ref={register}
            />
            {option}
          </Label>
        </Box>
      ))}
    </Flex>
  );
};

export default BadgesInput;
