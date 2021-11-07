const fs = require("fs");
const {stdout} = process;
const stream = fs.createReadStream('./01-read-file/text.txt', 'utf-8');

let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => stdout.write(data));
stream.on('error', error => stdout.write('Error', error.message));