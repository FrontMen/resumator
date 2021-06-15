import { makeStyles, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import { colors } from "../../config/theme";
import { SkillItem } from "./SkillItem";
import { SkillHeader } from "./SkillHeader";
import { Confirmation } from "../../components/Confirmation/Confirmation";

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
  const [hasError, setHasError] = useState<boolean>(false);
  const [docID, setDocId] = useState<string>("");
  const [editCount, setEditCount] = useState<number>(0);
  const [skillList, setSkillList] = useState<string[]>([]);
  const [editSkillList, setEditSkillList] = useState<EditedSkillDictionary>({});
  const { firebase } = useContext(FirebaseAppContext) as any;
  const [val] = useCollection(firebase.firestore().collection("skills"));

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

      setHasError(false);
    } catch (error) {
      setHasError(true);
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const saveNewSkill = (event: any): void => {
    event.preventDefault();
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
      <Confirmation
        isOpen={openConfirmation}
        denyClick={() => setOpenConfirmation(false)}
        confirmClick={() => {
          setOpenConfirmation(false);
          deleteSkill(deleteIndex);
        }}
        title={`Delete item: "${skillList[deleteIndex]}"?`}
      />
    );
  };

  /**
   * Render skills list
   * @returns jsx template
   */
  const renderList = () => {
    return (
      <>
        <SkillHeader
          hasError={hasError}
          saveNewSkill={saveNewSkill}
          newSkill={newSkill}
          classes={classes}
          handleNewSkill={handleNewSkill}
          editCount={editCount}
          saveEditedSkills={saveEditedSkills}
        />
        <Grid container spacing={3}>
          {skillList.map((skill, index) => (
            <SkillItem
              key={`${index}-${skill}`}
              handleChangeSkill={(newValue: string) =>
                handleChangeSkill(index, newValue)
              }
              didChange={didChange(index)}
              setDeleteIndex={() => setDeleteIndex(index)}
              setOpenConfirmation={() => setOpenConfirmation(true)}
              skill={skill}
              classes={classes}
            />
          ))}
        </Grid>
        {renderConfirmation()}
      </>
    );
  };

  return skillList.length ? renderList() : <div>Loading...</div>;
};

export default SkillsEditorList;
