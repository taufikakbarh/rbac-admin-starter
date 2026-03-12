import { ReactNode } from "react"

interface PageCardProps {
  children: ReactNode
}

export function PageCard({ children }: PageCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      {children}
    </div>
  )
}