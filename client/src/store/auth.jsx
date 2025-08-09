import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    // isLoggedIn is true only if both token and user exist
    const isLoggedIn = !!token && !!user;

    //tackling the logout functionality
    const LogoutUser = () => {
        setToken("");
        setUser("");
        return localStorage.removeItem('token');
    }

    const apiUrl = import.meta.env.VITE_API_URL;

    //JWT AUTHENTICATION - to get currently loggedIN user data
    const userAuthentication = async () => {
        try{
            const response = await fetch(`${apiUrl}/api/auth/user`, 
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if(response.ok) {
                const data = await response.json();
                setUser(data.userData);
            } else {
                setUser("");
                setToken("");
                localStorage.removeItem("token");
            }
        }
        catch(error) {
            setUser("");
            setToken("");
            localStorage.removeItem("token");
            console.log("Error fetching user data!");
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                await userAuthentication();
            } else {
                setUser("");
            }
            setLoading(false);
        };
        checkAuth();
    }, [token]);

    return(
        <AuthContext.Provider value = {{isLoggedIn, storeTokenInLS, LogoutUser, user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}