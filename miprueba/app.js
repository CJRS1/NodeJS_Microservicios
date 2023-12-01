const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use("/healthcheck",
    (req, res) =>
        res.send("All is ok"))

module.exports = app