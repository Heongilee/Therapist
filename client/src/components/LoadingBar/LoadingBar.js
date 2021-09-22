import React from 'react';
import { Progress } from 'antd';
import { useSelector } from 'react-redux';
import './LoadingBar.css';

function LoadingBar() {

    const loading = useSelector(state => state.loading);

    if (loading.loadingState){
        return (
            <div className="loading_bar">
                <Progress percent={loading.progress} 
                          size="small"
                          gapPosition={'top'} showInfo={false} /> 
            </div>
        );
    } else {
        return null;
    }
};

export default LoadingBar;
