import React from 'react';
import { Progress } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import './LoadingBar.css';

function LoadingBar() {

    const loading = useSelector(state => state.loading.loadingState);


    if (loading){
        return (
            <div className="loading_bar">
            {loading }
                <Progress percent={100} gapPosition={'top'} showInfo={false} />
            </div>
        );
    } else {
        return null;
    }
};

export default LoadingBar;
