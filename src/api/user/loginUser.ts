import { api } from "../api"


const LoginUser = async () => {
    try {
        const response = await api.post(`/users/current-user`,{});
        return response.data
    } catch (error) {
        console.log("The Error in Logout api is:",error);
        
        throw error
    }
}

export default LoginUser;