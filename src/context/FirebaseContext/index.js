import React from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export const FirebaseAppContext = React.createContext({
  firebase: {},
  initializing: true,
  user: {},
});

const FirebaseAppContextProvider = ({ children, config }) => {
  const [firebaseApp, setFirebaseApp] = React.useState({});
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const app = firebase.initializeApp(config);
    setFirebaseApp(app.firebase_);
    setInitializing(false);
  }, [config]);

  if (initializing) return null;

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  googleAuthProvider.setCustomParameters({
    hd: "frontmen.nl",
  });

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // get the corresponding user record from the database
      // before setting the user object to the context
      // because we gonna need to know if it's a manager or not
      const docRef = firebase.firestore().collection("users").doc(user.uid);
      docRef
        .get()
        .then((userRec) => {
          Object.assign(user, { userRec: userRec.data() });
          setUser(user);
        })
        .catch(() => {
          setUser(user);
        });
    } else {
      setUser(null);
    }
  });

  return (
    <FirebaseAppContext.Provider
      value={{
        firebase: firebaseApp,
        initializing,
        provider: googleAuthProvider,
        user,
      }}
    >
      {children}
    </FirebaseAppContext.Provider>
  );
};

export default FirebaseAppContextProvider;
