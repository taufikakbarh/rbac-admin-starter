"use client"

import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/shared/components/data-display/data-table"
import { Button } from "@/components/ui/button"
import { UsersRowActions } from "./users-row-actions"

import { User } from "../types/user"

interface UsersTableProps {
  data: User[]
  loading?: boolean
}

const columns: ColumnDef<User>[] = [
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
}: UsersTableProps) {

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
    />
  )
}