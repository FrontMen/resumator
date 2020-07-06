import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const createUser = functions.auth.user().onCreate(async (user) => {
  try {
    const userRef = admin.firestore().collection("users");

    const snap = await userRef.where("email", "==", user.email).get();

    let userData: {} = { registered: true };
    // Write new user if it doesn't exist
    if (snap.empty) {
      userData = {
        name: user.displayName,
        email: user.email,
        ...userData,
      };
    } else {
      let userDoc = {};

      snap.forEach((doc) => {
        userDoc = doc.data();
        doc.ref.delete().catch(() => {
          console.log("error deleting reference ");
        });
      });

      userData = {
        ...userDoc,
        ...userData,
      };
    }

    return admin.firestore().collection("users").doc(user.uid).set(userData);
  } catch (err) {
    throw new functions.https.HttpsError("failed-precondition", err.message);
  }
});
