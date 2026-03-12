"use client"

import { Button } from "@/components/ui/button"

interface Props {
  page: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}

export function DataTablePagination({
  page,
  total,
  limit,
  onPageChange,
}: Props) {

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="flex items-center justify-end space-x-2 py-4">

      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>

    </div>
  )
}