import React from 'react';
import GridLayout from './GridLayout.js';
import SideBarLayout from './SideBarLayout.js';


function OpenViduLayout({ LayoutState, publisher, subscriber}) {
    
    if (LayoutState === "grid"){
        return <GridLayout publisher={publisher} subscriber={subscriber}></GridLayout>;
    } 
    else if (LayoutState === "sidebar" ){
        return <SideBarLayout>
                </SideBarLayout>;
    }

}

export default OpenViduLayout;
