"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/shared/components/data-display/data-table"
import { RolesRowActions } from "./roles-row-action"
import { Role } from "../types/role"

interface Props {
  data: Role[]
  loading?: boolean
  renderToolbar?: (table: any) => React.ReactNode
}

const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "Role Name",
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
  renderToolbar,
}: Props) {

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      renderToolbar={renderToolbar}
    />
  )
}