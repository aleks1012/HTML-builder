let fs = require('fs');
const path = require('path');
const {stdout} = process;
let arr = []


fs.readdir('./03-files-in-folder/secret-folder', {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for (let i = 0; i < files.length;i++) {
    fs.stat(`./03-files-in-folder/secret-folder/${path.basename(files[i].name)}`, {withFileTypes: true}, (err, stats) => {
      if (err) throw err;
      if (stats.isFile() === true) {
        stdout.write(path.basename(files[i].name).split('.').slice(0, -1).join(''));
        stdout.write('-');
        stdout.write(path.extname(files[i].name).split('').slice(1).join(''));
        stdout.write('-');
        stdout.write(`${stats.size/1024}kb`);
        if(i !== files.length - 1) {
          stdout.write('\n');
        }
      }
    });
  }
})