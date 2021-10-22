// https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia
const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");
const call = document.getElementById("call");
call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;
let myDataChannel;
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*
// Phone call
async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    // 현재 선택된 카메라를 확인해서 
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
        const option = document.createElement("option");
        option.value = camera.deviceId;
        option.innerText = camera.label;
        if (currentCamera.label === camera.label) {
          option.selected = true; 
        }
        camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  // 디바이스 정보를 가져오기 전 처음 getMedia()가 호출됐을때 할당할 제약조건
  const initialConstrains = {
    audio: true,
    video: {facingMode: "user"}
  };
  // 디바이스 정보를 가져오고나서 getMedia()가 호출됐을때 할당할 제약조건
  const cameraConstrains = {
    audio: true,
    video: { deviceId: { exact: deviceId } }
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(deviceId? cameraConstrains : initialConstrains);
    myFace.srcObject = myStream;
    // 카메라와 오디오에 대한 정보는 딱 한번만 가져오도록 한다. 
    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}

function handleMuteClick() {
  myStream.getAudioTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}
function handleCameraClick() {
  myStream.getVideoTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}
async function handleCameraChange() {
  await getMedia(camerasSelect.value);
  if (myPeerConnection) {
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection.getSenders().find(sender => sender.track.kind === "video");
    videoSender.replaceTrack(videoTrack);
  }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*
// Welcome Form (방 선택)
async function initCall() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
}
async function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
  // * join_room이벤트의 callback으로 처리하지 않는 이유는 offer를 받았을 때 아직 myPeerConnection을 받아오지 못했기 때문이다. (너무 빨라서)
  await initCall(); 
  socket.emit("join_room", input.value);
  roomName = input.value;
  input.value = "";
}
const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");
welcomeForm.addEventListener("submit", handleWelcomeSubmit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*
// Socket code

// Peer A에서 실행 (Data channel을 만드는 주체)
socket.on("welcome", async () => {
  myDataChannel = myPeerConnection.createDataChannel("chat");
  myDataChannel.addEventListener("message", (event) => {
    console.log(event.data);
  });
  console.log("made data channel 📡");
  
  console.log("somenone joined! 🙋🏻‍♂️");
  // 다른 브라우저가 참가할 수 있도록 초대장을 만듦. (이 코드는 오직 Peer A한테만 실행된다는점에 유의하자!)
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  console.log("sent the offer 📨");
  // peer A가 생성한 Offer를 서버에 전송함. (서버는 그것을 받아서 다시 모든 roomName에 join한 socket에게 뿌림)
  socket.emit("offer", offer, roomName);
});

// Peer B에서 실행
socket.on("offer", async (offer) => {
  myPeerConnection.addEventListener("datachannel", (event) => {
    myDataChannel = event.channel;
    myDataChannel.addEventListener("message", (event) => {
      console.log(event.data);
    });
  });
  console.log("received the offer 📨");
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  console.log("sent the answer 🔊");
  // peer B가 생성한 answer를 서버에 전송함. (서버는 그것을 받아 다시 모든 roomName에 join한 socket에게 뿌림)
  socket.emit("answer", answer, roomName);
});

socket.on("answer", (answer) => {
  console.log("received the answer 🔊");
  myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice", (ice) => {
  console.log("received candidate 📥");
  myPeerConnection.addIceCandidate(ice);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*
// RTC Code
function handleIce(data) {
  console.log("sent candidate 📤");
  socket.emit("ice", data.candidate, roomName);
}
function handleAddStream(data) {
  // 상대 peer의 Stream을 가지고 video를 띄운다.
  const peerFace = document.getElementById("peerFace");
  peerFace.srcObject = data.streams[0];
  console.log("got an stream from my pear 🤝🏻");
  console.log("Peer's Stream: ", data.stream);
  console.log("myStream: ", myStream);
}

function makeConnection() {
  // STUN서버는 나의 장치에 공용주소를 알려주는 서버다.
  // * 만약 나의 애플리케이션을 직접 개발하는 상황이라면, STUN서버를 직접 구축해야한다.
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
        ],
      },
    ],
  });
  myPeerConnection.addEventListener("icecandidate", handleIce);
  myPeerConnection.addEventListener("track", handleAddStream);
  myStream.getTracks().forEach((track) => {
    myPeerConnection.addTrack(track, myStream);
  });
}
