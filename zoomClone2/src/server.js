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
    // 클라이언트측으로 부터 받은 이벤트.
    socket.on("enter_room", (roomName, callback) => {
        console.log(roomName);
        setTimeout(() => {
            callback("hello from the backend"); // caller(클라이언트)가 가지고 있는 callback(backendDone)함수를 실행하는 역할을 함. (백엔드에서 실행하는게 아님에 주의)
        }, 1000);
    });
});

server.listen(3000, handleListen);