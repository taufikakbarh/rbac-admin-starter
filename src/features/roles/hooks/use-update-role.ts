import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateRole } from "../api/update-role"

export function useUpdateRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: any) =>
      updateRole(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] })
    },
  })
}