//File sistem - Systema de archivos

const fs = require('fs')

const stats = fs.statSync('./archivo.txt') 
//En manera sincrona, recupero la info del sistema de archivo.txt
console.log(
  stats.isFile(), //si es un fichero
  stats.isDirectory(), //si es un directorio
  stats.isSymbolicLink(), //si es un enlace simnolico
  stats.size, //tamaño en bites
);