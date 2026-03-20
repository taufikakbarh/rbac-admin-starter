"use client"

import { ThemeToggle } from "./theme-toggle"
import { useAuth } from "@/shared/providers/auth-provider"
import { Button } from "@/components/ui/button"

export function Topbar() {
  const { user, logout } = useAuth()

  return (
    <header className="h-14 border-b flex items-center px-6 justify-between">
      {/* LEFT */}
      <div className="text-sm text-muted-foreground">
        {user?.name ? `Welcome, ${user.name}` : "Guest"}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Button variant="outline" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  )
}