import socketIOClient from 'socket.io-client';
const url = 'ws://localhost:8080/socket';

const createSocketConnection = () => {
  return new Promise(resolve => {

    let socket = socketIOClient(url);
    
    console.log("socket",socket)
    socket.on('connect', () => {
      console.log("왜안와")
      resolve(socket);
    });
    
  })
};

export default createSocketConnection;


// import socketIOClient from 'socket.io-client';
// const url = 'http://localhost:8080';

// const createSocketConnection = () => {
//   return new Promise(resolve => {
//     let socket = socketIOClient(url);
//     socket.on('connect', () => {
//       socket.emit("hi", "FRONTEND");
//       console.log("왜안와")
//       resolve(socket);
//     });
//   })
// };

// export default createSocketConnection;