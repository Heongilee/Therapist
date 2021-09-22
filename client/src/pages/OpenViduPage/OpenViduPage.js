import React, { useState } from 'react';
import useOpenVidu from '../../hook/useOpenVidu.js';
import useRedioModal from '../../hook/useRedioModal.js';
import ModalPortal from '../../portal/ModalPortal.js';
import OpenViduLayout from './sections/OpenViduLayout.js';
import OpenViduFooter from './sections/OpenViduFooter.js';
import { OpenViduProvider } from '../../context/openViduContext';

import './OpenViduPage.css';


function OpenViduPage() {
    // const { joinSession, leaveSession, publisher, subscriber  } = useOpenVidu({nickName:localStorage.getItem('nickname')});
    
    const { ModalRedioRender, onLayoutHandler, LayoutState } = useRedioModal();

    return (    
        <section className="webrtc">

            <div className="webcard_content">
                
                    <OpenViduLayout LayoutState={LayoutState}>
                    </OpenViduLayout>
            </div>
            
            <OpenViduFooter onLayoutHandler={onLayoutHandler}></OpenViduFooter>

            <ModalPortal>
                { ModalRedioRender() }
            </ModalPortal>
            
        </section>
    );
};

export default OpenViduPage;