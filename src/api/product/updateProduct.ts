import { api } from "../api"

interface ProductProps{
    productId: string;
    data: object
}


const UpdateProduct = async ({ productId , data }:ProductProps) => {
    try {
        console.log("New Data come:",data);
        console.log("ProductId:",productId);
        
        const response = await api.patch(`/product/${productId}`, data);
        console.log("Response from UpdateProduct API:", response);
        
        return response.data
    } catch (error) {
        console.log("Error in UpdateProduct API:",error);
        
        throw error
    }
}

export default UpdateProduct;