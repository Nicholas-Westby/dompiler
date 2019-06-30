// Dependencies.
let fs = require("fs"),
    Terser = require("terser");

// Variables.
let noop = function () {};

// Convert the browser-compatible files into Node-compatible files.
transformExports("library/dompiler.js", "dist/dompiler.js");
transformExports("library/events.js", "dist/events.js");

// Copy the files into the docs folder.
fs.copyFile("library/dompiler.js", "../docs/library/dompiler.js", noop);
fs.copyFile("library/events.js", "../docs/library/events.js", noop);

// Minify the files.
minifyFile("library/dompiler.js", "dist/browser/dompiler.min.js");
minifyFile("library/events.js", "dist/browser/events.min.js");

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

/**
 * Minifies the specified JavaScript file.
 * @param inFilename The path to the JavaScript file to minify.
 * @param outFilename The path to the file to save the minified code to.
 */
function minifyFile(inFilename, outFilename) {
    fs.readFile(inFilename, "utf8", function (err, data) {
        let result = Terser.minify(data);
        fs.writeFile(outFilename, result.code, noop);
    });
}