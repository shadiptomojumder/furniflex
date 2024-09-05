import { api } from "../api";

interface UpdateUserProps {
    userId: string;
    data: object;
}

const UpdateUser = async ({ userId, data }: UpdateUserProps) => {
    console.log("The Data in UpdateUser id is:", userId);
    console.log("The Data in UpdateUser data is:", data);

    try {
        const response = await api.patch(`/users/${userId}`, data);
        console.log("response in UpdateUser.ts file: ", response);

        return response.data;
    } catch (error) {
        console.log("The Error in UpdateUser api is:", error);

        throw error;
    }
};

export default UpdateUser;
