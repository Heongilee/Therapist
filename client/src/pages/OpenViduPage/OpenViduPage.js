import React from 'react';
import useRedioModal from '../../hook/useRedioModal.js';
import ModalPortal from '../../portal/ModalPortal.js';
import OpenViduLayout from './sections/OpenViduLayout.js';
import OpenViduFooter from './sections/OpenViduFooter.js';
import useOpenVidu from '../../hook/useOpenVidu.js';

import './OpenViduPage.css';


function OpenViduPage({ match }) {

    const sessionId = match.params.sessionId;
    const { ModalRedioRender, onLayoutHandler, LayoutState } = useRedioModal();
    const { publisher, subscriber, spotlight, leaveSession, setSpotlight, currentSpotLight } = useOpenVidu({ sessionId:sessionId });



    
    return (    
        <section className="openvidu_page">

                
            <div className="openvidu_page_content">
                {publisher && subscriber && <OpenViduLayout 
                                publisher={publisher}
                                subscriber={subscriber}
                                spotlight={spotlight}
                                currentSpotLight={currentSpotLight}
                                setSpotlight={setSpotlight}
                                LayoutState={LayoutState}
                                >
                    </OpenViduLayout>}



            </div>
            {publisher &&
                <OpenViduFooter
                                publisher={publisher}
                                leaveSession={leaveSession}
                                onLayoutHandler={onLayoutHandler}>
                                </OpenViduFooter>}

            <ModalPortal>
                { ModalRedioRender() }
            </ModalPortal>
            
        </section>
    );
};

export default OpenViduPage;