import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUsers } from "../api/delete-users"

export function useDeleteUsers() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUsers,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      })
    },
  })
}