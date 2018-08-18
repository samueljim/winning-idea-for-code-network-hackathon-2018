const express = require("express");
const logger = require("morgan");
const chalk = require("chalk");
const path = require("path");
const fs = require('fs');
const bodyParser = require("body-parser");

const thiccify = require('./thiccify');

var app = express();
// clear console for clean output
console.clear();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

var port = process.env.PORT || 4000;
app.set("views", "./views");
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", function (req, res) {
    return res.sendFile(path.join(__dirname, './views/index.html'));
});

app.post("/", function (req, res) {
    let results = thiccify.minify(req.code);
    return res.json(results);
});


app.listen(port);
console.log(chalk.yellow("Server started! At http://localhost:" + (port)));