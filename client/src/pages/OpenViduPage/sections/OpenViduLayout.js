import React from 'react';
import GridLayout from './GridLayout.js';
import SideBarLayout from './SideBarLayout.js';


function OpenViduLayout({ LayoutState }) {
    
    if (LayoutState === "grid"){
        return <GridLayout></GridLayout>;
    } 
    else if (LayoutState === "sidebar" ){
        return <SideBarLayout>
                </SideBarLayout>;
    }

}

export default OpenViduLayout;
