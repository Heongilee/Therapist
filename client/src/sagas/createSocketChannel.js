import { eventChannel, buffers } from 'redux-saga';


// import socketio from 'socket.io-client';
// const socket = socketio.connect('http://localhost:8080');



const createSocketChannel = (socket) => eventChannel(emit => {
  const emitter = message => emit(message);


  socket.on('update', emitter);
  return function unsubscribe() {
    socket.off('update', emitter);
  }
});


export function closeChannel(channel) {
  if (channel) {
    channel.close();
  }
}

export default createSocketChannel;


// const defaultMatcher = () => true;
// export function createSocketChannel(eventType, buffer, matcher) {

//   return eventChannel(emit => {

//     const emitter = message => emit(message);
//     socket.on(eventType, emitter);
//     return function unsubscribe() {
//       socket.off(eventType, emitter);
//     }
//   }, buffer || buffers.none(), matcher || defaultMatcher);
// }