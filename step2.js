const axios = require('axios');
const URL = require('url').URL;
const fs = require('fs');

function webCatFunction(newPath) {
    axios.get(newPath)
        .then(resp => {
            console.log(`= Output of ${newPath} =`);
            console.log(resp);
            console.log("= END =");
        })
        .catch(e => {
            console.error(e);
        });
    console.log(`Reading the file: ${newPath}`);
}
function catFunction(newPath) {
    fs.readFile(newPath, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`= File Output of ${newPath} =`);
        console.log(data + "= EOF =");
    });
    console.log(`Reading the file: ${newPath}`);
}

if (process.argv.length < 2) {
    console.error("Argument not provided.");
    process.exit(1);
}
try {
    const filename = new URL(process.argv[2]);
    webCatFunction(filename);
} catch {
    catFunction(process.argv[2]);
}