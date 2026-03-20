"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/shared/providers/auth-provider"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const { login } = useAuth()

  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/users")
    }
  }, [user])

  function handleLogin() {
    login({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    })

    router.push("/users")
  }

  return (
    <div className="p-6">
      <Button onClick={handleLogin}>
        Login as Admin
      </Button>
    </div>
  )
}