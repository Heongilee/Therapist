import { fork, take, call} from 'redux-saga/effects';
import { SOCKET_START } from '../_actions/types';
import createSocketChannel from "./createSocketChannel";
import socketIOClient from 'socket.io-client';

import createSocketConnection from '../socket';



function* socketSaga(type) {

    // yield take(SOCKET_START);
    const socket = yield call(createSocketConnection)
    const socketChannel = yield call(createSocketChannel, socket)

    while (true) {
        try {
          
        console.log("어디서막힌걸까")

        const message = yield take(socketChannel);
    
        console.log(message);

        } catch (error) {
          alert(error.message);
        }
    }
    
};

export default socketSaga; 