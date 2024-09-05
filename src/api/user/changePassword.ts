import { api } from "../api"


const ChangePassword = async (data:any) => {
    try {
        const response = await api.post(`/users/`,data);
        console.log("The login api returned:",response);
        
        return response.data
    } catch (error) {
        console.log("The Error in Login api is:",error);
        
        throw error
    }
}

export default ChangePassword;