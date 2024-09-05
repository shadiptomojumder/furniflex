import { api } from "../api"


const ResetPassword = async (data:any) => {
    try {
        const response = await api.post(`/users/resetPassword`,data);
        console.log("The Reset password api returned:",response);
        
        return response.data
    } catch (error) {
        console.log("The Error in Reset password api is:",error);
        
        throw error
    }
}

export default ResetPassword;