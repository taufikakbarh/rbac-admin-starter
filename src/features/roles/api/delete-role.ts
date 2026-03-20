import { api } from "@/shared/api/axios"

export async function deleteRole(id: string) {
  await api.delete(`/roles/${id}`)
}