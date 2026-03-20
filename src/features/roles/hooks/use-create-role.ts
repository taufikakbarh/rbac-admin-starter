import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createRole } from "../api/create-role"

export function useCreateRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] })
    },
  })
}