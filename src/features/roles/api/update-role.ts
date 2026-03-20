import { api } from "@/shared/api/axios"
import { Role } from "../types/role"

export async function updateRole(id: string, data: Omit<Role, "id">) {
  const res = await api.put(`/roles/${id}`, data)
  return res.data
}