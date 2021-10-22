import { useState, useEffect } from 'react';


function useCheckBox({postData, currentPage}) {

    const [CheckState, setCheckState] = useState(Array(postData.length).fill(false));

    useEffect(() => {
        setCheckState(Array(postData.length).fill(false));
    }, [postData, currentPage]);
                                     
    const checkBoxhandler = event => {
        

        const postNum = event.target.dataSet;
        setCheckState(CheckState.map((check, index) => (postNum === index ? !check : check)));
    }


    return  [CheckState, checkBoxhandler];

};

export default useCheckBox;
