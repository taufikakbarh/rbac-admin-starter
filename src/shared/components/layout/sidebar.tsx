"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navigation } from "@/config/navigation"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r h-screen p-4">
      <div className="mb-6 text-lg font-semibold">
        CMS Starter
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                active
                  ? "bg-muted font-medium"
                  : "text-muted-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}