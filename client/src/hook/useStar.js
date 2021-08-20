import { useState } from 'react';
import { useContextModal }  from '../hook/useContextModal';
import { ENDPOINT_DIC } from '../constants/modalConstants';

const DESC = ['쓰레기', '벌레', '짐승', '사람', '신'];

export default function useStar({ id }) {
    
    const [StarValue, setStarValue] = useState('');
    const [StarState, setStarState] = useState(false);
    const { showStarModal } = useContextModal();


    const handleChange = value => {
        setStarValue(value);
        showStarModal(ENDPOINT_DIC['star'], StarValue, id);
    };

    return { DESC, StarValue, StarState, handleChange };
};
