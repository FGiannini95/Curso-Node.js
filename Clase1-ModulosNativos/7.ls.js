//LS comando parecido a DIR
const { log } = require('console');
const fs = require('fs')

//consigo un listado con todos los archivos en mi directorio
fs.readdir('.', (err, files) =>{
  if(err){
    console.log('Error a leer el directorio', err)
    return;
  }
  files.forEach((file)=>{
    console.log(file);
  })
})
