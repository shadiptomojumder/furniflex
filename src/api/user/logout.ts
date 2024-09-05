import { api } from "../api"


const Logout = async ({userId}:any) => {
    try {
        const response = await api.post(`/users/logout`,{userId});
        return response.data
    } catch (error) {
        console.log("The Error in Logout api is:",error);
        
        throw error
    }
}

export default Logout;