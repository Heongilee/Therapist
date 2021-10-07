import React, { createContext, useState } from 'react';


export const OpenViduContext = createContext();

export const OpenViduProvider = ({ children }) => {


    const [CamerState, setCamerState] = useState(false);
    const [MicState, setMicState] = useState(false);
    const [isOpen, setIsOpen] = useState({ 0:true, 1:false,2:false,3:false,4:false,5:false,6:false });

    return ( 
    <OpenViduContext.Provider
        value={{ 
                 CamerState:CamerState, 
                 setCamerState,
                 MicState:MicState, 
                 setMicState,
                 isOpen:isOpen,
                 setIsOpen
                  }}>
        { children }
    </OpenViduContext.Provider>
 ); 
};
