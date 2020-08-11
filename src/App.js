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
import PDFDownload from "./pages/PDFDownload/PDFDownload";

function App() {
  return (
    <FirebaseAppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePageWrapper} />
          <Route exact path="/overview" component={OverviewWrapper} />
          <Route exact path="/live/:id" component={LivePreviewerWrapper} />
          <Route exact path="/creator" component={CreatorWrapper} />
          <Route exact path="/pdf-preview/:id" component={PdfPreviewer} />
          <Route exact path="/pdf-download/:id" component={PDFDownload} />
          <Route exact path="/html-previewer" component={HTMLPreviewerWrapper} />
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
