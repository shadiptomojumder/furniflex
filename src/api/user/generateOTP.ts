import { api } from "../api"


const GenerateOneTimePassword = async (data:any) => {
    try {
        const response = await api.post(`/users/generateOTP`,data);
        console.log("The OTP api returned:",response);
        
        return response.data
    } catch (error) {
        console.log("The Error in OTP api is:",error);
        
        throw error
    }
}

export default GenerateOneTimePassword;