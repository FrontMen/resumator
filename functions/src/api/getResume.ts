import { ParsedQs } from "../types";

const admin = require("firebase-admin");

export const getResume = async (uid: string | string[] | ParsedQs | ParsedQs[]) => {
  const id = uid.toString();
  const document = await admin.firestore().collection("resumes").doc(id).get();

  return document.data();
};
