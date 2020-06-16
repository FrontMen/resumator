const admin = require("firebase-admin");

admin.initializeApp();

exports.createUser = require("./createUser.js").createUser;
