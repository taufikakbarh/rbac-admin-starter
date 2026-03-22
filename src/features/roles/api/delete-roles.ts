import { api } from "@/shared/api/axios"

export async function deleteRoles(ids: string[]) {
  await Promise.all(
    ids.map((id) => api.delete(`/roles/${id}`))
  )
}