import React, { useRef } from "react";
import CustomChip from "./CustomChip";
import { skillsConstants } from "../../config/skills.constants";
import { TextField, InputLabel } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

export const createSkillObjects = (skillStrings) => {
  return skillStrings.map((s) => ({ name: s }));
};

const SkillsSelect = ({ skills, onSkillsChanged, label }) => {
  // This is necessary because this value shouldn't change
  // so MUI doesn't throw warnings
  const { current: defaultValue } = useRef(skills);
  const renderSelectedSkills = (currentSkills, getTagProps) =>
    currentSkills.map((skill, index) => (
      <CustomChip
        key={skill}
        label={skill}
        size="small"
        variant="outlined"
        color="secondary"
        {...getTagProps({ index })}
      />
    ));

  const renderInput = (params) => (
    <TextField
      {...params}
      variant="outlined"
      placeholder="Add frameworks, libraries, technologies..."
    />
  );

  const onChange = (event, skills) => onSkillsChanged(skills);

  return (
    <>
      {label && <InputLabel id="skill-label">{label}</InputLabel>}

      <Autocomplete
        id="skill-list-autocomplete"
        multiple
        freeSolo
        fullWidth
        disableClearable
        disableCloseOnSelect
        options={skillsConstants}
        defaultValue={defaultValue}
        renderTags={renderSelectedSkills}
        renderInput={renderInput}
        onChange={onChange}
      />
    </>
  );
};

export default SkillsSelect;
