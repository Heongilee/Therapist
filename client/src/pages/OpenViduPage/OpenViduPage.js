import React, {useRef} from 'react';

import useRedioModal from '../../hook/useRedioModal.js';
import ModalPortal from '../../portal/ModalPortal.js';
import OpenViduLayout from './sections/OpenViduLayout.js';
import OpenViduFooter from './sections/OpenViduFooter.js';

import './OpenViduPage.css';


function OpenViduPage() {
    
    const { ModalRedioRender, onLayoutHandler, LayoutState } = useRedioModal();

    
    return (    
        <section className="openvidu_page">

                
            <div className="openvidu_page_content">
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