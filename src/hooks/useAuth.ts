import { AuthContext } from "@/context/AuthContext/AuthContext";
import { useContext } from "react";


export const useAuth = () => {
    const { user, setUser, userLoading } = useContext(AuthContext);
    return { user, setUser, userLoading }
}