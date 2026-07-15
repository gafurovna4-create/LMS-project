import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";



export function useAuth() {
    const context = useContext(AuthContext);


    if (!context) {
        throw new Error("Something went wrong!");
    }
    return context;
}
