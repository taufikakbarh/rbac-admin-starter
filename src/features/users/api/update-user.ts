import { api } from "@/shared/api/axios"
import { CreateUserInput } from "../schemas/create-user-schema"

export async function updateUser(
  id: string,
  data: CreateUserInput
) {
  const res = await api.patch(`/users/${id}`, data)
  return res.data
}