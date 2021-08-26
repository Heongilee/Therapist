var webSocket;
var nickname;
document.getElementById("connect").addEventListener("click", function(){
    document.getElementById("connect").style.display="none";
    connect();
})
// Send 버튼 누르면 알림 전송
document.getElementById("send").addEventListener("click",function(){
    send();
})
function connect(){
    webSocket = new WebSocket("ws://172.24.81.222:8080/socket");
    webSocket.onopen = onOpen;
    webSocket.onclose = onClose;
    webSocket.onerror = onError;
    webSocket.onmessage = onMessage;
}
function disconnect(){
    webSocket.send(nickname + "님이 퇴장하셨습니다");
    webSocket.close();
}
function send(){
    msg = document.getElementById("message").value;
    document.getElementById("message").value = "";

    // TODO: client 단에서 받아올 정보
    let caller = "user";
    let caller_id = "2";  // 댓글 남기는 사람
    let receiver = "auth_yura";
    let content = msg;
    let replyId = parseInt(caller_id);
    let new_url = 'http://172.24.81.222:8080/api/replyComments/auth_yura/'+replyId;

    $.ajax({
        type: 'POST',
        url: new_url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-type","application/json");
//            xhr.setRequestHeader("Authorization","JWT " + token);
        },
        dataType: 'json',
        data: JSON.stringify ({
            "replyCommentContent": "test"
        }),
        success: function() {
            webSocket.send(caller + "," + caller_id + "," + receiver + "," + content);
            console.log("success:: sending a message");
        },
        error: function() {
            console.log("error:: sending a message");
        }
    });


}
function onOpen(){
    console.log("connect success !!");
//    webSocket.send(nickname + "님이 입장하셨습니다.");
}
function onMessage(e){
    data = e.data;
    console.log("Received message: " + data + "\n");

    let toast = "<div class='toast' role='alert' aria-live='assertive' aria-atomic='true'>";
    toast += "<div class='toast-header'><i class='fas fa-bell mr-2'></i><strong class='mr-auto'>알림</strong>";
    toast += "<small class='text-muted'>just now</small><button type='button' class='ml-2 mb-1 close' data-dismiss='toast' aria-label='Close'>";
    toast += "<span aria-hidden='true'>&times;</span></button>";
    toast += "</div> <div class='toast-body'>" + data + "</div></div>";
    $("#msgStack").append(toast);   // msgStack div에 생성한 toast 추가
    $(".toast").toast({"animation": true, "autohide": false});
    $('.toast').toast('show');
}
function onClose(){
    console.log("connect closed");
}

function onError(evt) {
    console.log("error msg:", evt);
}