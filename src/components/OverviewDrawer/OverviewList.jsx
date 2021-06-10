import React from "react";
import getAvatarDataUri from "../../lib/getAvatarDataUri";
import { useCollection } from "react-firebase-hooks/firestore";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import { TooltipIconButton } from "../Material";
import Tooltip from "@material-ui/core/Tooltip";
import { colors } from "../../config/theme";

export const useSectionItemHeaderStyles = makeStyles({
  actions: {
    opacity: 0,
    transition: "opacity 150ms ease-out",
    pointerEvents: "none",
    alignSelf: "start",
    flexShrink: 0,
  },
  container: {
    "&:hover $actions": {
      opacity: 1,
      pointerEvents: "all",
    },
  },
  link: {
    color: colors.darkBlue,
    textDecoration: "none",
  },
  isImported: {
    color: colors.darkGray,
    textDecoration: "none",
  },
  importedWarning: {
    verticalAlign: "middle",
    fontSize: "1.2rem",
  },
  activeLink: {
    color: colors.orange,
  },
});

function refreshResumeData(oldData, newData, setData) {
  const data1 = JSON.stringify(oldData);
  const data2 = JSON.stringify(newData);
  if (data1 !== data2) {
    setData(newData);
  }
}

function twoWayFind(value, arr) {
  const isEmptyValue = !value;
  if (isEmptyValue) return false;

  const str = value.toString().toLowerCase().trim();
  const stringifiedArray = arr.join(" ").toLowerCase();

  const stringisInStringArray = stringifiedArray.includes(str);
  const stringiedArrayIsInString = str.includes(stringifiedArray);

  return stringisInStringArray || stringiedArrayIsInString;
}

export const OverviewList = ({ firebase, query, searchTerms, user }) => {
  const [val, isLoading, error] = useCollection(query);
  const [resumeOverviewData, setResumeOverviewData] = React.useState([]);
  const hasFetchError = !isLoading && error;
  const normalizedSearchTerms = []
    .concat(searchTerms)
    .map((s) => s.toLowerCase().trim());
  const resumes = React.useMemo(
    () => (val ? val.docs.map((doc) => ({ ...doc.data(), id: doc.id })) : []),
    [val]
  );
  const classes = useSectionItemHeaderStyles();

  const deleteResume = (resume) => {
    if (resume && resume.id) {
      firebase
        .firestore()
        .collection("resumes")
        .doc(resume.id)
        .delete()
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error("Error removing document: ", error);
        });
    }
  };

  const renderResume = () => {
    if (!resumeOverviewData.length) return;
    return (
      <List dense={true} data-testid="overview-list">
        {resumeOverviewData
          .filter((resume) => resume.personalia && resume)
          .map((resume) => {
            const { id, personalia, isImport } = resume;
            const { firstName, lastName, avatar } = personalia;

            let name =
              firstName || lastName ? `${firstName} ${lastName}` : `No name - ${id}`;

            return (
              <ListItem key={id} classes={{ container: classes.container }}>
                <ListItemAvatar>
                  <Avatar>
                    <img alt="avatar" width="15" src={getAvatarDataUri(avatar)} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <NavLink
                    className={isImport ? classes.isImported : classes.link}
                    activeClassName={classes.activeLink}
                    to={`/live/${id}`}
                  >
                    {name}
                    {isImport && (
                      <>
                        &nbsp;
                        <Tooltip title="is imported">
                          <ReportProblemOutlinedIcon
                            className={classes.importedWarning}
                          />
                        </Tooltip>
                      </>
                    )}
                  </NavLink>
                </ListItemText>
                <ListItemSecondaryAction className={classes.actions}>
                  <TooltipIconButton
                    color="inherit"
                    tooltip={"Delete resume"}
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteResume(resume)}
                  >
                    <DeleteIcon fontSize="small" />
                  </TooltipIconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
      </List>
    );
  };

  if (!searchTerms.length && resumes.length) {
    refreshResumeData(resumeOverviewData, resumes, setResumeOverviewData);
  }

  if (searchTerms.length) {
    const filteredResumes = resumes.filter(({ personalia }) => {
      if (personalia) {
        const personaliaValues = Object.values(personalia);
        const isInPersonalia = personaliaValues.some((value) => {
          const hasValue = twoWayFind(value, normalizedSearchTerms);
          return hasValue;
        });
        if (isInPersonalia) return true;
      }

      return false;
    });
    refreshResumeData(resumeOverviewData, filteredResumes, setResumeOverviewData);
  }

  if (!user || !val) return null;

  return (
    <>
      {hasFetchError && (
        <span>
          Could not fetch resume data. If this problem persists, notify application
          maintainer
        </span>
      )}

      {renderResume()}
    </>
  );
};
