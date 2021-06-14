import {
  IconButton,
  Card,
  makeStyles,
  Grid,
  Box,
  Typography,
  InputBase,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { SpacedButton } from "../../components/Material";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import { colors } from "../../config/theme";

const useStyles = makeStyles({
  input: {
    borderBottom: "1px solid",
  },
  inputEdited: {
    borderBottom: "1px solid",
    color: colors.orange,
  },
});

interface EditedSkillDictionary {
  [key: number]: string;
}

const SkillsEditorList = () => {
  const classes = useStyles();
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number>(-1);
  const [newSkill, setNewSkill] = useState<string>("");
  const [hasError, setHasError] = useState<string>("");
  const [docID, setDocId] = useState<string>("");
  const [editCount, setEditCount] = useState<number>(0);
  const [skillList, setSkillList] = useState<string[]>([]);
  const [editSkillList, setEditSkillList] = useState<EditedSkillDictionary>({});
  const { firebase } = useContext(FirebaseAppContext) as any;
  const [val] = useCollection(firebase.firestore().collection("skills"));
  const history = useHistory();

  // Get skillList from API
  useEffect(() => {
    if (val) {
      setSkillList(val.docs[0].data().skills);
      setDocId(val.docs[0].id);
    }
  }, [val]);

  /**
   * Check if value has been edited to mark for change
   * @param index number - index/key of tested value
   * @returns boolean
   */
  const didChange = (index: number): boolean => {
    return !!(editSkillList[index] && editSkillList[index] !== skillList[index]);
  };

  /**
   * Sets the correct state for editedSkill dictionary to mark the appropriate changes for update
   * @param index number - index in skillList and key for editedSkill dictionary
   * @param value string - edited value
   */
  const handleChangeSkill = (index: number, value: string): void => {
    // TODO prevent duplicates
    const edited: EditedSkillDictionary = { ...editSkillList, [index]: value };

    // If value reverted make sure to remove it from edited dictionary object
    if (edited[index] === skillList[index]) delete edited[index];

    // Get changed skills count
    const count = Object.keys(edited).length;

    setEditSkillList(edited);
    setEditCount(count);
  };

  const handleNewSkill = (Event: any): void => {
    const value = Event.target.value;
    setNewSkill(value);
  };

  /**
   * Does API call to save new array values
   * @param skills - string array, all skill values
   */
  const saveSkills = async (skills: string[]): Promise<void> => {
    try {
      const ref = await firebase.firestore().collection("skills").doc(docID);
      ref.update({ skills: skills });

      setSkillList(skills);

      if (skills.includes(newSkill)) {
        // If we added newSkill to list, reset the value
        setNewSkill("");
      } else if (skills.length === skillList.length) {
        // If we updated values reset EditList
        setEditSkillList({});
        setEditCount(0);
      }

      setHasError(hasError + "");
    } catch (error) {
      setHasError(
        hasError + "Something went wrong with saving the changes, try again! "
      );
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const saveNewSkill = (): void => {
    if (skillList.includes(newSkill)) return;
    const newSkillList = [...skillList, newSkill];
    saveSkills(newSkillList);
  };

  const deleteSkill = (index: number): void => {
    const newSkillList = [...skillList];
    newSkillList.splice(index, 1);

    saveSkills(newSkillList);
  };

  const saveEditedSkills = (): void => {
    const newSkillList = [...skillList];

    // for (const [key, value] of Object.entries(editSkillList)) {
    Object.entries(editSkillList).forEach(([key, value]) => {
      const index = parseInt(key, 10);
      newSkillList[index] = value;
    });

    saveSkills(newSkillList);
  };

  const renderConfirmation = () => {
    return (
      <Dialog
        open={openConfirmation !== false}
        onClose={() => setOpenConfirmation(false)}
      >
        <DialogTitle>Delete item: &quot;{skillList[deleteIndex]}&quot;?</DialogTitle>
        <DialogContent>
          <Box>This action cannot be reversed.</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)}>No</Button>
          <Button
            onClick={() => {
              setOpenConfirmation(false);
              deleteSkill(deleteIndex);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  /**
   * Render skills list
   * @returns jsx template
   */
  const renderList = () => {
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
                  onClick={saveNewSkill}
                >
                  Add skill
                </SpacedButton>
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
        <Grid container spacing={3}>
          {skillList.map((skill, index) => (
            <Grid item key={`${index}-${skill}`} xs={12} sm={6} md={4} lg={3}>
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
                      handleChangeSkill(index, event.target.value);
                    }}
                    placeholder="Skill"
                    className={
                      didChange(index) ? classes.inputEdited : classes.input
                    }
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      setDeleteIndex(index);
                      setOpenConfirmation(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        {renderConfirmation()}
      </>
    );
  };

  return skillList.length ? renderList() : <div>Loading...</div>;
};

export default SkillsEditorList;
