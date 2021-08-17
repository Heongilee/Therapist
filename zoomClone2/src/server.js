// https://socket.io/docs/v4/server-api/ (SocketIO serverAPI)
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

const handleListen = () =>
  console.log(
    `Listening on http://localhost:3000 || ws://localhost:3000 or wss://localhost:3000`
  );

const server = http.createServer(app);
const io = SocketIO(server);

function publicRooms() {
  /*
    만약 ROOMID를 socketID에서 찾을 수 있다면 우리가 Private용 room을 찾은것.
    roomID를 socketID에서 찾을 수 없다면 우리는 Public용 room을 찾은것.
  */
  // 이거랑 같음!
  // const sids = io.sockets.adapter.sids;
  // const rooms = io.sockets.adapter.rooms;
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = io;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if(sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

io.on("connection", (socket) => {
  socket["nickname"] = "Anonymous";
  socket.onAny((event) => {
    console.log(`Socket Event : ${event}`);
  });

  // 클라이언트측으로 부터 받은 `enter_room`이벤트.
  socket.on("enter_room", (roomName, showRoom) => {
    socket.join(roomName);
    showRoom();

    socket.to(roomName).emit("welcome", socket.nickname); //roomName 방에 참가한 모든 사람들에게 "welcome_message"를 발생시킨것.
    io.sockets.emit("room_change", publicRooms());
  });
  // 클라이언트측으로 부터 받은 `new_message`이벤트.
  socket.on("new_message", (message, roomName, done) => {
    socket.to(roomName).emit("new_message", `${socket.nickname}: ${message}`);
    done(); // ※ 이 코드는 백엔드에서 실행되지 않는다. 백엔드에서 done()을 호출하면 프론트에서 실행한다. (안 그러면 보안상 결함을 야기할 우려가 있기 때문에 SocketIO에서 만들어놓은 설계다.)
  });
  // 클라이언트측으로 부터 받은 `nickname`이벤트.
  socket.on("nickname", (nickname) => {
    socket["nickname"] = nickname;
  });
  // 클라이언트가 접속을 끊으려고하기 직전에 발생하는 메시지 (`disconnecting` ; SocketIO에서 제공하는 특별한 기능.)
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("bye", socket.nickname);
    });
  });
  // 클라이언트가 접속을 종료하고나서 발생하는 메시지 (`disconnecting`과 차이가 있음에 주의!)
  socket.on("disconnect", () => {
    io.sockets.emit("room_change", publicRooms());
  });
});

server.listen(3000, handleListen);
