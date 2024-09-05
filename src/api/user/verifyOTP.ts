import { api } from "../api"


const VerifyOneTimePassword = async (data:any) => {
    try {
        const response = await api.post(`/users/verifyOTP`,data);
        console.log("The OTP verify api returned:",response);
        
        return response.data
    } catch (error) {
        console.log("The Error in OTP verify api is:",error);
        
        throw error
    }
}

export default VerifyOneTimePassword;