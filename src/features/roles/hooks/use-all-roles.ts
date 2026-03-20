import { useQuery } from "@tanstack/react-query"
import { getAllRoles } from "../api/get-all-roles"

export function useAllRoles() {
  return useQuery({
    queryKey: ["roles-all"],
    queryFn: getAllRoles,
  })
}