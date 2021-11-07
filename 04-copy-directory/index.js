let fs = require('fs');
let path = require('path');
const {stdout} = process;
fs.mkdir('./04-copy-directory/files-copy', { recursive: true }, (err) => {
    if (err) throw err;
  });

fs.readdir('./04-copy-directory/files', {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    stdout.write('Копия создана');
    for (let i = 0; i < files.length;i++) {
    fs.copyFile(`./04-copy-directory/files/${path.basename(files[i].name)}`, `./04-copy-directory/files-copy/${path.basename(files[i].name)}`, err => {
        if(err) throw err;
        });
    }
})