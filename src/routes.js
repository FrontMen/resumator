import React, { useContext } from "react";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import LoginLayout from "./layouts/Login";
import MainLayout from "./layouts/Main";

import { FirebaseAppContext } from "./context/FirebaseContext";

import Overview from "./pages/Overview";
import Home from "./pages/Home";
import PdfPreviewer from "./pages/PdfPreviewer";
import HTMLPreviewer from "./pages/HTMLPreviewer";
import LivePreviewer from "./pages/LivePreviewer";
import Creator from "./pages/Creator";

const AuthRoute = (props) => {
  const { type } = props;
  const { user } = useContext(FirebaseAppContext);

  const isAuthUser = !!user;

  if (type === "private" && !isAuthUser) return <Redirect to="/" />;

  return <Route {...props} />;
};

const Routes = () => {
  const { user } = useContext(FirebaseAppContext);

  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route exact path="/" component={HomePageWrapper} />
        <AuthRoute
          exact
          path="/overview"
          component={OverviewWrapper}
          type="private"
        />
        <AuthRoute
          exact
          path="/live/:id"
          component={LivePreviewerWrapper}
          type="private"
        />
        <AuthRoute exact path="/creator" component={CreatorWrapper} type="private" />
        <AuthRoute
          exact
          path="/pdf-preview/:id/"
          component={PdfPreviewer}
          type="private"
        />
        <AuthRoute
          exact
          path="/html-previewer"
          component={HTMLPreviewerWrapper}
          type="private"
        />
        <Route exact path="/404" render={() => <h1>404</h1>} />
        <Route404 />
      </Switch>
    </BrowserRouter>
  );
};

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

const LivePreviewerWrapper = (props) => (
  <MainLayout>
    <LivePreviewer {...props} />
  </MainLayout>
);

const CreatorWrapper = (props) => (
  <MainLayout>
    <Creator {...props} />
  </MainLayout>
);

const HTMLPreviewerWrapper = (props) => (
  <LoginLayout>
    <HTMLPreviewer {...props} />
  </LoginLayout>
);

const Route404 = () => {
  /* @TODO: Make proper  404. */
  return (
    <Route
      path="*"
      render={() => {
        window.location.href = "/404";

        return null;
      }}
    />
  );
};

export default Routes;
