const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone(msg) {
    console.log(`The Backend says ${msg}.`);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");

    // 서버측에 메시지를 보낸다. (emit)
    // arg1 : 'room'이라는 이벤트 (이 이벤트는 내가 정하는 무엇이든지 가능. 단, 주고받을땐 확실히!)
    // arg2 : WebSocket에서 String으로 보내는것과 달리 JSONObject를 보낼 수 있다.
    // arg3 : 메시지를 보낸 후 실행할 함수를 지정할 수 있음 (Callback function)
    socket.emit("enter_room", {
        payload: input.value
    }, backendDone); 
    input.value="";
}

form.addEventListener("submit", handleRoomSubmit);