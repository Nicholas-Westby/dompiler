// Dependencies.
let fs = require("fs"),
    Gzip = require("node-gzip").gzip;

// Variables.
let fileCount = 0,
    processedFiles = 0,
    totalSize = 0;

// Minify the files.
getSize("dist/browser/dompiler.min.js");
getSize("dist/browser/events.min.js");

/**
 * Gets the GZipped size of the specified file.
 * @param filename The path to the file to get the GZipped size of.
 */
function getSize(filename) {
    fileCount++;
    fs.readFile(filename, "utf8", function (err, data) {
        Gzip(data)
            .then(function (compressed) {

                // Variables.
                let fileSize = compressed.length;
                totalSize += fileSize;

                // Output the size of this file.
                console.log(`The file "${filename}" is ${fileSize} bytes.`);
                processedFiles++;

                // Output the size of all files combined.
                if (processedFiles >= fileCount) {
                    console.log(`The combined file size of all files is ${totalSize} bytes.`);
                }

            });
    });
}