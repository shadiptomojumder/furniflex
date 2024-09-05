import { api } from "../api"


const Register = async (data:any) => {
    // console.log("The Data in Register api is:",data)
    
    try {
        const response = await api.post(`/users/register`, data);
        console.log("response in Register.ts file: ", response);
        
        return response.data
    } catch (error) {
        console.log("The Error in Register api is:",error);
        
        throw error
    }
}

export default Register;