import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import { createClient } from "@libsql/client";

import { Server } from "socket.io";
import { createServer } from "node:http"; //modulo para poder crear servidores

dotenv.config();
const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  //recupero las conexioness
  connectionStateRecovery: {},
});

const db = createClient({
  url: "libsql://chat-fgiannini95.turso.io",
  authToken: process.env.DB_TOKEN,
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    user TEXT
  )
`);

//controlo el usuario
io.on("connection", async (socket) => {
  console.log("User connected!");

  socket.on("disconnect", () => {
    console.log("User disconected!");
  });
  //socket = conexión en concreto
  //io = todas las conexiónes
  socket.on("chat message", async (msg) => {
    let result;
    const username = socket.handshake.auth.username ?? "anonymous";
    console.log({ username });
    try {
      result = await db.execute({
        sql: "INSERT INTO messages (content, user) VALUES (:msg, :username)",
        args: { msg, username }, //protección from sql injection
      });
    } catch (e) {
      console.error(e);
      return;
    }
    //broadcast
    io.emit('chat message', msg, result.lastInsertRowid.toString(), username)
    //enviamos el último mensaje que se ha guardado
  });
  //si se ha conectado un nuevo cliente y no se ha recuperado de una desconexión
  if (!socket.recovered) { // <- recuperase los mensajes sin conexión
    try {
      //funcionalidad parecida a useEffect
      const results = await db.execute({
        sql: 'SELECT id, content, user FROM messages WHERE id > ?',
        args: [socket.handshake.auth.serverOffset ?? 0]
      })

      results.rows.forEach(row => {
        socket.emit('chat message', row.content, row.id.toString(), row.user)
      })
    } catch (e) {
      console.error(e)
    }
  }
})

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html"); //desde donde se ha inizializado el proceso
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
