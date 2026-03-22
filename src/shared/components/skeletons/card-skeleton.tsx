import { Skeleton } from "@/components/ui/skeleton"

export function CardSkeleton() {
  return (
    <div className="p-4 border rounded-lg space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-16" />
    </div>
  )
}