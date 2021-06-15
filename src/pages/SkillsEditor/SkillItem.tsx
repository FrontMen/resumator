import { Grid, InputBase, IconButton, Card, Box } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

interface SkillItemProps {
  handleChangeSkill: (value: string) => any;
  didChange: boolean;
  setDeleteIndex: () => any;
  setOpenConfirmation: () => any;
  skill: string;
  classes: any;
}

export const SkillItem: FunctionComponent<SkillItemProps> = ({
  handleChangeSkill,
  didChange,
  setDeleteIndex,
  setOpenConfirmation,
  skill,
  classes,
  ...props
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card elevation={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
        >
          <InputBase
            defaultValue={skill}
            onChange={(event: any) => {
              handleChangeSkill(event.target.value);
            }}
            placeholder="Skill"
            className={didChange ? classes.inputEdited : classes.input}
          />
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              setDeleteIndex();
              setOpenConfirmation();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
    </Grid>
  );
};
