import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteRoles } from "../api/delete-roles"

export function useDeleteRoles() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteRoles,

    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["roles"] 
      })
    },
  })
}