import { api } from "../api"

interface ProductProps{
    productIds: Array<string>;
}


const DeleteProducts = async ({ productIds }:ProductProps) => {
    try {
        const response = await api.delete(`/product`, { data: productIds });
        console.log("Response from DeleteProducts API:", response);
        
        return response.data
    } catch (error) {
        console.log("Error in DeleteProducts API:",error);
        throw error
    }
}

export default DeleteProducts;