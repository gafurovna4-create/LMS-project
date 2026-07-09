import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);


export function AuthProvider({ children}) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function restoreSession(params) {
            const savedToken = localStorage.getItem("token");

            if (savedToken) {
                try {
                    const profile = await getProfile(savedToken);
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

        localStorage.setItem("token", data.access_token);
        setToken(data.access_token);
    }


    async function register(email, name, password, role, avatar) {
        await registerRequest(email, name, password, role, avatar);
        await login(email, password);
    }


    return (
        <AuthContext.Provider value={{ user, token, loading, login, register }}>
            {children}
        </AuthContext.Provider>
    )
}