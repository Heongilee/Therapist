import React from 'react';
import GridLayout from './GridLayout.js';
import SideBarLayout from './SideBarLayout.js';


function OpenViduLayout({ LayoutState, publisher, subscriber, spotlight, setSpotlight, currentSpotLight}) {

    
    if (LayoutState === "grid"){
        return <GridLayout publisher={publisher} subscriber={subscriber}></GridLayout>
    } 
    else if (LayoutState === "sidebar" ){
        
        return <SideBarLayout 
                            publisher={publisher} 
                            subscriber={subscriber}
                            spotlight={spotlight}
                            setSpotlight={setSpotlight}
                            currentSpotLight={currentSpotLight}
                            >
                </SideBarLayout>
    }

}

export default OpenViduLayout;
