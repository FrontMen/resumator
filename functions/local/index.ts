import { readdirSync } from "fs";
import { extname, join as joinPath } from "path";

import * as firebase from "firebase-admin";
import "firebase/firestore";

import importDocx from "./importDocx";

interface Options {
  mode?: "import";
  dir?: string;
}
const MODES = ["import"];
const FLAGS = ["dir"];
let options: Options = {};

const RESUME_COLLECTION = "resumes";
let db: FirebaseFirestore.Firestore;

try {
  options = initOptions();
  db = initFirestore();
} catch (e) {
  console.error(e);
  process.exit(0); // Easily recoverable error, no need to be -1 about it
}

const directory = joinPath(process.cwd(), options.dir || "");
const promises = readdirSync(directory)
  .filter((file) => extname(file) === ".docx")
  .map((filename) => joinPath(directory, filename))
  .map((s) => {
    console.log(`Importing "${s}"`);
    return s;
  })
  .map(importDocx)
  .map((resume) => addToDB(RESUME_COLLECTION, resume));

Promise.all(promises)
  .then((results) => {
    console.log(`Successfully imported ${results.length} resumes`);
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(-1);
  });

function initFirestore() {
  try {
    firebase.initializeApp({
      credential: firebase.credential.cert(require("../../credentials.json")),
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    });
  } catch (e) {
    throw new Error(
      "Missing credentials in root project folder. Get service account credentials here: " +
        "https://console.firebase.google.com/project/fm-resume/settings/serviceaccounts/adminsdk\n"
    );
  }

  return firebase.firestore();
}

function initOptions(): Options {
  const options: Options = process.argv.reduce(
    (acc, arg) => ({
      ...acc,
      ...modeToOption(arg),
      ...flagToOption(arg),
    }),
    {}
  );

  if (!options.dir) {
    throw new Error(
      "Missing a directory to look for documents.\n" +
        "Try passing a directory:\n" +
        "  npm run import -- --dir=./"
    );
  }
  return options;
}
function modeToOption(arg: string) {
  return MODES.indexOf(arg) !== -1 ? { mode: arg } : {};
}
function flagToOption(arg: string) {
  const option = FLAGS.map((flag) => new RegExp(`--(${flag})=(.+)`))
    .map((regex) => regex.exec(arg))
    .find((results) => !!results);

  return option && option.length === 3 ? { [option[1]]: option[2] } : {};
}

async function addToDB(collection: string, resumePromise: Promise<any>) {
  const resume = await resumePromise;
  return db.collection(collection).doc().set(resume);
}
