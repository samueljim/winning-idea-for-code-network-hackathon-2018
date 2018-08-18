"use strict";
const vscode = require('vscode');
const thiccify = require('./thiccify');
// const mincss = require('clean-css');
// const minhtml = require('html-minifier');
const fs = require('fs');
const path = require('path');

//register on activation
function activate(context) {
  let sendFileOut = function (fileName, data, stats) {
    fs.writeFile(fileName, data, "utf8", () => {
      let status = "Thiccified: " + stats.files + " files";
      if (stats.length) status = "Minified: " + (((data.length / stats.length) * 10000) | 0) / 100 +
        "% of original" + (stats.errors ? " but with errors." : (stats.warnings ? " but with warnings." : "."));
      vscode.window.setStatusBarMessage(status, 5000);
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
        console.log(data);
        let results = thiccify.minify(data, opts);
        // let results = "it worked right?";
        // let results = data;
        sendFileOut(outName, results, {
          length: data.length
        });
      } catch (e) {
        vscode.window.setStatusBarMessage("Thiccify failed: " + e.message, 5000);
      }
    } else if (isCSS) {
      vscode.window.setStatusBarMessage("Thiccify failed: That's css", 5000);
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

      // });
    } else if (isHTML) {
      vscode.window.setStatusBarMessage("Thiccify failed: That's html", 5000);

      // convert regex strings
      // let results;
      // if (typeof t === "object") {
      //   if (t.root) {
      //     t = t.root.slice();
      //     settings.html.ThiccifyCSS.root = "";
      //   } else t = false;
      // } else t = false;
      // try {
      //   settings.html.ignoreCustomFragments = settings.html.ignoreCustomFragments || [];
      //   ['customAttrAssign', 'customAttrSurround', 'customEventAttributes', 'ignoreCustomComments', 'ignoreCustomFragments']
      //     .forEach(n => {
      //       let e = settings.html[n];
      //       if (Array.isArray(e)) {
      //         settings.html[n] = e.map(ee => (typeof ee === 'string') ? new RegExp(ee.replace(/^\/(.*)\/$/, '$1')) : ee);
      //       }
      //     });
      //   if (typeof settings.html.customAttrCollapse === 'string')
      //     settings.html.customAttrCollapse = new RegExp(settings.html.customAttrCollapse.replace(/^\/(.*)\/$/, '$1'));
      //   // results = minhtml.minify(data, settings.html);
      //   results = data;
      // } catch (e) {
      //   return vscode.window.setStatusBarMessage("thiccify failed. (exception)", 5000);
      // }
      // if (t) settings.html.minifyCSS.root = t;
      // if (results) sendFileOut(outName, results, {
      //   length: data.length
      // });
      // else vscode.window.setStatusBarMessage("thiccify failed.", 5000);
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
        let opts = settings.js;
        opts.fromString = false;
        try {
          // let results = files
          let results = thiccify.minify(files, opts);
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
