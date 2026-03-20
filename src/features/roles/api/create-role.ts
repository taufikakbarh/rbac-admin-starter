import { api } from "@/shared/api/axios"
import { Role } from "../types/role"

export async function createRole(data: Omit<Role, "id">) {
  const res = await api.post("/roles", data)
  return res.data
}