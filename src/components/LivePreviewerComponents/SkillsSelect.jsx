import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TextField } from "@material-ui/core";
import styled from "@emotion/styled";
import { Autocomplete } from "@material-ui/lab";
import Chip from "@material-ui/core/Chip";
import { skillsConstants } from "../../config/skills.constants";

const AUTOCOMPLETE_REASONS = {
  ADD: "select-option", // Added via dropdown/select options
  CREATE: "create-option", // Added via typing
  REMOVE: "remove-option",
};

// TODO: Deprecate label prop
const SkillsSelect = ({ value, onChange, label }) => {
  const renderInput = (params) => (
    <TextField {...params} placeholder="Add a library, framework, skill..." />
  );

  const onAutocompleteChange = (event, inputValue, reason) => {
    if (reason === AUTOCOMPLETE_REASONS.REMOVE) {
      onChange(inputValue);

      return inputValue;
    }

    if (
      reason === AUTOCOMPLETE_REASONS.ADD ||
      reason === AUTOCOMPLETE_REASONS.CREATE
    ) {
      const skills = [...inputValue];
      const addedSkill = skills.pop();

      skills.push({ name: addedSkill });
      onChange(skills);

      return skills;
    }

    return inputValue;
  };

  const getOptionSelected = (option, skill) => option === skill.name;

  const reorderSkills = (from, to) => {
    const skillList = [...value];

    // Swap position
    skillList.splice(to, 0, skillList.splice(from, 1)[0]);

    onChange(skillList);
  };

  const onDragEnd = ({ source, destination }) => {
    if (source && destination) {
      reorderSkills(source.index, destination.index);
    }
  };

  const onSkillDelete = (index) => onChange(value.filter((skill, i) => index !== i));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <SkillsWrapper ref={provided.innerRef} {...provided.droppableProps}>
            {value.map(({ name }, index) => (
              <Draggable key={name} draggableId={name} index={index}>
                {({ draggableProps, dragHandleProps, innerRef }, { isDragging }) => (
                  <CustomChip
                    label={name}
                    size="small"
                    variant="outlined"
                    color="secondary"
                    ref={innerRef}
                    style={draggableProps.style}
                    isDragging={isDragging}
                    onDelete={() => onSkillDelete(index)}
                    {...draggableProps}
                    {...dragHandleProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </SkillsWrapper>
        )}
      </Droppable>

      <Autocomplete
        id="skill-list-autocomplete"
        multiple
        freeSolo
        disableClearable
        disableCloseOnSelect
        fullWidth
        value={value}
        options={skillsConstants}
        renderInput={renderInput}
        onChange={onAutocompleteChange}
        getOptionSelected={getOptionSelected}
        renderTags={() => null}
      />
    </DragDropContext>
  );
};

const CustomChip = styled(Chip)`
  margin-right: 8px;
  background-color: #fff;
`;

const SkillsWrapper = styled.div`
  display: flex;
  height: 50px;
  flex: 1 1 auto;
  overflow: auto;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #c4c4c4;
  padding: 0 8px;
  margin-bottom: 8px;

  &::after {
    content: "";
    display: block;
    width: 30px;
    height: 100%;
    flex: 1 0 auto;
  }
`;

export default SkillsSelect;
