import * as admin from "firebase-admin";

import { createUser } from "./createUser";

admin.initializeApp();

exports.createUser = createUser;
