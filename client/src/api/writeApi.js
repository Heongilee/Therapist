import axios from 'axios';


const temp = _ => {

    return true;
};


export const postRegister = async({ title, content }) => {

    try {
        // const response = await axios.post(`/api/posts`, {});
        
        const response = await temp();

        return response;

    } catch (error) {
        console.log("postRegister", error)
    }
    
};

