import { START_CHANNEL, STOP_CHANNEL, 
        SOCKET_MESSAGE, NOTICE_COUNT,
        SEND_MESSAGE, GET_MESSAGE } from './types';
import { createSetValueAction } from '../utils/reduxHelper';


export const socket_actions = {
    
    setValue: createSetValueAction({type:SOCKET_MESSAGE}),
    connectChannel: () => ({ type: START_CHANNEL }),
    disConnectChannel: () => ({ type: STOP_CHANNEL }),
    noticeCount: () => createSetValueAction({ type: NOTICE_COUNT }),

    sendMessage: data => ({ type: SEND_MESSAGE, data}),
};


