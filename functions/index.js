require("dotenv").config({ path: ".env" });
const cors = require("cors");
const express = require("express");
const functions = require("firebase-functions");
const { connectToDatabase } = require("./services/dbconfig");
const { API_ROUTER_PATH } = require("./utils/constants.js");
const router = require("./routes/routes");

connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.use(API_ROUTER_PATH, router);

exports.innovandoLivingMP = functions.https.onRequest(app);
