import http from "http";
import SocketIO from "socket.io";
import express from "express";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => {
  res.render("home");
});

app.get("/*", (_, res) => {
  res.redirect("/");
});

const server = http.createServer(app);
const io = SocketIO(server);
const handleListen = () => console.log(`Listening on http://localhost:3000`);
server.listen(3000, handleListen);

io.on("connection", (socket) => {
  // 해당 소켓을 방에 참가시킨다.
  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    // peerA에게 받은 Offer를 roomName에 있는 모든 socket에게 전송함.
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    // peerA에게 받은 Offer를 roomName에 있는 모든 socket에게 전송함.
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});