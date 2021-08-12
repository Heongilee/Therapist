import axios from 'axios';

const temp = (page) => {

    if (page === '1'){
        return boardData3;
    }
    
    if (page === '2'){
        return boardData33;
    }  
     
    if (page === '3') {
        return boardData333;
    }
};

const temp2 = (category) => {

    if (category === 'category1'){
        return mypage2;
    }
    
    else if (category === 'category2'){
        return mypage3;
    }  
     
    else{
        return boardData333;
    }
};


const api = {

    fetchPosts: async(postType='category1', page='1') => {

        try {
            // const response = await axios.get(`/api/posts?postType=${postType}`);
            const response = await temp(page);
    
            return response;
    
        } catch (error) {
            console.log("requestBoardList", error)
        }
        
    },
    
    fetchMypage: async(postType='category1', page='1') => {

        try {
            // const response = await axios.get(`/api/posts?postType=${postType}`);
            const response = await temp2(postType);
    
            return response;
    
        } catch (error) {
            console.log("requestBoardList", error);
        }
        
    },

    fetchDeletePost: async(checkData=null) => {

        try {
            // const response = await axios.post();
            const response = true;
            
            return response;
    
        } catch (error) {
            console.log("requestBoardList", error);
        }
        
    }


};


export default api;
