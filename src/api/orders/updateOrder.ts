import { api } from "../api"

interface UpdateAppointmentProps{
    orderId: string;
    data: object
}


const UpdateOrder = async ({ orderId, data }:UpdateAppointmentProps) => {
    console.log("The Data in Order status is:",data)
    console.log("The Data in Order id is:",orderId)
    
    try {
        const response = await api.patch(`/order/${orderId}`, data);
        console.log("response in Order api file: ", response);
        
        return response.data
    } catch (error) {
        console.log("The Error in Order api is:",error);
        
        throw error
    }
}

export default UpdateOrder;