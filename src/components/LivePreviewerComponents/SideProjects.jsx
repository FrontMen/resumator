import React, { useState } from "react";
import styled from "@emotion/styled";
import Card from "../Card";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditModalWrapper from "./ModalWrapper";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { TextField } from "@material-ui/core";
import SideProjectItem from "./SideProjectItem";

const SideProjects = ({
  type,
  projects,
  onSubmit,
  onEditHandler,
  onDeleteHandler,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingExisting, setIsEditingExisting] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);

  const methods = useForm({});

  const onClickEdit = (experienceEntry) => {
    setCurrentItemId(experienceEntry.id);
    setIsEditingExisting(true);
    methods.reset(experienceEntry);
    setIsEditing(true);
  };

  return (
    <Card>
      <Title>{type}</Title>
      <AddNew
        className="add-new-button"
        onClick={() => setIsEditing((prevState) => !prevState)}
        icon={faPlus}
      />
      {projects.map((e, i) => (
        <SideProjectItem
          projectItem={e}
          key={i}
          onDeleteHandler={onDeleteHandler}
          onClickEdit={onClickEdit}
        />
      ))}
      <EditModalWrapper
        isOpen={isEditing}
        onRequestClose={() => {
          setIsEditingExisting(false);
          methods.reset({});
          setIsEditing(false);
        }}
        methods={methods}
        contentLabel="Add education details"
        heading="Add new education"
        onPrimaryActionClicked={() => {
          if (editingExisting) {
            onEditHandler({ ...methods.getValues(), id: currentItemId });
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
          name="title"
          label="Title"
          control={methods.control}
          defaultValue=""
        />
        <Input
          as={TextField}
          name="description"
          label="Description"
          control={methods.control}
          defaultValue=""
        />

        <Input
          as={TextField}
          name="link"
          label="Link"
          control={methods.control}
          defaultValue=""
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

const Title = styled.h2`
  text-transform: uppercase;
`;

export default SideProjects;
