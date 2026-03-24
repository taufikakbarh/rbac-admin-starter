"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { navigation } from "@/config/navigation"
import { cn } from "@/shared/utils/cn"
import { Can } from "../permission/can"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r h-screen p-4 flex flex-col">

      {/* LOGO / TITLE */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          CMS Starter
        </h2>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-1">

        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          const content = (
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-muted font-medium"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.title}</span>
            </Link>
          )

          // public route
          if (!item.permission) {
            return (
              <div key={item.href}>
                {content}
              </div>
            )
          }

          // protected route
          return (
            <Can key={item.href} permission={item.permission as any}>
              {content}
            </Can>
          )
        })}

      </nav>

      {/* OPTIONAL FOOTER (future) */}
      <div className="mt-auto pt-4 text-xs text-muted-foreground">
        v1.0.0
      </div>

    </aside>
  )
}