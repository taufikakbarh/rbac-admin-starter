import { api } from "@/shared/api/axios"
import { User } from "../types/user"

export async function getUser(id: string) {
  const res = await api.get<User>(`/users/${id}`)
  return res.data
}