'use client'

import { fetchCurrentUser, logoutUser } from "@/services/auth"
import { AuthContextType, User } from "@/types/auth.types"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const router = useRouter();

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

    const logout = async () => {
        try {
            setIsLoggingOut(true)
            await logoutUser()
            setUser(null)
            router.push("/login")

        } catch (error) {
            console.error("Logout failed:", error)

        } finally {
            setIsLoggingOut(false)
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
              checkAuth,
              logout,
              isLoggingOut
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