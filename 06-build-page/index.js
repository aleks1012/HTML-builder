let fs = require('fs');
let path = require('path');
const {stdin, stdout} = process;
let data = '';
let q = '';

let temporaryArchive = '';
const newStream = '';

fs.mkdir('./06-build-page/project-dist', { recursive: true }, (err) => {
    if (err) throw err;
    let stream = fs.createReadStream('./06-build-page/template.html', 'utf-8');
    stream.on('data', chunk => data += chunk);
    stream.on('end', function() {
        fs.writeFile('./06-build-page/project-dist/index.html', data,  function(error){
            if(error) throw error; // если возникла ошибка
            stream = fs.createReadStream('./06-build-page/project-dist/index.html', 'utf-8');
            let templateTags = data.match(/{{[a-z]+}}/gi);
            data = ''
            stream.on('data', chunk => data += chunk);
            stream.on('end', function() {
                for (let i = 0; i < templateTags.length; i++) {
                    function replacement() {
                        let fileName = templateTags[i].match(/[a-z]+/gi)[0];
                        let temporaryStream = fs.createReadStream(`./06-build-page/components/${fileName}.html`, 'utf-8');
                        let temporaryData = '';
                        temporaryStream.on('data', chunk => temporaryData += chunk);
                        temporaryStream.on('end', function() {
                            temporaryArchive = temporaryData;
                            if (i === 0) {
                                q = data.replace(templateTags[i], temporaryArchive)
                            } else {
                                q = q.replace(templateTags[i], temporaryArchive)
                                if (i === templateTags.length - 1) {
                                    fs.writeFile('./06-build-page/project-dist/index.html', q,  function(error){
                                            if(error) throw error; // если возникла ошибка
                                        });
                                }
                            }
                        });
                    };
                    replacement();
                }
            });
        });
    })
    stdout.write('Программа выполнена!');
});

fs.readdir('./06-build-page/styles', {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    fs.writeFile('./06-build-page/project-dist/style.css', '',  function(error){
        if(error) throw error; // если возникла ошибка
    });
    for (let i = 0; i < files.length;i++) {
        if(path.extname(files[i].name) === '.css') {
            let stream = new fs.ReadStream(`./06-build-page/styles/${path.basename(files[i].name)}`, 'utf-8');
            stream.on('readable', function(){
                let data = stream.read();
                if(data != null) {
                    fs.appendFile('./06-build-page/project-dist/style.css', data,  function(error){
                    if(error) throw error; // если возникла ошибка
                    });
                };
            });
        }
    }
})

fs.mkdir('./06-build-page/project-dist/assets/fonts', { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir('./06-build-page/assets/fonts', {withFileTypes: true}, (err, files) => {
        if (err) throw err;
        for (let i = 0; i < files.length;i++) {
        fs.copyFile(`./06-build-page/assets/fonts/${path.basename(files[i].name)}`, `./06-build-page/project-dist/assets/fonts/${path.basename(files[i].name)}`, err => {
            if(err) throw err;
            });
        }
    })
});

fs.mkdir('./06-build-page/project-dist/assets/img', { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir('./06-build-page/assets/img', {withFileTypes: true}, (err, files) => {
        if (err) throw err;
        for (let i = 0; i < files.length;i++) {
        fs.copyFile(`./06-build-page/assets/img/${path.basename(files[i].name)}`, `./06-build-page/project-dist/assets/img/${path.basename(files[i].name)}`, err => {
            if(err) throw err;
            });
        }
    })
});

fs.mkdir('./06-build-page/project-dist/assets/svg', { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir('./06-build-page/assets/svg', {withFileTypes: true}, (err, files) => {
        if (err) throw err;
        for (let i = 0; i < files.length;i++) {
        fs.copyFile(`./06-build-page/assets/svg/${path.basename(files[i].name)}`, `./06-build-page/project-dist/assets/svg/${path.basename(files[i].name)}`, err => {
            if(err) throw err;
            });
        }
    })
});