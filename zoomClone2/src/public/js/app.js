const socket = io();

const welcome = document.getElementById("welcome");
const room = document.getElementById("room");
room.hidden = true;
const nameForm = room.querySelector("#name");
const msgForm = room.querySelector("#msg");
const welcomeForm = welcome.querySelector("form");

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
    
    // 메시지 전송하는 이벤트 리스너
    msgForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = room.querySelector("#msg input");
        const value = input.value;
        socket.emit("new_message", input.value, roomName, () => {
            addMessage(`You: ${value}`);
        });
        input.value="";
    });
    // 닉네임 할당하는 이벤트 리스너
    nameForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = room.querySelector("#name input");
        socket.emit("nickname", input.value);
        input.value="";
    });
}
// ! 외부 함수 depricated.
// function handleNicknameSubmit(event) { ... }
// function handleMessageSubmit(event) { ... }

// 환영 메시지에 대한 이벤트 리스너
welcomeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = welcomeForm.querySelector("input");
    // 서버측에 메시지를 보낸다. (emit)
    // arg1 : 'room'이라는 이벤트 (이 이벤트는 내가 정하는 무엇이든지 가능. 단, 주고받을땐 확실히!)
    // arg2 : WebSocket에서 String으로 보내는것과 달리 JSONObject를 보낼 수 있다.
    // arg3 : 메시지를 보낸 후 실행할 함수를 지정할 수 있음 (Callback function)
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value="";

});
// ! 외부 함수 depricated.
// function handleWelcomeSubmit(event) {}

socket.on("welcome", (nickname) => {
    addMessage(`${nickname} arrived 🙋🏻‍♂️!`);
});

socket.on("bye", (nickname) => {
    addMessage(`${nickname} left 😭!`);
});

socket.on("new_message", addMessage);
// socket.on("new_message", (msg) => {addMessage(msg)}); // 이것과 같음.

socket.on("room_change", (rooms) => {
    // 현재 서버에 있는 방 목록들을 Refresh하여 Repaint해준다.
    const roomList = welcome.querySelector("ul");
    roomList.innerHTML = "";
    rooms.forEach((room) => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    });
});