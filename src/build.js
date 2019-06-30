// Dependencies.
let fs = require("fs");

// Variables.
let noop = function () {};

// Convert the browser-compatible files into Node-compatible files.
transformExports("library/dompiler.js", "dist/dompiler.js");
transformExports("library/events.js", "dist/events.js");

// Copy the files into the docs folder.
fs.copyFile("library/dompiler.js", "../docs/library/dompiler.js", noop);
fs.copyFile("library/events.js", "../docs/library/events.js", noop);

/**
 * Converts the specified file into one that uses the type of exports
 * that Node understands.
 * @param inFilename The path to the file to convert.
 * @param outFilename The path to the file to write the converted file to.
 */
function transformExports(inFilename, outFilename) {
    fs.readFile(inFilename, "utf8", function (err, data) {
        data = data.replace("export default", "module.exports =");
        fs.writeFile(outFilename, data, noop);
    });
}