//Servidor desde 0
const http = require('http')

const server = http.createServer((req, res)=>{
  console.log('request received');
  res.end('Hola Mundo')
})

server.listen(0, ()=>{
  console.log(`Servidor escuchando por el puerto http://localhost/${server.address().port} `);
})