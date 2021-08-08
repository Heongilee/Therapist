import { useState, useEffect } from 'react';


function useCheckBox({postData}) {

    const [CheckState, setCheckState] = useState(Array(postData.length).fill(false));

    useEffect(() => {
        setCheckState(Array(postData.length).fill(false));
    }, [postData]);
                                     
    const checkBoxhandler = event => {
        const postNum = event.target.dataSet;
        setCheckState(CheckState.map((check, index) => (postNum === index ? !check : check)));
    }


    return  [CheckState, checkBoxhandler];
};

export default useCheckBox;
