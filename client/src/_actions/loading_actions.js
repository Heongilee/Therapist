import { LOADING_START, LOADING_END } from './types';


export const loading_actions = {
    loadingStart: () => ({ type: LOADING_START }),
    loadingEnd: () => ({ type: LOADING_END }),
};


