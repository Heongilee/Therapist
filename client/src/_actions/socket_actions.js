import { createSetValueAction } from '../utils/reduxHelper'; 
import { START_CHANNEL, STOP_CHANNEL, NOTICE_COUNT, SEND_MESSAGE, 
        SET_NOTICE_COUNT } from './types';

export const socket_actions = {
    setNoticeCount: data => ({ type: SET_NOTICE_COUNT, data }),

    connectChannel: () => ({ type: START_CHANNEL }),
    disConnectChannel: () => ({ type: STOP_CHANNEL }),
    noticeCount: () => createSetValueAction({ type: NOTICE_COUNT }),
    sendMessage: data => ({ type: SEND_MESSAGE, data}),
};


