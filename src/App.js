import React from "react";

import FirebaseAppContextProvider from "./context/FirebaseContext";
import Routes from "./routes";

function App() {
  return (
    <FirebaseAppContextProvider>
      <Routes />
    </FirebaseAppContextProvider>
  );
}

export default App;
