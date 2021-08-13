// TODO : 1. 나를 제외한 다른사람들에게만 메시지를 보내고 싶음(현재는 나를 포함한 모두에게 Broadcast)
// TODO : 2. 프론트 -> 백 으로 주는 메시지의 2가지 타입에 따른 stringify, parse 과정을 거치지만, 백 -> 프론트 에도 메시지 타입을 나눠서 (텍스트메시지, 입장/퇴장) 구현하고싶음.
// TODO : 3. 소켓이 연결이 끊기면 sockets array(server.js:28)에서 해당 소켓을 빼내고 싶음.
// TODO : 4. 연결된 사람 숫자, 방에 참가했다는 알림, ...
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

// 누군가 서버에 연결하면 그 connection을 여기에 담아준다.
const sockets = [];
// wss의 on 메서드에서는 이벤트("connection")가 발생하기를 기다렸다가, 해당 메서드(handleConnection)를 수행함. -> 익명 함수(anonymous function)로 전환.
// 
// socket : 연결된 브라우저와의 연락(contact)라인, 연결된 어떤 다른 사람.
// 여기 있는 socket이 front-end(src/public/js/app.js)와 실시간으로 소통할 수 있음.
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anonymous";
    console.log("브라우저와 연결되었습니다. ✅");
    socket.on("close", () => {
        console.log("브라우저와 연결이 끊겼습니다. ❌")
    });
    socket.on("message", (msg) => {
        // socket.send(message.toString('utf8'));   // 클라이언트가 보내온 메시지를 다시 클라이언트에게 보낸다.
        const message = JSON.parse(msg.toString('utf8'));

        // 서버에서 보낸 메시지가...
        switch(message.type) {
            case "new_message": // '새 메시지'라면
                //// sockets.forEach((aSocket) => aSocket.send(message.payload)); // 클라이언트가 보내온 메시지를 다시 클라이언트에게 보낸다.
                // 클라이언트가 보내온 메시지를 다시 클라이언트에게 보낸다.
                sockets.forEach((aSocket) => 
                    aSocket.send(`${socket.nickname}: ${message.payload}`)
                ); 
                break;
            case "nickname":    // '닉네임'이라면
                // console.log(message.payload);
                // * TIP : socket은 기본적으로 Object이기 때문에, 아이템을 넣고 뺄 수 있음.
                socket["nickname"] = message.payload;
                break;

        }
    });
})

server.listen(3000, handleListen);  // http server위에 WebSocket 서버를 띄우는 방식. (이렇게 해야 views, static files, home, redirection을 지원받을 수 있기 때문.)
// app.listen(3000);                // http 서버만 띄우는 방식.
/////////////////////////////////////////////////////////////////////////////////// 
// $ npm run dev
//
// 로 실행시킵니다.
////////////////////////////////////////////////////////////////
