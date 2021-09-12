import { useState } from 'react';
import { useContextModal }  from '../hook/useContextModal';
import { ENDPOINT_DIC } from '../constants/modalConstants';


export default function useStar({ id }) {
    
    const [StarValue, setStarValue] = useState('');
    const [StarState, setStarState] = useState(false);
    const { showStarModal } = useContextModal();


    const handleChange = value => {
        setStarValue(value);
        showStarModal(ENDPOINT_DIC['star'], StarValue, id);
    };

    return {  StarValue, StarState, handleChange };
};
