import { Grid, Box, Typography, InputBase } from "@material-ui/core";
import { SpacedButton } from "../../components/Material";
import { colors } from "../../config/theme";
import { useHistory } from "react-router-dom";
import React, { FunctionComponent } from "react";

interface SkillHeaderProps {
  hasError: boolean;
  saveNewSkill: (event: any) => any;
  newSkill: string;
  classes: any;
  editCount: number;
  saveEditedSkills: () => any;
  handleNewSkill: (event: any) => any;
}

export const SkillHeader: FunctionComponent<SkillHeaderProps> = ({
  hasError,
  saveNewSkill,
  newSkill,
  classes,
  handleNewSkill,
  editCount,
  saveEditedSkills,
  ...props
}) => {
  const history = useHistory();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Typography variant="h3" component="h1">
              Skills
            </Typography>
            <SpacedButton
              color="primary"
              variant="contained"
              marginLeft={2}
              onClick={() => history.push("/live")}
            >
              Go to overview
            </SpacedButton>
          </Box>
          {hasError && <p color={colors.orange}>Something went wrong</p>}
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            height="100%"
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
            alignItems={{ xs: "flex-start", md: "center" }}
          >
            <Box
              height="100%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              marginBottom={{ xs: 2, md: 0 }}
            >
              <form onSubmit={saveNewSkill}>
                <InputBase
                  placeholder="Skill name"
                  value={newSkill}
                  className={classes.input}
                  onChange={handleNewSkill}
                />
                <SpacedButton
                  variant="contained"
                  color="secondary"
                  marginLeft={2}
                  disabled={!newSkill}
                  type="submit"
                >
                  Add skill
                </SpacedButton>
              </form>
            </Box>
            <Box
              height="100%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <SpacedButton
                variant="contained"
                color="secondary"
                marginLeft={{ md: 2 }}
                disabled={!editCount}
                onClick={saveEditedSkills}
              >
                Update skills ({editCount})
              </SpacedButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <br />
    </>
  );
};
