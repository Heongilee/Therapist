import axios from 'axios';
import { LOGIN_REQUEST, SAVE_TOKEN } from './types';
import { createSetValueAction } from '../utils/reduxHelper'


export const user_actions = {
    setValue: createSetValueAction(SAVE_TOKEN),
    fetchLogin: (info) => ({
      type: LOGIN_REQUEST,
      info
    }),

};



