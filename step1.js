const fs = require('fs');
function catFunction(newPath) {
    fs.readFile(newPath, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`= File Output of ${newPath} =`);
        console.log(data);
        console.log("= EOF =");
    });
    console.log(`Reading the file: ${newPath}`);
}
if (process.argv.length < 2) {
    console.error("Argument not provided.");
    process.exit(1);
}
catFunction(process.argv[2]);