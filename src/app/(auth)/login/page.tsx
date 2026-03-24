"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/shared/providers/auth-provider"

import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const { login, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user])

  function handleLogin() {
    login({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    })

    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">

      <div className="w-full max-w-sm space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">
            Admin CMS
          </h1>
          <p className="text-sm text-muted-foreground">
            Demo login to explore the system
          </p>
        </div>

        <Button
          onClick={handleLogin}
          className="w-full"
        >
          Login as Admin
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            login({
              id: "2",
              name: "Toph",
              email: "toph@email.com",
              role: "Editor",
            })
          }
        >
          Login as Viewer
        </Button>

      </div>

    </div>
  )
}