"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/shared/components/data-display/data-table"
import { RolesRowActions } from "./roles-row-action"
import { Role } from "../types/role"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  data: Role[]
  loading?: boolean
  emptyState?: React.ReactNode
  renderToolbar?: (table: any) => React.ReactNode
}

const columns: ColumnDef<Role>[] = [
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc"
          )
        }
      >
        Role Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => row.original.permissions.length,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const role = row.original
      return <RolesRowActions role={role} />
    },
  }
]

export function RolesTable({
  data,
  loading,
  emptyState,
  renderToolbar,
}: Props) {
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