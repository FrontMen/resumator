import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { PartialResume } from "../../types/Resume";

const RESUME_COLLECTION = "resumes";
const USER_COLLECTION = "users";

export const createUser = functions.auth.user().onCreate(async (user) => {
  const { email } = user;
  try {
    const userCollection = admin.firestore().collection(USER_COLLECTION);
    const resumeCollection = admin.firestore().collection(RESUME_COLLECTION);

    const userSnapshot = await userCollection.where("email", "==", email).get();
    const resumeSnapshot = await resumeCollection.where("email", "==", email).get();

    let userData: {} = { registered: true };
    let userPromise;
    let resumePromise;
    // Create resume if none exist for user
    if (resumeSnapshot.empty) {
      const resume: PartialResume = {
        personalia: {
          email: email,
        },
      };
      resumePromise = resumeCollection.doc().set(resume);
    }

    // Write new user if none exist
    if (userSnapshot.empty) {
      userData = {
        name: user.displayName,
        email: email,
        ...userData,
      };
    } else {
      let userDoc = {};

      userSnapshot.forEach((doc) => {
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

    userPromise = userCollection.doc(user.uid).set(userData);
    return Promise.all([resumePromise, userPromise]);
  } catch (err) {
    throw new functions.https.HttpsError("failed-precondition", err.message);
  }
});
