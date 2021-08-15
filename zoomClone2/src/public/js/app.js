const socket = io();

const welcome = document.getElementById("welcome");
const room = document.getElementById("room");
room.hidden = true;
const room_form = room.querySelector("form");
const welcome_form = welcome.querySelector("form");

// 현재 클라이언트가 접속한 방의 이름
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
    
    room_form.addEventListener("submit", handleMessageSubmit);
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room_form.querySelector("input");
    const value = input.value;
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    input.value="";
}


welcome_form.addEventListener("submit", handleWelcomeSubmit);
function handleWelcomeSubmit(event) {
    event.preventDefault();
    const input = welcome_form.querySelector("input");

    // 서버측에 메시지를 보낸다. (emit)
    // arg1 : 'room'이라는 이벤트 (이 이벤트는 내가 정하는 무엇이든지 가능. 단, 주고받을땐 확실히!)
    // arg2 : WebSocket에서 String으로 보내는것과 달리 JSONObject를 보낼 수 있다.
    // arg3 : 메시지를 보낸 후 실행할 함수를 지정할 수 있음 (Callback function)
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value="";
}


socket.on("welcome", () => {
    addMessage("someone joined 🙋🏻‍♂️!");
});

socket.on("bye", () => {
    addMessage("someone left 😭!");
});

socket.on("new_message", addMessage);
// socket.on("new_message", (msg) => {addMessage(msg)}); // 이것과 같음.