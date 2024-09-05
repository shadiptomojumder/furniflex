import { api } from "../api"


const HandleGoogleAuth = async () => {
    try {
        const response = await api.get(`/auth/google`);
        console.log("The HandleGoogleAuth api returned:",response);
        
        return response.data
    } catch (error) {
        console.log("The Error in HandleGoogleAuth api is:",error);
        
        throw error
    }
}

export default HandleGoogleAuth;