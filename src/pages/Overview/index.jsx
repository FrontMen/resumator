import React, { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FirebaseAppContext } from "../../context/FirebaseContext";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import tableIcons from "./constants/tableIcons";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import styled from "@emotion/styled";
import downloadResume from "../../lib/downloadResume";
import getAvatarDataUri from "../../lib/getAvatarDataUri";

const useStyles = makeStyles(() => ({
  activeIcon: {
    marginBottom: -2,
    paddingRight: 5,
    fontSize: 14,
  },
  inlineList: {
    display: "inline",
  },
  miniAvatar: {
    height: 40,
  },
  skillList: {
    margin: 0,
    padding: 0,
  },
  emptyNotice: {
    fontSize: 12,
    fontStyle: "italic",
    opacity: 0.8,
  },
}));

const getColumns = (classes) => [
  {
    title: "",
    field: "avatar",
    width: 40,
    render: function RenderAvatar(rowData) {
      return (
        <img
          alt="avatar"
          src={getAvatarDataUri(rowData.personalia.avatar)}
          className={classes.miniAvatar}
        />
      );
    },
  },
  {
    title: "Name",
    field: "personalia.lastName",
    render: (rowData) => {
      return `${rowData.isImport ? "* " : ""}
        ${rowData.personalia.firstName} ${rowData.personalia.lastName}`;
    },
  },
  { title: "City", field: "personalia.city" },
  {
    title: "Skills",
    field: "skills",
    render: function RenderSkills({ skills }) {
      if (!skills || skills.length === 0) {
        return (
          <span className={classes.emptyNotice}>
            No skills have been supplied yet
          </span>
        );
      }

      const skillList = skills.map(({ id, name }, i) => (
        <li className={classes.inlineList} key={`${id}-${i}`}>
          {(i ? ", " : "") + name}
        </li>
      ));
      return <ul className={classes.skillList}>{skillList}</ul>;
    },
  },
  {
    title: "Status",
    field: "active",
    type: "boolean",
    render: function RenderStatus(rowData) {
      return rowData.active ? (
        <span>
          <FiberManualRecordIcon color="primary" className={classes.activeIcon} />
          Active
        </span>
      ) : (
        <span style={{ color: "gray" }}>
          <FiberManualRecordIcon color="disabled" className={classes.activeIcon} />
          Inactive
        </span>
      );
    },
  },
];

const Home = ({ searchText }) => {
  const classes = useStyles();
  const { firebase, user } = useContext(FirebaseAppContext);

  let query = firebase.firestore().collection("resumes");
  if (user && user.userRec && user.userRec.isManager !== true) {
    query = query.where("personalia.email", "==", user.email);
  }

  const [val, loading, error] = useCollection(query);
  // id key isn't in the data by default, so merging it like this
  let data = val && val.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const readyToRender = !loading && !error;

  const history = useHistory();
  const goTo = (path) => history.push(path);

  if (readyToRender && data.length === 1) {
    goTo(`/live/${data[0].id}`);
  }

  const filterInputHandler = (value) => {
    const newfilterText = value.toLowerCase().trim();
    data = data.filter(({ personalia, skills }) => {
      if (personalia) {
        const isInPersonalia = Object.values(personalia).some((v) =>
          v.toString().toLowerCase().trim().includes(newfilterText)
        );
        if (isInPersonalia) return true;
      }
      if (skills) {
        const isInSkills = Object.values(skills).some((v) =>
          v.name.toString().toLowerCase().trim().includes(newfilterText)
        );
        if (isInSkills) return true;
      }
      return false;
    });
  };

  if (searchText && data && readyToRender) {
    searchText.forEach((searchTerm) => {
      filterInputHandler(searchTerm);
    });
  }

  // Todo: make notification
  if (error) {
    console.error(error);
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <StyledButton href="/creator" variant="contained" color="primary">
          Add Resume
        </StyledButton>
      </Grid>

      {readyToRender && data && (
        <Grid item xs={12}>
          <MaterialTable
            options={{
              search: false,
              actionsColumnIndex: -1,
              pageSize: 10,
              pageSizeOptions: [10, 15, 25, 50],
            }}
            icons={tableIcons}
            columns={getColumns(classes)}
            data={data}
            title="Resumes Overview"
            actions={[
              {
                icon: tableIcons.Edit,
                tooltip: "Edit resume",
                onClick: (event, rowData) => goTo(`./live/${rowData.id}`),
              },
              {
                icon: tableIcons.GetAppIcon,
                tooltip: "Download PFD",
                onClick: (event, rowData) => downloadResume(rowData),
              },
            ]}
            localization={{
              header: {
                actions: "",
              },
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

const StyledButton = styled(Button)`
  float: right;
  margin-bottom: 30px;
`;

export default Home;
