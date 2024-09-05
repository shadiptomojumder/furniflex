import { api } from "../api"


const VerifyUser = async (data:any) => {
    try {
        const response = await api.post(`/users/verify-user`,data);
        console.log("The verifyUser api returned:",response);
        
        return response.data
    } catch (error) {
        console.log("The verifyUser in Login api is:",error);
        
        throw error
    }
}

export default VerifyUser;