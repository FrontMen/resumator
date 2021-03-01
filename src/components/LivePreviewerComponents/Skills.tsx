import React, { FunctionComponent, useState } from "react";
import { Box, Chip } from "@material-ui/core";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import { FormColumn, FormRow, FormSkillsSelect } from "../Form";

export interface SkillModel {
  name: string;
  years?: string;
}
interface SkillsProps {
  skills: SkillModel[];
  onSubmit: (skills: SkillModel[]) => void;
}

const format = (s: string, num?: string): string => {
  const n = Number(num);
  let res = "";
  if (!isNaN(n)) {
    res = `${num} ${s}`;
    if (n > 1) {
      res += "s";
    }
  }
  return res;
};

export const Skills: FunctionComponent<SkillsProps> = ({ skills, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Section
      title="Skills"
      action="edit"
      actionTooltip="Edit skills"
      actionOnClick={() => setIsEditing(true)}
    >
      <Box display="flex" flexWrap="wrap" gridGap={8}>
        {skills.map((skill) => (
          <Chip
            key={skill.name}
            size="small"
            variant="outlined"
            label={`${skill.name} ${format("year", skill.years)} `}
            color="secondary"
          />
        ))}
      </Box>

      <SectionEditDialog
        title="Skills"
        data={{ skills }}
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onSave={(data) => {
          setIsEditing(false);
          onSubmit(data.skills);
        }}
      >
        <FormColumn>
          <FormRow>
            <FormSkillsSelect name="skills" />
          </FormRow>
        </FormColumn>
      </SectionEditDialog>
    </Section>
  );
};
