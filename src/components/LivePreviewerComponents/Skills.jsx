import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Card from "../Card";
import { useForm } from "react-hook-form";
import EditModalWrapper from "./ModalWrapper";
import EditIcon from "./EditIcon";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@material-ui/core";
import CustomChip from "./CustomChip";
import EmptyNotice from "./EmptyNotice";
import SkillsSelect from "./SkillsSelect";

const Skills = ({ skills, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skillsState, setSkillsState] = React.useState(skills || []);
  const methods = useForm({});
  const { reset, getValues } = methods;

  useEffect(() => {
    reset({});
  }, [skills, getValues, reset]);

  return (
    <StyledCard>
      <Typography gutterBottom variant="h4">
        Skills
      </Typography>
      <EditIcon
        className="add-new-button"
        onClick={() => setIsEditing((prevState) => !prevState)}
        icon={faPen}
      />
      <SkillsContainer>
        {skills.map((skill) => (
          <CustomChip
            key={skill.name}
            size="small"
            variant="outlined"
            label={skill.name}
            color="secondary"
          />
        ))}

        <EmptyNotice items={skills}>
          Click on the pen icon to add new skills
        </EmptyNotice>
      </SkillsContainer>

      <EditModalWrapper
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        methods={methods}
        contentLabel="Edit skills"
        heading="Skills"
        onPrimaryActionClicked={() => {
          onSubmit("skills", skillsState);
          setIsEditing(false);
        }}
        onSecondaryActionClicked={() => {
          reset({});
          setIsEditing(false);
        }}
      >
        <SkillsSelect
          onSkillsChanged={setSkillsState}
          skills={skillsState}
          label="Skills"
        />
      </EditModalWrapper>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  &:hover {
    .add-new-button {
      visibility: visible;
    }
  }
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
`;

export default Skills;
