import { useEffect } from "react";
import { createContext, useState } from "react";
import { fetchAuthHome } from "../services/user-api-service/authApi";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const checkUser = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            setUser(null)
            setLoading(false)
            return
        }
        setLoading(true)
        try {
            const res = await fetchAuthHome()
            setUser(res.data)
        } catch (error) {
            localStorage.removeItem('token')
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, checkUser }}>
            {children}
        </AuthContext.Provider>
    )

}