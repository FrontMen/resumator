import React, { useState, useEffect, FunctionComponent } from "react";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles, Box, Button, TextField } from "@material-ui/core";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { skillsConstants } from "../../config/skills.constants";
import { yearsConstants } from "../../config/years.constants";
import FormSkillsSelectChip from "./FormSkillsSelectChip";
import pluralize from "../../lib/pluralize";
import { wrap } from "lodash";

interface Skill {
  name: string;
  years?: string | null;
}

interface FormSkillsSelectPropsAutocomplete {
  label?: string;
  value: Skill[];
  onChange: (skills: Skill[]) => void;
}

const useStyles = makeStyles({
  root: {
    flexWrap: "wrap",
    width: "100%",
  },
  box: {
    "min-width": "100%",
  },
  autocomplete: {
    "min-width": "100%",
    padding: "10px 0 0 0",
  },
  textField: {
    "margin-top": "4px",
  },
  addButton: {
    "min-width": "100%",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    height: 48,
    margin: "20px 0 0 0",
    width: "100%",
  },
});

const FormSkillsSelectAutocomplete: FunctionComponent<FormSkillsSelectPropsAutocomplete> = ({
  label,
  value,
  onChange,
}) => {
  const [name, setName] = useState<string | null>(null);
  const [years, setYears] = useState<string | null>(null);

  useEffect(() => {
    filterOptions();
  });

  const classes = useStyles();

  /**
   * Check if the provided option is currently included in the skills.
   */
  function filterOptions() {
    const selectedOptions = value.map((skill) => skill.name);
    return skillsConstants.filter((skill) => !selectedOptions.includes(skill));
  }

  /**
   * Handle adding or deleting a skill through the autocomplete input.
   */
  const handleSkillChange = () => {
    if (name) {
      onChange([...value, { name: name, years: years }]);
      setName(null);
      setYears(null);
    }
  };

  /**
   * Handle deleting a skill by clicking the x on the chip.
   */
  const handleSkillDelete = (index: number) =>
    onChange(value.filter((skill, i) => index !== i));

  /**
   * Handle when a skill is being dropped in a new position.
   */
  const handleDrag = (sourceIndex: number, destinationIndex: number) => {
    // Not a full copy, but as we don't edit skills that should be okay.
    const skills = [...value];
    skills.splice(destinationIndex, 0, skills.splice(sourceIndex, 1)[0]);

    onChange(skills);
  };

  return (
    <div className={classes.root}>
      <DndProvider backend={HTML5Backend}>
        <Box display="flex" flexWrap="wrap" gridGap={8} className={classes.box}>
          {value.map((skill, index) => (
            <FormSkillsSelectChip
              key={skill.name}
              index={index}
              label={`${skill.name} ${pluralize("year", skill.years)}`}
              onDrag={handleDrag}
              onDelete={handleSkillDelete}
            />
          ))}
        </Box>
      </DndProvider>
      <Autocomplete
        id="skill-autocomplete"
        value={name}
        onChange={(event: any, newValue: string | null) => {
          setName(newValue);
        }}
        filterSelectedOptions={true}
        options={filterOptions()}
        className={classes.autocomplete}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add a library, framework, skill..."
            margin="normal"
            variant="outlined"
            className={value.length ? classes.textField : undefined}
          />
        )}
      />
      <Autocomplete
        id="year-autocomplete"
        value={years}
        onChange={(event: any, newValue: string | null) => {
          setYears(newValue);
        }}
        filterSelectedOptions={true}
        options={yearsConstants.map((option) => option)}
        className={classes.autocomplete}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Optionally choose how many years"
            margin="normal"
            variant="outlined"
            className={value.length ? classes.textField : undefined}
          />
        )}
      />
      <Button
        onClick={handleSkillChange}
        color="primary"
        className={classes.addButton}
      >
        Add
      </Button>
    </div>
  );
};

export default FormSkillsSelectAutocomplete;
