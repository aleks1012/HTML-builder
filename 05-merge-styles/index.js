let fs = require('fs');
let path = require('path');
const {stdout} = process;

fs.readdir('./05-merge-styles/styles', {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    fs.writeFile('./05-merge-styles/project-dist/bundle.css', '',  function(error){
        if(error) throw error; // если возникла ошибка
    });
    for (let i = 0; i < files.length;i++) {
        if(path.extname(files[i].name) === '.css') {
            let stream = new fs.ReadStream(`./05-merge-styles/styles/${path.basename(files[i].name)}`, 'utf-8');
            stream.on('readable', function(){
                let data = stream.read();
                if(data != null) {
                    fs.appendFile('./05-merge-styles/project-dist/bundle.css', data,  function(error){
                        if(error) throw error; // если возникла ошибка
                    });
                };
            });
        }
    }
    stdout.write('Файл bundle.css готов!');
})