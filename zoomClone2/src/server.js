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

io.on("connection", socket => {
    console.log(socket);
});

/* <<<<<<<<<<<<<<<<< WebSocket
const wss = new WebSocket.Server({ server });
const sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anonymous";
    console.log("브라우저와 연결되었습니다. ✅");
    socket.on("close", () => {
        console.log("브라우저와 연결이 끊겼습니다. ❌")
    });
    socket.on("message", (msg) => {
        const message = JSON.parse(msg.toString('utf8'));

        switch(message.type) {
            case "new_message": // '새 메시지'라면
                sockets.forEach((aSocket) => 
                    aSocket.send(`${socket.nickname}: ${message.payload}`)
                ); 
                break;
            case "nickname":    // '닉네임'이라면
                socket["nickname"] = message.payload;
                break;

        }
    });
})
 */

server.listen(3000, handleListen);