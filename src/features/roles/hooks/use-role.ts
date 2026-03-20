import { useQuery } from "@tanstack/react-query"
import { getRole } from "../api/get-role"

export function useRole(id: string) {
  return useQuery({
    queryKey: ["role", id],
    queryFn: () => getRole(id),
    enabled: !!id,
  })
}