const http = require("node:http");

const dittoJSON = require("./pokemon/ditto.json");

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case "GET":
      switch (url) {
        case "./pokemon/ditto":
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          return res.end(JSON.stringify(dittoJSON));
        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          return res.end("<h1>404</h1>");
      }
    case "POST":
      switch (url) {
        case "./pokemon":{
          let body = ''
          //escuchar evento data. Cada dato que recibo lo guardo en un trozo(chunk)
          req.on('data', chunk => {
            body += chunk.toString //transformo el dato binario en string
          })
          req.on('end', ()=> {
            const data = JSON.parse(body)
            res.writeHead(201, {"Content-Type": "application/json; charset=utf-8"})
            res.end(JSON.stringify(data))
          })
          break
        }

        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          return res.end('404 Not Found')
      }
  }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log(`server listening on port http://localhost/1234`);
});
