import { Skeleton } from "@/components/ui/skeleton"

interface Props {
  rows?: number
  columns?: number
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
}: Props) {

  return (
    <div className="rounded-md border p-4 space-y-4">

      {/* HEADER */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>

      {/* ROWS */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} className="h-4 w-full" />
          ))}
        </div>
      ))}

    </div>
  )
}