import React from "react";
import { FirebaseAppContext } from "../context/FirebaseContext";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Home = () => {
  const { firebase, provider } = React.useContext(FirebaseAppContext);
  const history = useHistory();

  const login = async () => {
    await firebase.auth().signInWithPopup(provider);
    history.push("/overview");
  };

  return (
    <Box width="100%" p="2rem" color="white" bg="white" textAlign="center">
      <Typography variant="h3" component="h1" gutterBottom color={"primary"}>
        Frontmen CV creator
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom color={"secondary"}>
        Welcome to the Frontmen CV creator, a tool to generate Resumes
      </Typography>
      <Box marginTop={6} />
      <Button variant="contained" color="secondary" onClick={login}>
        Login with your Frontmen account
      </Button>
    </Box>
  );
};

export default Home;
