import http from "http";
import SocketIO from "socket.io";
import express from "express";
const app = express();

app.get("/*", (_, res) => {
  res.redirect("/");
});

const server = http.createServer(app);
const io = SocketIO(server);

const handleListen = () => console.log(`Listening on http://localhost:3000`);

server.listen(3000, handleListen);
