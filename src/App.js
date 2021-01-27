import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LoginLayout from "./layouts/Login";
import MainLayout from "./layouts/Main";
import Overview from "./pages/Overview";
import Home from "./pages/Home";
import FirebaseAppContextProvider from "./context/FirebaseContext";

function App() {
  return (
    <FirebaseAppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePageWrapper} />
          <Route exact path="/overview" component={OverviewWrapper} />
        </Switch>
      </BrowserRouter>
    </FirebaseAppContextProvider>
  );
}

const HomePageWrapper = (props) => (
  <LoginLayout>
    <Home {...props} />
  </LoginLayout>
);

const OverviewWrapper = (props) => (
  <MainLayout>
    <Overview {...props} />
  </MainLayout>
);

export default App;
