const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())
/* Revisa que exista un archivo en public */
app.use("/",express.static(path.join(__dirname + "/public")))
app.use("/api",require("./routes"))

app.get("/healthcheck", (req, res) => res.send("Todo está ok"));

app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));

module.exports = app;
