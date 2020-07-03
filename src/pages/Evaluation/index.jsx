import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Fade, Modal, Typography, ListItem } from "@material-ui/core";
import styled from "@emotion/styled";
import tableIcons from "../Overview/constants/tableIcons";
import { colors } from "../../config/theme";

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
    title: "Name Employee",
    field: "employee_name",
  },
  { title: "Name of project", field: "project_name" },
  {
    title: "Employment Period",
    field: "employment_period",
  },
  {
    title: "Role Employee",
    field: "role_employer",
  },
  {
    title: "Name Evaluator",
    field: "evaluator_name",
  },
  {
    title: "Role Evaluator",
    field: "evaluator_role",
  },
];

const Evaluation = ({ searchText }) => {
  const classes = useStyles();
  const [evaluation, setEvaluation] = React.useState(false);

  const data = [
    {
      employee_name: "Anis Derbel",
      project_name: "Quin",
      employment_period: "01/07/2019 - 31/06/2020",
      role_employer: "",
      evaluator_name: "Dave",
      evaluator_role: "Manager",
    },
    {
      employee_name: "Anis Derbel",
      project_name: "Quin",
      employment_period: "01/07/2019 - 31/06/2020",
      role_employer: "",
      evaluator_name: "Dave",
      evaluator_role: "Manager",
    },
    {
      employee_name: "Anis Derbel",
      project_name: "Quin",
      employment_period: "01/07/2019 - 31/06/2020",
      role_employer: "",
      evaluator_name: "Dave",
      evaluator_role: "Manager",
    },
    {
      employee_name: "Anis Derbel",
      project_name: "Quin",
      employment_period: "01/07/2019 - 31/06/2020",
      role_employer: "",
      evaluator_name: "Dave",
      evaluator_role: "Manager",
    },
    {
      employee_name: "Anis Derbel",
      project_name: "Quin",
      employment_period: "01/07/2019 - 31/06/2020",
      role_employer: "",
      evaluator_name: "Dave",
      evaluator_role: "Manager",
    },
  ];
  return (
    <Grid container>
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
          title="Evaluations"
          actions={[
            {
              icon: tableIcons.DetailPanel,
              tooltip: "Details",
              onClick: (event, rowData) => setEvaluation(rowData),
            },
          ]}
          localization={{
            header: {
              actions: "",
            },
          }}
        />
      </Grid>
      <CustomModal
        open={!!evaluation}
        onClose={() => setEvaluation(false)}
        aria-labelledby="modal"
        aria-describedby="modal"
      >
        <Fade in={!!evaluation}>
          <ModalContent fullWidth>
            <ScrollableWrapper>
              <Grid>
                <ListItem flexDirection="row">
                  <CustomTitle color="primary">Name Employee : </CustomTitle>
                  <Typography>{evaluation?.employee_name}</Typography>
                </ListItem>
                <ListItem flexDirection="row">
                  <CustomTitle color="primary">Name Project : </CustomTitle>
                  <Typography>{evaluation?.project_name}</Typography>
                </ListItem>
                <ListItem flexDirection="row">
                  <CustomTitle color="primary">Employment period : </CustomTitle>
                  <Typography>{evaluation?.employment_period}</Typography>
                </ListItem>
                <ListItem flexDirection="row">
                  <CustomTitle color="primary">Role Employer : </CustomTitle>
                  <Typography>{evaluation?.role_employer}</Typography>
                </ListItem>
                <ListItem flexDirection="row">
                  <CustomTitle color="primary">Evaluator Name : </CustomTitle>
                  <Typography>{evaluation?.evaluator_name}</Typography>
                </ListItem>
                <ListItem flexDirection="row">
                  <CustomTitle color="primary">Evaluator Role : </CustomTitle>
                  <Typography>{evaluation?.evaluator_role}</Typography>
                </ListItem>
                <StyledButton
                  variant="contained"
                  onClick={() => setEvaluation(false)}
                >
                  Close
                </StyledButton>
              </Grid>
            </ScrollableWrapper>
          </ModalContent>
        </Fade>
      </CustomModal>
    </Grid>
  );
};

const StyledButton = styled(Button)`
  float: right;
  margin-bottom: 30px;
`;
const CustomTitle = styled(Typography)`
  color: ${colors.darkBlue};
  font-weight: bold;
`;
const CustomModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 6px;
  margin: 48px;
  max-width: 1200px;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  &:focus {
    outline: none;
  }
`;

const ScrollableWrapper = styled.div`
  overflow: auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default Evaluation;
