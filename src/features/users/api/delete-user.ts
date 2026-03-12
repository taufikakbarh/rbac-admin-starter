import { api } from "@/shared/api/axios"

export async function deleteUser(id: string) {
  await api.delete(`/users/${id}`)
}