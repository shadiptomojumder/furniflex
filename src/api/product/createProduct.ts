import { api } from "../api"


const CreateProduct = async (data:any) => {
    console.log("The Data in CreateProduct api is:",data)
    
    try {
        const response = await api.post(`/product`, data);
        console.log("response in CreateProduct.ts file: ", response);
        
        return response.data
    } catch (error) {
        console.log("The Error in CreateProduct api is:",error);
        
        throw error
    }
}

export default CreateProduct;