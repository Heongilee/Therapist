import { SAVE_STATE, SOCKET_START } from './types';
import { createSetValueAction } from '../utils/reduxHelper'


export const socket_actions = {
    
    setValue: createSetValueAction(SAVE_STATE),
    fetchSocket: () => ({ type:SOCKET_START })
     
};



