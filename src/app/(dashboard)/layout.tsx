import { Sidebar } from "@/shared/components/layout/sidebar"
import { Topbar } from "@/shared/components/layout/topbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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