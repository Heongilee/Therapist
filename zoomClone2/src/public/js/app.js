// 여기 있는 socket이 back-end(src/server.js)와 실시간으로 소통할 수 있음.
const socket = new WebSocket(`ws://${window.location.host}`);
