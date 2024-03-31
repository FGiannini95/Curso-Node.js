const http = require("node:http"); //Importamos el módulo
const fs = require('fs')
const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (req.url === "/") {
    res.statusCode = 200;
    res.end("<h1>Bienvenido a mi página principal</h1>");
  }else if(req.url === '/imagen.jpeg'){

    fs.readFile('./imagen.jpeg', (err, data)=>{ //enviamos datos binarios
      if(err){
        res.statusCode = 500
        res.end("<h1>Internal Server Error</h1>");
      } else {
        res.statusCode = 200 //se puedo omitir
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data) //trasformo los datos en img
      }
    })

  } else if (req.url === "/contacto") {
    res.statusCode = 200;
    res.end("<h1>Contacto</h1>");
  } else {
    res.statusCode = 404;
    res.end("<h1>404</h1>");
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  //escuchar por el puerto
  console.log(`server listening on port http://localhost:${desiredPort}`);
});
