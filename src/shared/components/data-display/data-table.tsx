"use client"

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table"

import { useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { TableSkeleton } from "@/shared/components/skeletons/table-skeleton"

import { EmptyState } from "../empty-state"
import { Inbox } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
  fetching?: boolean
  emptyState?: React.ReactNode
  renderToolbar?: (table: any) => React.ReactNode
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  emptyState,
  renderToolbar,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },

    enableRowSelection: true,

    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div>

      {renderToolbar && (
        <div className="flex items-center justify-between py-4">
          {renderToolbar(table)}
        </div>
      )}
      
      { loading ? (
        <TableSkeleton />
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer select-none"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {data.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="h-[300px] flex items-center justify-center">
                      {emptyState ?? (
                        <EmptyState
                          icon={<Inbox className="w-6 h-6" />}
                          title="No results found"
                          description="Try adjusting your search or filters"
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>

        </div>
      )}
    </div>
  )
}