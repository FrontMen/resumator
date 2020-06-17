import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import EditModalWrapper from "./ModalWrapper";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@material-ui/core";
import Card from "../Card";
import EmptyNotice from "./EmptyNotice";
import EditIcon from "./EditIcon";
import SkillsSelectFormField from "./SkillsSelectFormField";
import Chip from "@material-ui/core/Chip";

const Skills = ({ skills, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skillsState, setSkillsState] = React.useState(skills || []);
  const methods = useForm();
  const { reset, control, getValues } = methods;

  useEffect(() => {
    reset({});
  }, [skills, reset]);

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
      </SkillsContainer>

      <EmptyNotice items={skills}>
        Click on the pen icon to add new skills
      </EmptyNotice>

      <EditModalWrapper
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        methods={methods}
        contentLabel="Edit skills"
        heading="Skills"
        onPrimaryActionClicked={() => {
          const { skills } = getValues();

          onSubmit("skills", skills);
          setIsEditing(false);
        }}
        onSecondaryActionClicked={() => {
          reset({});
          setIsEditing(false);
        }}
      >
        <SkillsSelectFormField
          onSkillsChanged={setSkillsState}
          skills={skillsState}
          formControl={control}
          formRules={{ required: true }}
          name="skills"
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

const CHIP_GUTTER = 8;
const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -${CHIP_GUTTER}px;
  margin-left: -${CHIP_GUTTER}px;
`;

const CustomChip = styled(Chip)`
  margin-left: ${CHIP_GUTTER}px;
  margin-top: ${CHIP_GUTTER}px;
`;

export default Skills;
