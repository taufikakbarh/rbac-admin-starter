import { useQuery } from "@tanstack/react-query"
import { getRoles } from "../api/get-roles"

export function useRoles(search: string) {
  return useQuery({
    queryKey: ["roles", search],
    queryFn: () => getRoles(search),
  })
}