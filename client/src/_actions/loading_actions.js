import { LOADING_START, LOADING_END, LOADING_RESET, LOADING } from './types';


export const loading_actions = {
    loadingStart: () => ({ type: LOADING_START }),
    loading: progress => ({ type: LOADING }, progress),
    loadingEnd: () => ({ type: LOADING_END }),
    loadingReset: () => ({ type: LOADING_RESET }),
};


