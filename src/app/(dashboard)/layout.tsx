"use client"

import { Sidebar } from "@/shared/components/layout/sidebar"
import { Topbar } from "@/shared/components/layout/topbar"
import { useAuth } from "@/shared/providers/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading])

  if (loading) return null
  if (!user) return null

  return (
    <div className="flex h-screen">

      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar />

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>

    </div>
  )
}