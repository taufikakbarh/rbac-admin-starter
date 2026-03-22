"use client"

import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/shared/components/data-display/data-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { UsersRowActions } from "./users-row-actions"

import { User } from "../types/user"

interface UsersTableProps {
  data: User[]
  loading?: boolean,
  emptyState?: React.ReactNode
  renderToolbar?: (table: any) => React.ReactNode,
}

const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      return <UsersRowActions user={user} />
    },
  }
]

export function UsersTable({
  data,
  loading,
  emptyState,
  renderToolbar,
}: UsersTableProps) {

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      renderToolbar={renderToolbar}
      emptyState={emptyState}
    />
  )
}