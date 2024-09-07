const axios = require('axios');
const URL = require('url').URL;
const fs = require('fs');

function writeOutputToFile(outputText = null, fileToWrite = null) {
    if (outputText == null)
        throw "No input text to write";
    if (fileToWrite == null)
        throw "No output file";
    if (!fs.existsSync(fileToWrite))
        fs.writeFile(fileToWrite, outputText + "\n", err => {
            if (err)
                throw err;
            console.log(`Appended to ${fileToWrite} - Length: ${outputText.length}`);
        });
    else
        fs.appendFile(fileToWrite, outputText + "\n", err => {
            if (err)
                throw err;
            console.log(`Appended to ${fileToWrite} - Length: ${outputText.length}`);
        });
}

function outputTextToConsole(outputText = null, newPath = null) {
    if (outputText == null)
        throw "No text was supplied.";
    if (newPath != null)
        console.log(`Reading the file: ${newPath}`);
    console.log("== Start ==\n" + outputText + "\n=== End ===\n");
}

function webCatFunction(URLPath, fileOutput = null) {
    axios.get(URLPath)
        .then(resp => {
            if (fileOutput == null)
                outputTextToConsole(resp.data, URLPath);
            else
                writeOutputToFile(resp.data, fileOutput);
        })
        .catch(e => {
            console.error(e);
        });
}

function catFunction(filePath, fileOutput = null) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        if (fileOutput == null)
            outputTextToConsole(data, filePath);
        else
            writeOutputToFile(data, fileOutput);
    });
}

if (process.argv.length <= 2) {
    console.error("Argument not provided.");
    process.exit(1);
} else {
    //3  --out
    let outputFile = null;
    let inputArgument = null;

    //Reset arguments by slicing for convenience
    let currentArguments = process.argv.slice(2);

    //Contains an output flag
    if (currentArguments[0] === "--out") {
        currentArguments = currentArguments.slice(1);
        //Check without any extra arguments
        if (currentArguments.length === 0)
            throw "Output flag supplied but output file name or URL not supplied.";
        //Check for arguments without any file or URL input
        else if (currentArguments.length === 1)
            throw "Input not supplied.";

        outputFile = currentArguments[0];
        //work with only input(s)
        inputArgument = currentArguments.slice(1)
        //No output flag, 2 is input file.
    } else
        inputArgument = currentArguments;

    inputArgument.forEach(v => {
        try {
            webCatFunction(new URL(v), outputFile);
        } catch {
            catFunction(v, outputFile);
        }
    });
}