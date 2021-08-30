import { put, call, take } from 'redux-saga/effects';
import { LOGIN_REQUEST, SOCKET_START } from '../_actions/types';
import { user_actions } from '../_actions/user_actions';
import { socket_actions } from '../_actions/socket_actions';

import { userApi } from '../api/userApi.js';



function* loginSaga() {

    while (true) {

        const { info } = yield take(LOGIN_REQUEST);


        try {
            const { success, token } = yield call(userApi, info);    
            yield put(user_actions.setValue('token', token));

            if (success) {
                console.log("sucess", success)

                yield put(socket_actions.fetchSocket(SOCKET_START));
            }

        } catch (error) {
            console.log("loginSaga",error )
        }
    }
    
};

export default loginSaga; 