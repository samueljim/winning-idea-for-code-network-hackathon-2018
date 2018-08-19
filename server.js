const express = require("express");
const logger = require("morgan");
const chalk = require("chalk");
const path = require("path");
const fs = require('fs');
const bodyParser = require("body-parser");
const ob = require('./HTML.json');
var obj = require('./cssNames.json');
const removeEmptyLines = require("remove-blank-lines");

const thiccify = require('./thiccify.js');

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

app.post("/", function (req, res, next) {
    var code = req.body.code;
    // console.log(code);
    var results = {};
    var run;
    if (req.body.codeType === 'css') {
        try {
            //Does all the css crap that nobody should every have to read.
            let data = removeEmptyLines(code);
            data = data.replace(new RegExp('{', 'g'), '{\n');
            data = data.replace(new RegExp('}', 'g'), '\n}\n');
            for (var property in obj) {
                if (obj.hasOwnProperty(property)) {
                    var comment = "\n\t/*" + obj[property] + "*/\n\t" + property + ":";
                    data = data.replace(new RegExp(" " + property + ":", 'g'), comment);
                }
            }
            results.code = data;
            results.msg = "Thiccified: " + (((results.code.length / code.length) * 10000) | 0) / 100 + "% of original size";

            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json(error)
        }
    } else if (req.body.codeType === 'html') {
        try {
            let data = code;
            //let results = data;
            data = data.replace(/<!--[\S ]*-->/g, '');
            for (var property in ob) {
                if (ob.hasOwnProperty(property)) {
                    // console.log(prop);
                    var prop = property.slice(0, -1);
                    var comment = "\n<!-- " + ob[property] + "-->\n" + prop;
                    //data = data.replace(new RegExp(prop+'[> ]', 'g'), comment);
                    data = data.replace(new RegExp(prop + '>', 'g'), comment + '>');
                    data = data.replace(new RegExp(prop + ' ', 'g'), comment + ' ');

                }
            }
            results.code = data;
            results.msg = "Thiccified: " + (((results.code.length / code.length) * 10000) | 0) / 100 + "% of original size";

            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        try {
            run = thiccify.run(code);
            // console.log(run);
            results = thiccify.unRoll(run.code);

            results.msg = "Thiccified: " + (((results.code.length / code.length) * 10000) | 0) / 100 + "% of original size";


            return res.status(200).json(results);

        } catch (error) {
            return res.status(500).json(error)
        }

    }
});


app.listen(port);
console.log(chalk.yellow("Server started! At http://localhost:" + (port)));