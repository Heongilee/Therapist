// https://socket.io/docs/v4/server-api/ (SocketIO serverAPI)
import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => {
    res.render("home")
});

app.get("/*", (_, res) => {
    res.redirect("/")
});

const handleListen = () => console.log(`Listening on http://localhost:3000 || ws://localhost:3000 or wss://localhost:3000`);

const server = http.createServer(app);
const io = SocketIO(server);

io.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`Socket Event : ${event}`);
    });

    // 클라이언트측으로 부터 받은 이벤트.
    socket.on("enter_room", (roomName, showRoom) => {
        /*
        console.log(socket.id);                 // socket이 가지고 있는 방 그룹의 아이디(id)를 보여줌.
        console.log(socket.rooms);              // 현재 있는 방의 집합(Set)을 보여줌.

        socket.join(["room 237", "room 238"]);  // 한번에 여러방에 입장 가능함.

        socket.leave("room 237");               // 방 나가기
        */
       socket.join(roomName);
       showRoom();
       
       socket.to(roomName).emit("welcome"); //roomName 방에 참가한 모든 사람들에게 "welcome_message"를 발생시킨것.
    });
});

server.listen(3000, handleListen);