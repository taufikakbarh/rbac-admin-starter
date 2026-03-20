"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { AuthUser } from "@/shared/types/auth"
import Cookies from "js-cookie"

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  login: (user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: false,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const stored = Cookies.get("auth_user")

    if (stored) {
      setUser(JSON.parse(stored))
    }

    setLoading(false)
  }, [])

  function login(user: AuthUser) {
    setUser(user)

    Cookies.set("auth_user", JSON.stringify(user), {
      expires: 1, // 1 day
    })
  }

  function logout() {
    setUser(null)
    Cookies.remove("auth_user")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}