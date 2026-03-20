import { api } from "@/shared/api/axios"
import { Role } from "../types/role"

export async function getRoles(search?: string): Promise<Role[]> {
  const res = await api.get("/roles", {
    params: {
      name: search || undefined,
    },
  })

  return res.data
}