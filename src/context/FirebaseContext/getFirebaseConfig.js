import axios from "axios";

export default function () {
  if (process.env.NODE_ENV === "production") {
    return new Promise((resolve, reject) => {
      axios
        .get("/__/firebase/init.json")
        .then((response) => {
          resolve(response.data);
        })
        .catch(reject);
    });
  } else {
    return new Promise((resolve) => {
      resolve({
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      });
    });
  }
}
