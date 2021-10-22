

const api = {

    fetchDelete: async(endPoint) => {

        try {
            const response = await axios.get(`${URL}/${endPoint}`);
            const { data } = response;
            return data;

        } catch (error) {
            console.log("fetchDelete", error)
        }
    },
};



export default api;
