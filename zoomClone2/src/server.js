import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");                              // view engine으로 무엇을 사용할 것인지 정해줌.
app.set("views", __dirname + "/views");                     // express 에게 템플릿이 어디에 있는지 정해줌.
app.use("/public", express.static(__dirname + "/public"))   // public url을 생성해서 유저에게 파일을 공유

app.get("/", (_, res) => {
    res.render("home")
});
// catchall URL
app.get("/*", (_, res) => {
    res.redirect("/")
});

const handleListen = () => console.log(`Listening on http://localhost:3000 || ws://localhost:3000 or wss://localhost:3000`);

const server = http.createServer(app);                      // express app을 이용해서 http 서버를 만듦.
const wss = new WebSocket.Server({ server });               // http server위에 webSocket서버를 만듦.

//////////////! depricated //////////////
/* function handleConnection(socket) {
    console.log(socket)
} */
////////////////////////////////////////!

// wss의 on 메서드에서는 이벤트("connection")가 발생하기를 기다렸다가, 해당 메서드(handleConnection)를 수행함. -> 익명 함수(anonymous function)로 전환.
// 
// socket : 연결된 브라우저와의 연락(contact)라인, 연결된 어떤 다른 사람.
// 여기 있는 socket이 front-end(src/public/js/app.js)와 실시간으로 소통할 수 있음.
wss.on("connection", (socket) => {
    console.log("브라우저와 연결되었습니다. ✅");
    socket.on("message", (message) => {
        console.log(message.toString('utf8'));
    });
    socket.on("close", () => {
        console.log("브라우저와 연결이 끊겼습니다. ❌")
    });
    socket.send("안녕!!!");

})

server.listen(3000, handleListen);  // http server위에 WebSocket 서버를 띄우는 방식. (이렇게 해야 views, static files, home, redirection을 지원받을 수 있기 때문.)
// app.listen(3000);                // http 서버만 띄우는 방식.
/////////////////////////////////////////////////////////////////////////////////// 
// $ npm run dev
//
// 로 실행시킵니다.
////////////////////////////////////////////////////////////////