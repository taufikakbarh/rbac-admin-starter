import { api } from "@/shared/api/axios"
import { Role } from "../types/role"

export async function getAllRoles(): Promise<Role[]> {
  const res = await api.get<Role[]>("/roles")
  return res.data
}