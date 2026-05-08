'use client'

import { fetchCurrentUser } from "@/services/auth"
import { AuthContextType, User } from "@/types/auth.types"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const checkAuth = async () => {
        try {
            const res = await fetchCurrentUser();
            setUser(res.data)
            console.log("Auth check successful: ", res.data)

        } catch(err) {
            setUser(null)
            console.error("Auth check error: ", err)
        } finally {
            setLoading(false)   
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <AuthContext.Provider 
            value={{ 
              user,
              isLoading: loading,
              isAuthenticated: !!user,
              checkAuth
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}