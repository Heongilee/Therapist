import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import api from '../api/boardApi.js';


function useCheckBox({postData}) {

    const [CheckState, setCheckState] = useState(Array(postData.length).fill(false));
    const history = useHistory();

    useEffect(() => {
        setCheckState(Array(postData.length).fill(false));
    }, [postData]);
                                     
    const checkBoxhandler = event => {
        const postNum = event.target.dataSet;
        setCheckState(CheckState.map((check, index) => (postNum === index ? !check : check)));
    }

    const dataProcessing = () => {
        const deleteData = CheckState.map((data,index) => { return data === true ? index : null })
        .filter( data => data) 
        console.log("삭제", deleteData);
        return {...deleteData};
    };

    const handleButtonClick = async() => {
        const checkData = await dataProcessing();
        const response = await api.fetchDeletePost(checkData);
    
        if (response){
            console.log("삭제 성공")
            // history.push("/mypage")
        }        

    };

    return { CheckState, checkBoxhandler, handleButtonClick };
};

export default useCheckBox;
