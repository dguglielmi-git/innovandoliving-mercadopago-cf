require('dotenv').config({ path: '.env' })
const cors = require('cors')
const express = require('express')
const functions = require('firebase-functions')
const { connectToDatabase } = require('./services/dbconfig')
const { API_ROUTER_PATH } = require('./utils/constants')
const router = require('./routes/routes')

connectToDatabase()

const app = express()
app.use(cors())
app.use(API_ROUTER_PATH, express.json(), router)

exports.innovandoLivingMP = functions.https.onRequest(app)
