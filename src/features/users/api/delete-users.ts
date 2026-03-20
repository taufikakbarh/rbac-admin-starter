import { api } from "@/shared/api/axios"

export async function deleteUsers(ids: string[]) {
  await Promise.all(
    ids.map((id) => api.delete(`/users/${id}`))
  )
}