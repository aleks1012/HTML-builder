let fs = require('fs');

const stream = fs.createReadStream('./02-write-file/index.js', 'utf-8');

const { stdout, stdin, exit} = process;
stdout.write('Пожалуйста, введите текст\n');
fs.appendFile('./02-write-file/text.txt', '',  function(error){
    if(error) throw error; // если возникла ошибка
});

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function writingText(line){
    if (line === 'exit') {
        stdout.write('Goodbye');
        fs.appendFile('./02-write-file/text.txt', '',  function(error){
            if(error) throw error; // если возникла ошибка
        });
        exit();
    } 
})

process.on('SIGINT', function() { 
    stdout.write('Goodbye');
    fs.appendFile('./02-write-file/text.txt', '',  function(error){
        if(error) throw error; // если возникла ошибка
    });
    exit();
});

stdin.on('data', data => {
    fs.appendFile('./02-write-file/text.txt', data,  function(error){
        if(error) throw error; // если возникла ошибка
    });
})