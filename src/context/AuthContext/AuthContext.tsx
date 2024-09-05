"use client";
import CurrentUser from "@/api/user/currentUser";
import Logout from "@/api/user/logout";
import { useQuery } from "@tanstack/react-query";
import { differenceInMilliseconds, formatDistanceToNow } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, {
    createContext,
    FC,
    ReactNode,
    useEffect,
    useState,
} from "react";
import { toast } from "sonner";

interface DecodedToken {
    _id: string;
    iat: string;
    exp: string;
}

const DecodeToken = (token: string): DecodedToken | null => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

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

    // const { isLoading, data: loggedInUser } = useQuery({
    //     queryKey: [],
    //     queryFn: CurrentUser,
    // });

    // Load user data from localStorage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        //console.log("The storedUser is:", storedUser);

        if (storedUser) {
            console.log("Come here line 76");
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserLoading(false);
                setUser(parsedUser);
                console.log("The state User line 85:", user);
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                // Handle the error appropriately (clear the invalid data from localStorage)
                localStorage.removeItem("userData");
            }
        } else {
            setUserLoading(false);
        }
    }, []);

    // console.log("loggedInUser is:", loggedInUser);
    // useEffect(() => {
    //     if (loggedInUser) {
    //         try {
    //             if(isLoading){
    //                 setUserLoading(true);
    //             }else {
    //                 setUser(loggedInUser);
    //                 setUserLoading(false);
    //             }
    //             console.log("The state User line 108:", user);
    //         } catch (error) {
    //             console.error("Error parsing stored user data:", error);
    //             localStorage.removeItem("userData");
    //         }
    //     } else {
    //         setUserLoading(false);
    //     }
    // }, [])

    const HandleTokenExpiration = async () => {
        const router = useRouter();
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                const userId = parsedUser?._id;
                const tokenData: DecodedToken | null | undefined = DecodeToken(
                    parsedUser?.refreshToken
                );
                //console.log("Token data from token is:", tokenData);

                if (tokenData?.exp) {
                    const expireTimestamp = Number(tokenData.exp);
                    const now = new Date();
                    const expireDate = new Date(Number(expireTimestamp) * 1000); // Convert to milliseconds
                    const remainingTimeInMilliseconds =
                        differenceInMilliseconds(expireDate, now);

                    if (remainingTimeInMilliseconds > 0) {
                        const formattedRemainingTime = formatDistanceToNow(
                            expireDate,
                            { addSuffix: true }
                        );

                        //console.log(`Token expires ${formattedRemainingTime}`);
                        // console.log(
                        //     `Remaining time: ${remainingTimeInMilliseconds} milliseconds`
                        // );

                        setTimeout(async () => {
                            const response = await Logout({ userId });
                            console.log(
                                "The Logout Response line 110",
                                response
                            );

                            if (response.statusCode === 200) {
                                toast.warning(
                                    "Session expired. Please log in again 111111."
                                );
                                localStorage.clear();
                                setUser(null);
                                document.cookie = "";
                                router.push("/login");
                            } else {
                                console.error("Logout failed:", response);
                            }
                        }, remainingTimeInMilliseconds);
                    } else {
                        console.warn("Token has already expired");
                        // Handle token expiration immediately
                        const response = await Logout({ userId });
                        console.log("The Logout Response line 128", response);
                        toast.error(
                            "Session expired. Please log in again 22222."
                        );
                        localStorage.clear();
                        setUser(null);
                        document.cookie = "";
                        router.push("/login");
                    }
                }
            } catch (error) {
                console.error("Error parsing stored user data:", error);
            }
        }
    };

    if (user !== null) {
        HandleTokenExpiration();
    }

    return (
        <AuthContext.Provider value={{ user, setUser, userLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
