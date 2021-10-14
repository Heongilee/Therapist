import { eventChannel } from 'redux-saga';



export default function createSocketChannel(ws) {
    const useName = localStorage.getItem('username');

    return eventChannel(emit => {
        
        ws.onopen = () => {
              console.log("Opening Websocket");
          };
          ws.onerror = error => {
              console.log("ERROR: ", error);
          };
          ws.onmessage = e => {
            const receivedMsg = JSON.parse(e.data);
            if (receivedMsg.type === 'getUsername') {
              const sendMsg = {
                  type:"register",
                  username: useName
              }
              ws.send(JSON.stringify(sendMsg));
              return;
            }
            else {
                console.log("notice message"+e.data);
            }
              return emit({data: e.data})
          };
          ws.onclose = e => {
              console.log("WebSocket Error",e)
              if (e.code === 1005) {
                  console.log("WebSocket: closed");
              } else {
                  setTimeout(() =>  {
                    createSocketChannel();
                  }, 4000);
              }
          };
          return () => {
              ws.close();
          };
      });
}



