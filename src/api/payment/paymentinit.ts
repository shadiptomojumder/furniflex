import { api } from "../api"


const PaymentInit = async (data:any) => {
    console.log("The Data in PaymentInit api is:",data)
    
    try {
        const response = await api.post(`/payment`, data);
        console.log("response in PaymentInit.ts file: ", response);
        
        return response.data
    } catch (error) {
        console.log("The Error in PaymentInit api is:",error);
        
        throw error
    }
}

export default PaymentInit;