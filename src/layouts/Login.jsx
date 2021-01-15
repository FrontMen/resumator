import React from "react";
import "../assets/css/global.css";
import theme from "../config/theme";
import frontmenLogo from "../assets/svg/frontmen-logo.svg";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

const LoginLayout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div>
      <CssBaseline />
      <AppBar position="static" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <img src={frontmenLogo} alt="logo" style={{ height: 100 }} />
      </AppBar>
      <main>{children}</main>
    </div>
  </ThemeProvider>
);

export default LoginLayout;
