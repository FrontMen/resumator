import React, { useState } from "react";
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
import RichTextEditor from "./RichTextEditor";
import ExperienceItem from "./ExperienceItem";
import EditModalWrapper from "./ModalWrapper";
import SkillsSelectFormField from "./SkillsSelectFormField";

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
  const [skillsState, setSkillsState] = React.useState(experience.skills || []);
  const [descriptionState, setDescriptionState] = React.useState();
  const methods = useForm({});
  const { control, getValues, reset } = methods;

  const onClickEdit = (experienceEntry) => {
    setCurrentItemId(experienceEntry.id);
    setDescriptionState(experienceEntry.description);
    setIsEditingExisting(true);
    reset(experienceEntry);
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
          reset({});
          setIsEditing(false);
        }}
        methods={methods}
        contentLabel={`Add ${type} details`}
        heading={`Add ${type} details`}
        onPrimaryActionClicked={() => {
          const values = getValues();

          if (editingExisting) {
            onEditHandler({
              ...values,
              id: currentItemId,
              description: descriptionState,
            });
          } else {
            onSubmit(values);
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
          control={control}
          defaultValue=""
        />
        <Input
          as={TextField}
          name="role"
          label="Role"
          control={control}
          defaultValue=""
        />

        <RichTextEditor value={descriptionState} onChange={setDescriptionState} />

        <Input
          as={DatePicker}
          control={control}
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
          control={control}
          rules={{ required: true }}
          onChange={([selected]) => {
            return selected;
          }}
          name="endDate"
          label="End Date"
          format="dd/MM/yyyy"
          defaultValue={DATE_FIELD_DEFAULT_VALUE}
        />

        <SkillsSelectFormField
          onSkillsChanged={setSkillsState}
          skills={skillsState}
          formControl={control}
          formRules={{ required: true }}
          name="skills"
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
