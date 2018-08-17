// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const badcode = require("bad-code");
const fs = require("fs");
const path = require("path");

let sendFileOut = function (fileName, data, stats) {
  fs.writeFile(fileName, data, "utf8", () => {
    let status = "Maxified: " + stats.files + " files";
    if (stats.length)
      status =
        "Maxified: " +
        (((data.length / stats.length) * 10000) | 0) / 100 +
        "% of original" +
        (stats.errors
          ? " but with errors."
          : stats.warnings
            ? " but with warnings."
            : ".");
    vscode.window.setStatusBarMessage(status, 5000);
  });
};
let doMaxify = function (document) {
  let outName = document.fileName.split(".");
  const ext = outName.pop();
  outName.push("max");
  outName.push(ext);
  outName = outName.join(".");
  let data = document.getText();
  //if the document is empty here, we output an empty file to the min point
  if (!data.length)
    return sendFileOut(outName, "", {
      length: 1
    });
  //what are we minifying?
  const isJS = ext.toLocaleLowerCase() === "js";
  const isCSS = ext.toLocaleLowerCase() === "css";
  const isHTML =
    ext.toLocaleLowerCase() === "html" || ext.toLocaleLowerCase() === "htm";
  if (isJS) {
    // let opts = settings.js;
    // opts.fromString = true;
    try {
      console.log(data);
      //   let results = minjs.minify(data, opts);
      let results = badcode(data);
      sendFileOut(outName, results, {
        length: data.length
      });
    } catch (e) {
      vscode.window.setStatusBarMessage("Maxify failed: " + e.message, 5000);
    }
  } else if (isCSS) {
    vscode.window.setStatusBarMessage("isCSS", 5000);

    // let base = settings.css.root.slice();
    // settings.css.root = settings.css.root.replace(
    //   "${workspaceRoot}",
    //   vscode.workspace.rootPath || ""
    // );
    // let cleanCSS = new mincss(settings.css);
    // cleanCSS.minify(data, (error, results) => {
    //   settings.css.root = base;
    //   if (results && results.styles)
    //     sendFileOut(outName, results.styles, {
    //       length: data.length,
    //       warnings: results.warnings.length,
    //       errors: results.errors.length
    //     });
    //   else if (error)
    //     vscode.window.setStatusBarMessage(
    //       "Maxify failed: " + error.length + " error(s).",
    //       5000
    //     );
    // });
  } else if (isHTML) {
    vscode.window.setStatusBarMessage("isHTML", 5000);
    // convert regex strings
    // let t = settings.html.minifyCSS;
    // let results;
    // if (typeof t === "object") {
    //   if (t.root) {
    //     t = t.root.slice();
    //     settings.html.minifyCSS.root = "";
    //   } else t = false;
    // } else t = false;
    // try {
    //   settings.html.ignoreCustomFragments =
    //     settings.html.ignoreCustomFragments || [];
    //   [
    //     "customAttrAssign",
    //     "customAttrSurround",
    //     "customEventAttributes",
    //     "ignoreCustomComments",
    //     "ignoreCustomFragments"
    //   ].forEach(n => {
    //     let e = settings.html[n];
    //     if (Array.isArray(e)) {
    //       settings.html[n] = e.map(
    //         ee =>
    //           typeof ee === "string"
    //             ? new RegExp(ee.replace(/^\/(.*)\/$/, "$1"))
    //             : ee
    //       );
    //     }
    //   });
    // if (typeof settings.html.customAttrCollapse === "string")
    // settings.html.customAttrCollapse = new RegExp(
    //       settings.html.customAttrCollapse.replace(/^\/(.*)\/$/, "$1")
    //     );
    //   results = minhtml.minify(data, settings.html);
    // } catch (e) {
    //   return vscode.window.setStatusBarMessage(
    //     "Minify failed. (exception)",
    //     5000
    //   );
    // }
    // if (t) settings.html.minifyCSS.root = t;
    // if (results)
    //   sendFileOut(outName, results, {
    //     length: data.length
    //   });
    // else vscode.window.setStatusBarMessage("Minify failed.", 5000);
  }
  //otherwise, we don't care ...
};
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "thiccfy" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.sayHello",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World!");
    }
  );

  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand(
    "extension.thiccify",
    function () {
      const active = vscode.window.activeTextEditor;
      if (!active || !active.document) return;
      if (active.document.isUntitled)
        return vscode.window.setStatusBarMessage(
          "File must be saved before minify can run",
          5000
        );
      vscode.window.showInformationMessage("Starting");
      return doMaxify(active.document);
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
