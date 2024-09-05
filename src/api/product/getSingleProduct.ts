import { api } from "../api"

type QueryKey = [string, string];

const GetSingleProduct = async ({queryKey}:{queryKey: QueryKey}) => {
    try {
        console.log("the queryKey is:", queryKey);
        const [, productId] = queryKey; // Correctly destructure the queryKey array
        console.log("the productId is:", productId);
        
        
        const response = await api.get(`/product/${productId}`);
        console.log("Response from GetSingleProduct API:", response.data);
        
        return response.data.data
    } catch (error) {
        console.log("Error in GetSingleProduct API:",error);
        throw error;
    }
}

export default GetSingleProduct;