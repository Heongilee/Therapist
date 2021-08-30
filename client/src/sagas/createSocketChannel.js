import { eventChannel } from 'redux-saga';

const URL = 'ws://localhost:8080/socket';


export default function createSocketChannel() {
      return eventChannel(emit => {
          //Subscribe to websocket
          const ws = new WebSocket(URL);
          ws.onopen = () => {
              console.log("Opening Websocket");
          };
          ws.onerror = error => {
              console.log("ERROR: ", error);
          };
          ws.onmessage = e => {
            console.log("ee", e);

              // return emit({data: JSON.parse(e.data)})
          };
          ws.onclose = e => {
              if (e.code === 1005) {
                  console.log("WebSocket: closed");
              } else {
                  console.log('Socket is closed Unexpectedly. Reconnect will be attempted in 4 second.', e.reason);
                  setTimeout(() =>  {
                    createSocketChannel();
                  }, 4000);
              }
          };
          return () => {
              console.log("Closing Websocket");
              ws.close();
          };
      });
}




export default createSocketChannel;


