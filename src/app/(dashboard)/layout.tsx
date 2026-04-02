"use client"

import { Sidebar } from "@/shared/components/layout/sidebar"
import { Topbar } from "@/shared/components/layout/topbar"
import { useAuth } from "@/shared/providers/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { usePermissionContext } from "@/shared/providers/permission-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  
  const { user, loading } = useAuth()

  const { previewRole } = usePermissionContext()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading])

  if (loading) return null
  if (!user) return null

  return (
    <>
      {previewRole && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 text-sm text-center border-b">
          Previewing as <strong>{previewRole}</strong>
        </div>
      )}

      <div className="flex h-screen">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <Topbar />

          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>

      </div>
    </>
  )
}