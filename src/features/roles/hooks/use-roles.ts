import { useQuery } from "@tanstack/react-query"
import { getRoles } from "../api/get-roles"

export function useRoles(
  page: number,
  limit: number,
  search?: string
) {
  return useQuery({
    queryKey: ["roles", page, limit, search],
    queryFn: () => getRoles({ page, limit, search }),
  })
}