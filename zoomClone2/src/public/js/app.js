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
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*
// Welcome Form (방 선택)
async function startMedia() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
}
function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
  socket.emit("join_room", input.value, startMedia);
  roomName = input.value;
  input.value = "";
}
const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");
welcomeForm.addEventListener("submit", handleWelcomeSubmit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*
// Socket code
socket.on("welcome", async () => {
  console.log("somenone joined! 🙋🏻‍♂️");
  // 다른 브라우저가 참가할 수 있도록 초대장을 만듦. (이 코드는 오직 Peer A한테만 실행된다는점에 유의하자!)
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  console.log("sent the offer 📨");
  // peer A가 생성한 Offer를 서버에 전송함. (서버는 그것을 받아서 다시 모든 roomName에 join한 socket에게 뿌림)
  socket.emit("offer", offer, roomName);
});
socket.on("offer", (offer) => {
  console.log(offer);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*
// RTC Code
function makeConnection() {
  myPeerConnection = new RTCPeerConnection();
  myStream.getTracks().forEach((track) => {
    myPeerConnection.addTrack(track, myStream);
  });

}