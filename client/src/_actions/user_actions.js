import axios from 'axios';
import { AUTH_USER } from './types';


export const auth = () => {

    const request = axios.get('/api/user/auth')
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    };
};