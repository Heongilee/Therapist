 import api from '../../../api/api.js';





export const requestApi = async({ userId=null, replyId=null, postId=null, 
                            title=null, content=null, type=null, 
                            postType=null, history=null }) => {
        
        switch (type) {

            case 'writeQuestion':{
                const body = {  
                            userName: userId, 
                            postType: postType, 
                            postTitle:title,
                            postContent: content
                };

                const endpoint = 'posts';
                const response = await api.fetchRegister(endpoint, body, history);
                
                return response;
            }

            case 'writeAnswer':{
           
                const body = {
                    replyContent: content,
                    userName: localStorage.getItem('username')
                };

                const endpoint = `replies/${postId}`;
                const response = await api.fetchRegister(endpoint, body, history);
                    
                return response;    
            }

            case 'questionModify':{
                const body = {
                    postType: postType,
                    postTitle:title,
                    postContent: content
                };

                const endpoint = `posts/${postId}`;
                const response = await api.fetchModify(endpoint, body, history);

                return response;    
            }

            case 'answerModify':{
                const body = {
                    replyContent: content
                };

                const endpoint = `replies/${replyId}`;
                const response = await api.fetchModify(endpoint, body, history);

                return response;    
            }
            
            default:
                return false;
    };     
};
