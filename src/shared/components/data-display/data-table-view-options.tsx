"use client"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import { Table } from "@tanstack/react-table"

interface Props<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: Props<TData>) {

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Columns
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        {table
          .getAllLeafColumns()
          .filter((column) => column.getCanHide?.() ?? true)
          .map((column) => {

            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) =>
                  column.toggleVisibility(!!value)
                }
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}

      </DropdownMenuContent>

    </DropdownMenu>
  )
}