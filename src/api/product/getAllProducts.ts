import { api } from "../api";
type QueryKey = [string, string, string];

const GetAllProducts = async ({ queryKey }: { queryKey: QueryKey }) => {
    try {
        //console.log("queryKey in getAllproduct API:",queryKey);
        const [, query, sortBy] = queryKey;
        const response = await api.get(
            `/product?${query ? `search=${query}&&` : ``}${sortBy ? `sortBy=${sortBy}` : ``}`
        );
        //console.log("Response from GetAllProducts API:", response.data.data);
        return response.data.data;
    } catch (error) {
        console.log("Error in GetAllProducts API:", error);
        throw error;
    }
};
export default GetAllProducts;

type QueryKeyAll = [string, ...any];

export const GetProductByQuery = async ({ queryKey }: { queryKey: any }) => {
    try {
        console.log("queryKey is:", queryKey);
        // Destructure the array to extract the second element
        const [, queryFilter] = queryKey;
        console.log("queryFilter is:", queryFilter);
        const { queryFilter: { category, sortBy,limit,page } }  = queryFilter;

        console.log("sortBy is:",sortBy); 
        console.log("category is:", category);

        const response = await api.get(`/product?${page ? `page=${page}` :``}${limit ? `&limit=${limit}` :``}${category ? `&category=${category}` :``}${sortBy ? `&sortBy=${sortBy}` : ``}`);
        console.log("Response from GetAllProducts API:", response.data);

        return response.data;
    } catch (error) {
        console.log("Error in GetAllProducts API:", error);
        throw error;
    }
};
