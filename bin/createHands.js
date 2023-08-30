const fs = require('fs');

// Read the content of the file
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Split the content by lines
    const lines = data.split('\n');

    // Convert lines to an array of arrays
    const dataArray = lines.map(line => line.trim().split(/\s+/).map(Number));

    console.log(dataArray);
});
