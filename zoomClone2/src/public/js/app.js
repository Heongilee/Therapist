const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
room.hidden = true;

let roomName;

function addMessage(msg) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = msg;
    ul.appendChild(li);
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;

    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");

    // 서버측에 메시지를 보낸다. (emit)
    // arg1 : 'room'이라는 이벤트 (이 이벤트는 내가 정하는 무엇이든지 가능. 단, 주고받을땐 확실히!)
    // arg2 : WebSocket에서 String으로 보내는것과 달리 JSONObject를 보낼 수 있다.
    // arg3 : 메시지를 보낸 후 실행할 함수를 지정할 수 있음 (Callback function)
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value="";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
    addMessage("someone joined!");
});