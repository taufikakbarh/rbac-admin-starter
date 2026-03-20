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

import { useDeleteUsers } from "@/features/users/hooks/use-delete-users"
import { Can } from "@/shared/components/permission/can"

interface Props {
  table: any
  selectedRows: any[]
}

export function DataTableBulkActions({
  table,
  selectedRows,
}: Props) {

  const deleteUsersMutation = useDeleteUsers()

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

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Can permission="users.delete">
            <Button
              variant="destructive"
              size="sm"
            >
              Delete
            </Button>
          </Can>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {selectedRows.length} users?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              the selected users.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                deleteUsersMutation.mutate(selectedIds)
                table.resetRowSelection()
              }}
              className="bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        variant="outline"
        size="sm"
        onClick={() => console.log("change role", selectedIds)}
      >
        Change Role
      </Button>

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