import { eventChannel } from 'redux-saga';



export default function createSocketChannel(ws) {

    return eventChannel(emit => {
        
        ws.onopen = () => {
              console.log("Opening Websocket");
          };
          ws.onerror = error => {
              console.log("ERROR: ", error);
          };
          ws.onmessage = e => {
              return emit({data: e.data})
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



