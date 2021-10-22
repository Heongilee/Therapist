import { useContext } from 'react';
import { OpenViduContext } from '../context/openViduContext';


export const useContextOpv = () => {
    return useContext(OpenViduContext);
};