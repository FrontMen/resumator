import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LoginLayout from "./layouts/Login";
import MainLayout from "./layouts/Main";

import Overview from "./pages/Overview";
import Home from "./pages/Home";
import PdfPreviewer from "./pages/PdfPreviewer";
import FirebaseAppContextProvider from "./context/FirebaseContext";
import HTMLPreviewer from "./pages/HTMLPreviewer";
import LivePreviewer from "./pages/LivePreviewer";
import Creator from "./pages/Creator";

const {
  REACT_APP_FIREBASE_API_KEY: apiKey,
  REACT_APP_FIREBASE_AUTH_DOMAIN: authDomain,
  REACT_APP_FIREBASE_DATABASE_URL: databaseURL,
  REACT_APP_FIREBASE_PROJECT_ID: projectId,
  REACT_APP_FIREBASE_STPRAGE_BUCKET: storageBucket,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: messagingSenderId,
  REACT_APP_FIREBASE_APP_ID: appId,
} = process.env;

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};
function App() {
  return (
    <FirebaseAppContextProvider config={firebaseConfig}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePageWrapper} />
          <Route exact path="/overview" component={OverviewWrapper} />
          <Route exact path="/live/:id" component={LivePreviewerWrapper} />
          <Route exact path="/creator" component={CreatorWrapper} />
          <Route exact path="/previewer/:id" component={PdfPreviewer} />
          <Route exact path="/html-previewer" component={HTMLPreviewerWrapper} />
          <Route exact path="/pdf-previewer" component={PdfPreviewer} />
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

export default App;
