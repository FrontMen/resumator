const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.createUser = functions.auth.user().onCreate(async (user) => {
  try {
    const userRef = admin.firestore().collection("users");

    const snap = await userRef.where("email", "==", user.email).get();

    let userData = { registered: true };
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
        doc.ref.delete();
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
