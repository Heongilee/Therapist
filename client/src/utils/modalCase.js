import postApi from '../api/postApi.js';

export const modalCase = async(PathState, EndpointState) => {
    
    switch(PathState) {

        case 'posts': {
            const response = await postApi.fetchDelete(EndpointState);
            return response;
                  
        }
        case 'postComments': {
            const response = await postApi.fetchDelete(EndpointState);
            return response;
        }

        case 'replies': {
            const response = await postApi.fetchDelete(EndpointState);
                return response;
        }

        case 'replyComments': {
            const response = await postApi.fetchDelete(EndpointState);
                return response;
        }

        case 'star': {
            const response = await postApi.fetchDelete(EndpointState);
                return response;
        }
        
        default:
            return false;
    }
    

};
