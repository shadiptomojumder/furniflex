"use client";
import React, {
    createContext,
    FC,
    ReactNode,
    useEffect,
    useState,
} from "react";

// Define the shape of the user object and the context value
export interface User {
    _id: string;
    fullname: string;
    email: string;
    phone?: string;
    address?: string;
    role?: string;
    avatar?: string;
    googleId?: string;
    refreshToken?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    userLoading: boolean;
}

// Create Context for User
export const AuthContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    userLoading: true,
});

interface AuthContextProviderProps {
    children: ReactNode;
}

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userLoading, setUserLoading] = useState(true);
    //console.log("The state User:", user);

    // Load user data from localStorage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem("userData");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserLoading(false);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                localStorage.removeItem("userData");
            }
        } else {
            setUserLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, userLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
