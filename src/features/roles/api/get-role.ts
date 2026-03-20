import { api } from "@/shared/api/axios"
import { Role } from "../types/role"

export async function getRole(id: string): Promise<Role> {
  const res = await api.get(`/roles/${id}`)
  return res.data
}