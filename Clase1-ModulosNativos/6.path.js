//Nos dice el path de los archivos que tenemos
const { log } = require('console');
const path = require('path')

console.log(path.sep); //para saber como se sepera la ruta en mi sistema operativo

//unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'text.txt')
console.log(filePath);

//conseguir el nombre del fichero de una ruta completa
const base = path.basename('C:/Users/fgian/OneDrive/Desktop/WorkInProgress/node.js/Clase1-ModulosNativos/1.os-info.js')
console.log(base);

//conseguir el nombre del fichero de una ruta completa sin la extension
const filename = path.basename('C:/Users/fgian/OneDrive/Desktop/WorkInProgress/node.js/Clase1-ModulosNativos/1.os-info.js', '.js')
console.log(filename);

//conseguir la extensión
const extension = path.extname('image.jpg')
console.log(extension);