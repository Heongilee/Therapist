import api from '../api/api.js';

export const modalCase = async(PathState, EndpointState, history) => {
    
    switch(PathState) {
            
        // 질문글 삭제
        case 'posts': {
            await api.fetchDelete(EndpointState, history);
            history.push('/board');
            return;
        } 
        // 답글 삭제
        case 'replies': {
            await api.fetchDelete(EndpointState, history);
            window.location.reload();  
            return;
        }
        
        // 질문글에 달린 댓글 삭제
        case 'postComments': {
            await api.fetchDelete(EndpointState, history);
            window.location.reload();  
            return;
        }

        // 답글에 달린 댓글 삭제
        case 'replyComments': {
            await api.fetchDelete(EndpointState, history);
            window.location.reload();  
            return;
        }
        
        //평점
        case 'star': {
            //replies/14?point=5
            console.log("별", EndpointState)
            await api.fetchGet(EndpointState, history);
            
            // window.location.reload();  
        }
        default:
            return;
    }
    

};