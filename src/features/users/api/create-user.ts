import { api } from "@/shared/api/axios"
import { CreateUserInput } from "../schemas/create-user-schema"

export async function createUser(data: CreateUserInput) {
  const res = await api.post("/users", data)
  return res.data
}