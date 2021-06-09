import React, { FunctionComponent, useState } from "react";
import { Box } from "@material-ui/core";
import { TruncateChip } from "../Material/truncatedChip";
import { Section } from "./Section";
import { SectionEditDialog } from "./SectionEditDialog";
import { FormColumn, FormRow, FormSkillsSelect } from "../Form";
import { useCollection } from "react-firebase-hooks/firestore";
import { FirebaseAppContext } from "../../context/FirebaseContext";

export interface SkillModel {
  name: string;
}
interface SkillsProps {
  skills: SkillModel[];
  onSubmit: (skills: SkillModel[]) => void;
}

export const Skills: FunctionComponent<SkillsProps> = ({ skills, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { firebase } = React.useContext(FirebaseAppContext) as any;

  const [val, isLoading, error] = useCollection(
    firebase.firestore().collection("resumes")
  );
  const skillList: string[] = React.useMemo(() => (val ? val.docs[0].data() : []), [
    val,
  ]);

  return (
    <Section
      title="Skills"
      action="edit"
      actionTooltip="Edit skills"
      actionOnClick={() => setIsEditing(true)}
    >
      <div>
        {skillList.length &&
          skillList.map((skillItem, index) => <span key={index}>{skillItem}</span>)}
      </div>
      <Box display="flex" flexWrap="wrap" gridGap={8}>
        {skills.map((skill) => (
          <TruncateChip
            key={skill.name}
            size="small"
            variant="outlined"
            label={skill.name}
            color="secondary"
          />
        ))}
      </Box>

      <SectionEditDialog
        title="Skills"
        data={{ skills }}
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onSave={(data) => {
          setIsEditing(false);
          onSubmit(data.skills);
        }}
      >
        <FormColumn>
          <FormRow>
            <FormSkillsSelect name="skills" />
          </FormRow>
        </FormColumn>
      </SectionEditDialog>
    </Section>
  );
};
