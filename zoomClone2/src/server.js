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

const handleListen = () => console.log(`Listening on http://localhost:3000 || ws://localhost:3000`);

const server = http.createServer(app);                      // express app을 이용해서 http 서버를 만듦.
const wss = new WebSocket.Server({ server });               // http server위에 webSocket서버를 만듦.

server.listen(3000, handleListen);  // http server위에 WebSocket 서버를 띄우는 방식. (이렇게 해야 views static files, home, redirection을 지원받을 수 있기 때문.)
// app.listen(3000);                // http 서버만 띄우는 방식.
/////////////////////////////////////////////////////////////////////////////////// 
// $ npm run dev
//
// 로 실행시킵니다.
////////////////////////////////////////////////////////////////