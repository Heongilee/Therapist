// 여기 있는 socket이 back-end(src/server.js)와 실시간으로 소통할 수 있음.
// window.location.host : 현재 접속중인 IP주소와 포트번호에 대한 정보가 담겨있음.
const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

// 브라우저에서 받은 메시지를 백엔드(server.js)로 보낼때 문자열(String)으로 보내야하는 이유
// JSON Object타입은 서버가 만약 다른 언어(Java, GO, etc...)일 경우 호환될 수 없기 때문에, String으로 보내주고
// 직렬화, 역직렬화 과정을 거쳐야 함.
function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}

// 서버쪽의 WebSocket과 연결되는 이벤트가 발생하면, 해당 메서드를 수행한다.
socket.addEventListener("open", () => {
    console.log("서버와 연결되었습니다. ✅");
})

// 서버쪽의 WebSocket의 메시지를 받는 이벤트가 발생하면, 해당 메서드를 수행한다.
socket.addEventListener("message", (message) => {
    // console.log("New message : ", message.data, "from the server 🖥");
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
})

// 서버쪽의 WebSocket과 연결이 끊기는 이벤트가 발생하면, 해당 메서드를 수행한다.
socket.addEventListener("close", () => {
    console.log("서버와 연결이 끊겼습니다. ❌");
})

messageForm.addEventListener("submit", (event) => {
    event.preventDefault(); // 기본 이벤트 막기
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));   // 브라우저에서 보내는 메시지를 백엔드(server.js)로 보내기.

    const li = document.createElement("li");
    li.innerText = `You : ${input.value}`;
    messageList.append(li);

    input.value = "";
})

nickForm.addEventListener("submit", (event) => {
    event.preventDefault(); // 기본 이벤트 막기
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));   // 브라우저에서 보내는 닉네임을 백엔드(server.js)로 보내기.
    input.value = "";
})

// // 1초 뒤에 해당 메서드를 실행.
// setTimeout(() => {
//     socket.send("hello from the client!! 💻");
// }, 1000)

/*
 * 메시지 타입 정의 *

{
    "type": "message",
    "payload": "hello my friend!"
}
{
    "type": "nickname",
    "payload": "heonjjang"
}
*/
