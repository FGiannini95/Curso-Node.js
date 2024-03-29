const { log } = require('console');
const fs = require('fs')

//leemos el fichero con una codificación concreta
//Manera asyncrona
console.log('Leyendo el primer archivo');
fs.readFile('./archivo.txt', 'utf-8',(err, text) => {
  console.log('primer texto: ', text);
})

console.log('--> Hacer cosas');

console.log('Leyendo el segundo archivo');
fs.readFile('./archivo2.txt', 'utf-8',(err, text) => {
  console.log('segundo texto: ', text);
})
