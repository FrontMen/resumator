import React, { useState, FunctionComponent } from "react";
import { Box, Divider } from "@material-ui/core";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import { FormColumn, FormRow, FormTextField, FormDatePicker } from "../Form";
import { EducationModel, EducationItem } from "./EducationItem";

interface EducationProps {
  education: EducationModel[];
  onSubmit: (value: EducationModel[]) => void;
}

export const Education: FunctionComponent<EducationProps> = ({
  education,
  onSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<EducationModel | null>(null);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    const filteredEducation = [...education];
    filteredEducation.splice(index, 1);
    onSubmit(filteredEducation);
  };

  const handleEdit = (item: EducationModel, index: number) => {
    setEditItem(item);
    setEditItemIndex(index);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
  };

  const handleSave = (item: EducationModel) => {
    const updatedEducation = [...education];
    if (editItemIndex !== null) updatedEducation.splice(editItemIndex!, 1, item);
    else updatedEducation.push(item);

    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
    onSubmit(updatedEducation);
  };

  return (
    <Section
      title="Education"
      action="add"
      actionTooltip="Add education"
      actionOnClick={() => setIsEditing(true)}
    >
      <Box display="flex" flexDirection="column" marginTop={-1} gridGap={8}>
        {education.map((entry: EducationModel, index: number) => (
          <Box display="flex" flexDirection="column" key={index} gridGap={16}>
            <EducationItem
              educationItem={entry}
              onDelete={() => handleDelete(index)}
              onEdit={(item) => handleEdit(item, index)}
            />
            {index < education.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>

      <SectionEditDialog
        title={editItem ? `Edit education` : `Add education`}
        data={editItem!}
        open={isEditing}
        onCancel={handleEditCancel}
        onSave={handleSave}
      >
        <FormColumn>
          <FormRow>
            <FormTextField required name="name" label="Name" />
            <FormTextField required name="institute" label="Institute" />
          </FormRow>
          <FormRow>
            <FormDatePicker name="startDate" label="Start" />
            <FormDatePicker name="endDate" label="End" />
          </FormRow>
        </FormColumn>
      </SectionEditDialog>
    </Section>
  );
};
