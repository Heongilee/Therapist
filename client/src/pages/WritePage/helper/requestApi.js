import writeApi from '../../../api/writeApi.js';

export const requestApi = async({ userId=null, replyId=null, postId=null, 
                            title=null, content=null, type=null, 
                            postType=null }) => {
        
        switch (type) {

        case 'writeQuestion':{
            const response = await writeApi.fetchRegisterPost({
                userName: userId,
                postType: postType,
                postTitle:title,
                postContent: content
            });
            return response;
        }

        case 'writeAnswer':{
            const response = await writeApi.fetchAnswerRegister({
                postId: postId,
                userName: userId,
                replyContent: content
            });
            return response;    
        }

        case 'questionModify':{
            const response = await writeApi.fetchModifyPost({
                postId: postId,
                postType: postType,
                postTitle:title,
                postContent: content
            });
            return response;    
        }

        case 'answerModify':{
            const response = await writeApi.fetchAnswerModify({
                replyId: replyId,
                replyContent: content
            });
            return response;    
        }
        
        default:
            return false;
    };     
};



// import { writeCase } from '../../../utils/writeCase';

// export const requestApi = async({ userId, replyId, postId, 
//                             title, content, type, 
//                             CateGoryState, postType }) => {
        
//         const respose = await writeCase({ userId, replyId, postId, 
//                                 title, content, type, 
//                                 CateGoryState, postType });
//         return respose;                
// };

