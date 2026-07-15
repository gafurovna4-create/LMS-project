import { createContext, useState, useEffect } from "react";
import { getProfile, loginRequest, registerRequest } from "../api/apiAuth.js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        async function restoreSession(params) {
            const savedToken = localStorage.getItem("token");

            if (savedToken) {
                try {
                    const profile = await getProfile(savedToken);
                    console.log('restoreSession profile:', profile);
                    setToken(savedToken);
                    setUser(profile);
                } catch (error) {
                    console.log(error.message);
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        }
        restoreSession();
    }, []);


    async function login(email, password) {
        const data = await loginRequest(email, password);
        const profile = await getProfile(data.access_token);
        console.log('login profile:', profile);

        localStorage.setItem("token", data.access_token);
        setToken(data.access_token);
        setUser(profile);

        return profile;
    }


    async function register(email, name, password, role, avatar) {
        await registerRequest(email, name, password, role, avatar);
        await login(email, password);
    }

    function logOut() {
        localStorage.removeItem("token");
        navigate("/login")
        setToken(null);
        setUser(null);
    }


    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}