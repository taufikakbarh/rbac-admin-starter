import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Can } from "@/shared/components/permission/can"

interface Props<TData> {
  table: any
  selectedRows: any[]
  onDelete?: (ids: string[]) => void
  deletePermission?: string
  entityName?: string
}

export function DataTableBulkActions<TData>({
  table,
  selectedRows,
  onDelete,
  deletePermission,
  entityName = "items",
}: Props<TData>) {

  const selectedIds = selectedRows.map(
    (row) => row.original.id
  )

  function clearSelection() {
    table.resetRowSelection()
  }

  return (
    <div className="flex items-center gap-3">

      <span className="text-sm text-muted-foreground">
        {selectedRows.length} selected
      </span>

      {onDelete && (
        <Can permission={deletePermission as any}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete {selectedRows.length} {entityName}?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={() => {
                    onDelete(selectedIds)
                    clearSelection()
                  }}
                  className="bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Can>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={clearSelection}
      >
        Clear
      </Button>

    </div>
  )
}