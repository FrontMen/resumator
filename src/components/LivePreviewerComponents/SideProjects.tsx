import React, { useState, FunctionComponent } from "react";
import { Box, Divider } from "@material-ui/core";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import { FormColumn, FormRow, FormTextField } from "../Form";
import { SideProjectModel, SideProjectItem } from "./SideProjectItem";

interface SideProjectProps {
  type: string;
  projects: SideProjectModel[];
  onSubmit: (value: SideProjectModel[]) => void;
}

export const SideProjects: FunctionComponent<SideProjectProps> = ({
  type,
  projects,
  onSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<SideProjectModel | null>(null);
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    const filteredProjects = [...projects];
    filteredProjects.splice(index, 1);
    onSubmit(filteredProjects);
  };

  const handleEdit = (item: SideProjectModel, index: number) => {
    setEditItem(item);
    setEditItemIndex(index);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
  };

  const handleSave = (item: SideProjectModel) => {
    const updatedProjects = [...projects];
    if (editItemIndex !== null) updatedProjects.splice(editItemIndex!, 1, item);
    else updatedProjects.push(item);

    setIsEditing(false);
    setEditItem(null);
    setEditItemIndex(null);
    onSubmit(updatedProjects);
  };

  return (
    <Section
      title={type}
      action="add"
      actionTooltip={`Add ${type.toLowerCase()}`}
      actionOnClick={() => setIsEditing(true)}
    >
      <Box display="flex" flexDirection="column" marginTop={-1} gridGap={8}>
        {projects.map((entry: SideProjectModel, index: number) => (
          <Box display="flex" flexDirection="column" key={index} gridGap={16}>
            <SideProjectItem
              type={type}
              projectItem={entry}
              onDelete={() => handleDelete(index)}
              onEdit={(item) => handleEdit(item, index)}
            />
            {index < projects.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>

      <SectionEditDialog
        title={editItem ? `Edit ${type}` : `Add ${type}`}
        data={editItem!}
        open={isEditing}
        onCancel={handleEditCancel}
        onSave={handleSave}
      >
        <FormColumn>
          <FormRow>
            <FormTextField required name="title" label="Title" />
            <FormTextField name="link" label="Link" />
          </FormRow>
          <FormRow>
            <FormTextField
              multiline
              name="description"
              label="Description"
              rows={8}
            />
          </FormRow>
        </FormColumn>
      </SectionEditDialog>
    </Section>
  );
};
