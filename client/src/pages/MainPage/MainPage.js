import React from 'react';
import CardSection from './sections/CardSection.js';
import BoardSection from './sections/BoardSection.js';
import useRecentBoard from '../../hook/useRecentBoard.js';
import useVoiceRoom from '../../hook/useVoiceRoom.js';
import useCreateRoom from '../../hook/useCreateRoom.js';
import ModalPortal from '../../portal/ModalPortal.js';
import useWriteModal from '../../hook/useWriteModal.js';
import { AudioOutlined, FormOutlined } from '@ant-design/icons';

import './MainPage.css';

function MainPage() {
 
    const CardDataState  = useVoiceRoom();
    const PostState = useRecentBoard();
    const { renderRoomCreate, showCrearteRoomModal } = useCreateRoom();
    const { renderWriteModal, showWriteModal } = useWriteModal();
    
    return (
        <section className="main_section">

            <div className="wrapper">
                <div className="voice_room_title">            
                    <h2 onClick={showCrearteRoomModal} style={{cursor: "pointer"}}>
                        고민을 들어주세요 
                
                        <AudioOutlined /> 
                    </h2>
                </div>
                {CardDataState && <CardSection cardData={CardDataState}
                                                showWriteModal={showWriteModal}></CardSection>}
                
                <div className="voice_room_title">            
                    <h2>고민을 들려주세요</h2>
                </div>
                {PostState && <BoardSection postData={PostState}></BoardSection>}
            </div>
            <ModalPortal>
                { renderRoomCreate()}
                { renderWriteModal()}
            </ModalPortal>
        </section>
    );
};

export default MainPage;