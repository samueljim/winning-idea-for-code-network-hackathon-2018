"use strict";
const vscode = require('vscode');
const thiccify = require('./thiccify.js');

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const removeEmptyLines = require("remove-blank-lines");
const ob = require('./HTML.json');




//register on activation
function activate(context) {
  let sendFileOut = function (fileName, data, stats) {
    fs.writeFile(fileName, data, "utf8", () => {
      let status = "Thiccified: " + stats.files + " files";
      if (stats.length) status = "Thiccified: " + (((data.length / stats.length) * 10000) | 0) / 100 +
        "% of original" + (stats.errors ? " but with errors." : (stats.warnings ? " but with warnings." : "."));
      vscode.window.setStatusBarMessage(status, 10000);
    });
  };
  let doThiccify = function (document) {
    let outName = document.fileName.split('.');
    const ext = outName.pop();
    outName.push("max");
    outName.push(ext);
    outName = outName.join('.');
    let data = document.getText();
    //if the document is empty here, we output an empty file to the max point
    if (!data.length) return sendFileOut(outName, "", {
      length: 1
    });
    //what are we Thiccifying?
    const isJS = ext.toLocaleLowerCase() === 'js';
    const isCSS = ext.toLocaleLowerCase() === 'css';
    const isHTML = ext.toLocaleLowerCase() === 'html' || ext.toLocaleLowerCase() === 'htm';
    if (isJS) {
      // let opts = settings.js;
      // opts.fromString = true;
      try {
        console.log(chalk.green("Input", data));

        let results = thiccify.run(data);

        console.log(chalk.red("Output", results.code));
        // console.log(chalk.red("Mapping", results.map));

        sendFileOut(outName, results.code, {
          length: data.length
        });
      } catch (e) {
        vscode.window.setStatusBarMessage("Thiccify failed: " + e.message, 5000);
      }
    } else if (isCSS) {
      vscode.window.setStatusBarMessage("Thiccify failed: That's css", 5000);
      try {

        //Does all the css crap that nobody should every have to read.
        data = removeEmptyLines(data);
        data = data.replace(new RegExp('{', 'g'), '{\n');
        data = data.replace(new RegExp('}', 'g'), '\n}\n');
        var obj = require('./cssNames.json');
        for (var property in obj) {
          if (obj.hasOwnProperty(property)) {

            var comment = "\n\t/*" + obj[property] + "*/\n\t" + property + ":";
            data = data.replace(new RegExp(" " + property + ":", 'g'), comment);

          }
        }
        let results = data;
        sendFileOut(outName, results, {
          length: data.length
        });


        console.log(results);







        /*while(b){
          let re = new RegExp('\{([^}]+)\}');
          let gayre = new RegExp('^[.#a-z0-9A-Z ]*');
          let results = gayre.exec(data)[0] + re.exec(data)[0];
          console.log(result);
          data = data.replace(results, '');
          attr.push(results);
          
          sendFileOut(outName, results, {
            length: data.length
          });
          
          if(data.length == 0){
            b = false;
          }
          console.log("memes " + data );
          }
        */




      } catch (e) {
        vscode.window.setStatusBarMessage("Thiccify failed: " + e.message, 5000);
      }
      // let base = settings.css.root.slice();
      // settings.css.root = settings.css.root.replace("${workspaceRoot}", vscode.workspace.rootPath || "");
      // // let cleanCSS = new mincss(settings.css);
      // let cleanCSS = settings.css;
      // cleanCSS.minify(data, (error, results) => {
      //   settings.css.root = base;
      //   if (results && results.styles) sendFileOut(outName, results.styles, {
      //     length: data.length,
      //     warnings: results.warnings.length,
      //     errors: results.errors.length
      //   });
      //   else if (error) vscode.window.setStatusBarMessage("Minify failed: " + error.length + " error(s).", 5000);

      // let cleanCSS = new mincss(settings.css);
      cleanCSS.minify(data, (error, results) => {
        if (results && results.styles) sendFileOut(outName, results.styles, {
          length: data.length,
          warnings: results.warnings.length,
          errors: results.errors.length
        });
        else if (error) vscode.window.setStatusBarMessage("Minify failed: " + error.length + " error(s).", 5000);

      });
    } else if (isHTML) {
      vscode.window.setStatusBarMessage("Thiccify failed: That's html", 5000);
      


      //let results = data;
      data = data.replace(/<!--[\S ]*-->/g, '');

      
      console.log(ob);
      for (var property in ob) {
        if (ob.hasOwnProperty(property)) {
          console.log(prop);
          var prop = property.slice(0, -1);
          var comment = "\n<!-- " + ob[property] + "-->\n" + prop;
          //data = data.replace(new RegExp(prop+'[> ]', 'g'), comment);
          data = data.replace(new RegExp(prop + '>', 'g'), comment + '>');
          data = data.replace(new RegExp(prop + ' ', 'g'), comment + ' ');

        }
      }
      let results = data;
      sendFileOut(outName, results, {
        length: data.length
      });

      //Does all the HTML crap
    }
    //otherwise, we don't care ...
  };
  let doThiccifyDir = function (folder, ext) {
    fs.readdir(folder, (err, files) => {
      //keep just our extension, drop all pre min'ed
      files = files.sort()
        .filter(f => path.extname(f)
          .slice(1) === ext)
        .filter(f => !f.endsWith(".max." + ext))
        .map(f => path.join(folder, f));
      if (files.length === 0) return vscode.window.setStatusBarMessage("No files for directory thiccify (", ext, ")",
        5000);
      let outName = folder + ".max." + ext;
      if (ext === 'js') {
        // let opts = settings.js;
        // opts.fromString = false;
        try {
          // let results = files
          let results = thiccify.minify(files);
          // let results = minjs.minify(files, opts);
          sendFileOut(outName, results.code, {
            files: files.length
          });
        } catch (e) {
          vscode.window.setStatusBarMessage("Thiccify failed: " + e.message, 5000);
        }
      } else {
        vscode.window.setStatusBarMessage("Thiccify failed: css", 5000);
        // let base = settings.css.root.slice();
        // settings.css.root = settings.css.root.replace("${workspaceRoot}", vscode.workspace.rootPath || "");
        // //strip the root dir from the whole file set
        // files = files.map(f => f.replace(settings.css.root, ""));
        // // let cleanCSS = new mincss(settings.css);
        // let cleanCSS = settings.css;

        // cleanCSS.minify(files, (error, results) => {
        //   settings.css.root = base;
        //   if (results && results.styles && results.styles.length) sendFileOut(outName, results.styles, {
        //     files: files.length,
        //     warnings: results.warnings.length,
        //     errors: results.errors.length
        //   });
        //   else if (error) vscode.window.setStatusBarMessage("Minify failed: " + error.length + " error(s).",
        //     5000);
        // });
      }
    });
  };
  let disposable = vscode.commands.registerCommand('extension.thiccify', function () {
    const active = vscode.window.activeTextEditor;
    if (!active || !active.document) return;
    if (active.document.isUntitled) return vscode.window.setStatusBarMessage(
      "File must be saved before Thiccify can run",
      5000);
    return doThiccify(active.document);
  });
  context.subscriptions.push(disposable);
  disposable = vscode.commands.registerCommand('extension.thiccifyDir', function () {
    const active = vscode.window.activeTextEditor;
    if (!active || !active.document) return;
    if (active.document.isUntitled) return vscode.window.setStatusBarMessage(
      "File must be saved before thiccify can run",
      5000);

    let ext = active.document.fileName.split('.')
      .pop()
      .toLowerCase();
    if (ext === 'js' || ext === 'css') doThiccifyDir(path.dirname(active.document.fileName), ext);
    else vscode.window.setStatusBarMessage("Active file must be .js to thiccify parent directory.",
      5000);
  });
  context.subscriptions.push(disposable);
  // disposable = vscode.workspace.onDidChangeConfiguration(() => {
  //   settings = cleanSettings(vscode.workspace.getConfiguration()
  //     .get("minify"));
  // });
  // context.subscriptions.push(disposable);

  disposable = vscode.workspace.onDidSaveTextDocument(function (doc) {
    //check if the user wants to do a minify here
    // if (!vscode.workspace.getConfiguration('minify')
    //   .minifyExistingOnSave) return;
    //check if there is a *.min.* file
    let n = doc.fileName.split('.');
    const ext = n.pop();
    n.push("max");
    n.push(ext);
    n = n.join(".");
    //see if there is a file, if there is, run min
    fs.exists(n, exists => exists ? doThiccify(doc) : false);
    const isJS = (ext.toLowerCase() === "js");
    const isCSS = (ext.toLowerCase() === "css");
    if (isJS || isCSS) {
      //check if the directory has a max
      n = path.dirname(doc.fileName);
      n += ".max." + (isJS ? "js" : "css");
      fs.exists(n, exists => exists ? doThiccifyDir(path.dirname(doc.fileName), isJS ? "js" : "css") : false);
    }
  });
  context.subscriptions.push(disposable);
}
exports.activate = activate;
