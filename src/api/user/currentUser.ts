import { api } from "../api"


const CurrentUser = async () => {
    try {
        const response = await api.get(`/users/current-user`,{});
        console.log("The CurrentUser api returned:",response);
        
        return response.data.data
    } catch (error) {
        console.log("The Error in CurrentUser api is:",error);
        
        throw error
    }
}

export default CurrentUser;