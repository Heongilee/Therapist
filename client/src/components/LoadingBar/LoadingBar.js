import React from 'react';
import { Progress } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import './LoadingBar.css';

function LoadingBar() {

    const loading = useSelector(state => state.loading);

    // console.log("loading", loading)
    // return (
    //     <div className="loading_bar">
    //         <Progress percent={loading.progress} gapPosition={'top'} showInfo={false} />
    //     </div>
    // );
    if (loading.loadingState){
        return (
            <div className="loading_bar">
                <Progress percent={loading.progress} gapPosition={'top'} showInfo={false} />
            </div>
        );
    } else {
        return null;
    }
};

export default LoadingBar;
