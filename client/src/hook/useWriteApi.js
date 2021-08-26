import React, { useCallback } from 'react';
import { writeCase } from '../utils/writeCase';

function useWriteApi() {
    
    const requestApi = async({ userId, replyId, postId, 
                            title, content, type, 
                            CateGoryState, postType }) => {
        
        const respose = await writeCase({ userId, replyId, postId, 
                                title, content, type, 
                                CateGoryState, postType });
        return respose;                
    };

    return { requestApi }
};

export default useWriteApi;