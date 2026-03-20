"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/shared/hooks/use-debounce"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableBulkActions } from "./data-table-bulk-actions"

interface Props {
  search?: string
  role?: string
  table?: any
  showRoleFilter?: boolean
  onSearchChange?: (value: string) => void
  onRoleChange?: (value: string) => void
}

export function DataTableToolbar({
  search = "",
  role = "",
  table,
  showRoleFilter,
  onSearchChange,
  onRoleChange,
}: Props) {

  const [value, setValue] = useState(search)

  const debounced = useDebounce(value, 500)

  const selectedRows = table?.getFilteredSelectedRowModel().rows ?? []
  const selectedCount = selectedRows.length

  // update URL only when debounce changes
  useEffect(() => {
    if (debounced !== search) {
      onSearchChange?.(debounced)
    }
  }, [debounced])

  // keep input synced when URL changes externally
  useEffect(() => {
    setValue(search)
  }, [search])

  return (
    <div className="flex items-center py-4 gap-4">
      {selectedCount > 0 ? (
        <DataTableBulkActions
          table={table}
          selectedRows={selectedRows}
        />
      ) : (
        <div className="flex items-center gap-4">

          <Input
            placeholder="Search users..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="max-w-sm"
          />

          {showRoleFilter && (
          <Select
            value={role ?? ""}
            onValueChange={(value) =>
              onRoleChange?.(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="User">User</SelectItem>
              <SelectItem value="Editor">Editor</SelectItem>
            </SelectContent>
          </Select>
          )}

          {table && (
            <DataTableViewOptions table={table} />
          )}

        </div>
      )}
    </div>
  )
}