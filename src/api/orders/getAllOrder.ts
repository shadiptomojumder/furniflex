import { api } from "../api"


const GetAllOrder = async () => {
    try {
        const response = await api.get(`/order`);
        console.log("response in GetAllOrder list file: ", response);
        
        return response.data.data
    } catch (error) {
        console.log("The Error in GetAllOrder list api is:",error);
        
        throw error
    }
}

export default GetAllOrder;