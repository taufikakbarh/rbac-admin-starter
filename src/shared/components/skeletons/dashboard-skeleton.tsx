import { CardSkeleton } from "@/shared/components/skeletons/card-skeleton"

export function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <CardSkeleton />
      <CardSkeleton />
    </div>
  )
}