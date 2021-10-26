import { useState } from 'react';
import { socket_actions } from '../_actions/socket_actions';
import { useDispatch } from 'react-redux';



function usePopOver({ setCountState }) {

    const [PopOverState, setPopOverState] = useState(false);
    const dispatch = useDispatch();


    const onVisibleChange = visible => {
        
        dispatch(socket_actions.setNoticeCount(0));
        setCountState(0);
        if (visible) {
            document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;    

        } else {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        }
        setPopOverState(!PopOverState);
    };

    return { PopOverState, setPopOverState, onVisibleChange };
};

export default usePopOver;
