"use client"

import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

import { useState } from "react"

import { User } from "../types/user"
import { useDeleteUser } from "../hooks/use-delete-user"
import { Can } from "@/shared/components/permission/can"

interface Props {
  user: User
}

export function UsersRowActions({ user }: Props) {

  const router = useRouter()
  const deleteMutation = useDeleteUser()

  const [open, setOpen] = useState(false)

  function handleEdit() {
    router.push(`/users/${user.id}`)
  }

  function handleDelete() {
    deleteMutation.mutate(user.id)
    setOpen(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">

          <DropdownMenuItem onClick={handleEdit}>
            Edit
          </DropdownMenuItem>

          <Can permission="users.delete">
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
              Are you sure you want to delete this user?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

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