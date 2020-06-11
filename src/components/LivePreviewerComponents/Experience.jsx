import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import Card from "../Card";
import Input from "../Input";
import { DATE_FIELD_DEFAULT_VALUE } from "../constants";
import EmptyNotice from "./EmptyNotice";
import SkillsSelect, { createSkillObjects } from "./SkillsSelect";
import ExperienceItem from "./ExperienceItem";
import EditModalWrapper from "./ModalWrapper";

const Experience = ({
  type,
  experience,
  onSubmit,
  onEditHandler,
  onDeleteHandler,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingExisting, setIsEditingExisting] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [skillsState, setSkillsState] = React.useState(
    experience.skills && experience.skills.length > 0
      ? experience.skills.map((s) => s.name)
      : []
  );

  useEffect(() => {
    if (currentItemId) {
      const currentSkills = experience.find((e) => e.id === currentItemId).skills;
      setSkillsState(currentSkills.map((s) => s.name));
    } else {
      setSkillsState([]);
    }
  }, [experience, currentItemId]);

  const methods = useForm({});

  const onClickEdit = (experienceEntry) => {
    setCurrentItemId(experienceEntry.id);
    setIsEditingExisting(true);
    methods.reset(experienceEntry);
    setIsEditing(true);
  };

  return (
    <Card>
      <Typography gutterBottom variant="h4">
        {type}
      </Typography>
      <AddNew
        className="add-new-button"
        onClick={() => setIsEditing((prevState) => !prevState)}
        icon={faPlus}
      />
      {experience.map((e, i) => (
        <ExperienceItem
          experienceItem={e}
          key={i}
          onDeleteHandler={onDeleteHandler}
          onClickEdit={onClickEdit}
        />
      ))}
      <EmptyNotice items={experience} />

      <EditModalWrapper
        isOpen={isEditing}
        onRequestClose={() => {
          setIsEditingExisting(false);
          methods.reset({});
          setIsEditing(false);
        }}
        methods={methods}
        contentLabel={`Add ${type} details`}
        heading={`Add ${type} details`}
        onPrimaryActionClicked={() => {
          if (editingExisting) {
            onEditHandler({
              ...methods.getValues(),
              id: currentItemId,
              skills: createSkillObjects(skillsState),
            });
          } else {
            onSubmit(methods.getValues());
          }
          setCurrentItemId(null);
          setIsEditing(false);
        }}
        onSecondaryActionClicked={() => {
          setIsEditing(false);
        }}
      >
        <Input
          as={TextField}
          name="company"
          label="Company"
          control={methods.control}
          defaultValue=""
        />
        <Input
          as={TextField}
          name="role"
          label="Role"
          control={methods.control}
          defaultValue=""
        />

        <Input
          as={TextField}
          name="description"
          label="Description"
          control={methods.control}
          defaultValue=""
          multiline
          rows={4}
        />

        <Input
          as={DatePicker}
          control={methods.control}
          rules={{ required: true }}
          onChange={([selected]) => {
            return selected;
          }}
          name="startDate"
          label="Start Date"
          format="dd/MM/yyyy"
          defaultValue={DATE_FIELD_DEFAULT_VALUE}
        />
        <Input
          as={DatePicker}
          control={methods.control}
          rules={{ required: true }}
          onChange={([selected]) => {
            return selected;
          }}
          name="endDate"
          label="End Date"
          format="dd/MM/yyyy"
          defaultValue={DATE_FIELD_DEFAULT_VALUE}
        />
        <SkillsSelect
          onSkillsChanged={setSkillsState}
          skills={skillsState}
          label="Skills"
        />
      </EditModalWrapper>
    </Card>
  );
};

const AddNew = styled(FontAwesomeIcon)`
  position: absolute;
  right: 32px;
  top: 48px;
`;

export default Experience;
