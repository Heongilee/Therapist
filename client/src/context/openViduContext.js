import React, { createContext, useState } from 'react';
import useOpenVidu from '../hook/useOpenVidu.js';


const first = ['성진'];
const second = ['헌기', '유라'];

export const OpenViduContext = createContext();

export const OpenViduProvider = ({ children }) => {

    const [First, setFirstState] = useState(first);
    const [Second, setSecondState] = useState(second); 

    const changeSpotlight = name => {
        setFirstState([name]);
        setSecondState([...Second.filter(data => data !== name), ...First]);
    };

    const {joinSession, leaveSession, publisher, subscriber} = useOpenVidu();

    return ( 
    <OpenViduContext.Provider
        value={{ publisher:First, subscriber:Second, 
                setFirstState, setSecondState, changeSpotlight, joinSession, leaveSession }}>
        { children }
    </OpenViduContext.Provider>
 ); 
};


