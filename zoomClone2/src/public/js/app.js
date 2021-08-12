// 여기 있는 socket이 back-end(src/server.js)와 실시간으로 소통할 수 있음.
// window.location.host : 현재 접속중인 IP주소와 포트번호에 대한 정보가 담겨있음.
const socket = new WebSocket(`ws://${window.location.host}`);

// 서버쪽의 WebSocket과 연결되는 이벤트가 발생하면, 해당 메서드를 수행한다.
socket.addEventListener("open", () => {
    console.log("서버와 연결되었습니다. ✅");
})

// 서버쪽의 WebSocket의 메시지를 받는 이벤트가 발생하면, 해당 메서드를 수행한다.
socket.addEventListener("message", (message) => {
    console.log("New message : ", message.data, "from the server.js");
})

// 서버쪽의 WebSocket과 연결이 끊기는 이벤트가 발생하면, 해당 메서드를 수행한다.
socket.addEventListener("close", () => {
    console.log("서버와 연결이 끊겼습니다. ❌");
})

// 1초 뒤에 해당 메서드를 실행.
setTimeout(() => {
    socket.send("hello from the browser!!");
}, 1000)