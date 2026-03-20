"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Can } from "@/shared/components/permission/can"
import { Role } from "../types/role"
import { useDeleteRole } from "../hooks/use-delete-role"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"


interface Props {
  role: Role
}

export function RolesRowActions({ role }: Props) {

  const router = useRouter()
  const deleteRole = useDeleteRole()

  const [open, setOpen] = useState(false)

  function handleEdit() {
    router.push(`/roles/${role.id}`)
  }

  function handleDelete() {
    deleteRole.mutate(role.id, {
      onSuccess: () => {
        setOpen(false)
      },
    })
  }

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <Can permission="roles.update">
          <DropdownMenuItem
            onClick={handleEdit}
          >
            Edit
          </DropdownMenuItem>
        </Can>

        <Can permission="roles.delete">
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-500"
            >
            Delete
          </DropdownMenuItem>
        </Can>
      </DropdownMenuContent>
    </DropdownMenu>

    {/* CONFIRMATION MODAL */}
    <AlertDialog open={open} onOpenChange={setOpen}>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this role?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </AlertDialogAction>

        </AlertDialogFooter>
      </AlertDialogContent>

    </AlertDialog>
    </>
  )
}